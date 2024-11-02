package handlers

import (
	"github.com/gofiber/fiber/v2"
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

	// Devolver respuesta de éxito
	return c.JSON(fiber.Map{
		"message": "Inicio de sesión exitoso",
		"user":    user,
	})
}
