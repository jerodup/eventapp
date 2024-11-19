package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/jerodup/go-react/internal/models"
	"github.com/jerodup/go-react/internal/utils"
	"gorm.io/gorm"
)

func Login(c *fiber.Ctx, db *gorm.DB) error {
	var payload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).SendString("Datos inválidos")
	}

	// Buscar el usuario en la base de datos
	var user models.User
	if err := db.Where("email = ?", payload.Email).First(&user).Error; err != nil {
		return c.Status(404).SendString("Usuario no encontrado")
	}

	// Validar la contraseña
	if !utils.CheckPasswordHash(payload.Password, user.Password) {
		return c.Status(401).SendString("Contraseña incorrecta")
	}

	// Generar el token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // Expira en 24 horas
	})

	tokenString, err := token.SignedString(utils.GetJWTSecret())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error al generar el token")
	}

	// Configurar la cookie con HttpOnly para el token JWT
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,  // HttpOnly para mayor seguridad
		Secure:   false, // Cambiar a true en producción si usas HTTPS
		SameSite: "Lax",
		Path:     "/",
	})
	// Respuesta de éxito
	return c.JSON(fiber.Map{
		"message": "Inicio de sesión exitoso",
	})
}
