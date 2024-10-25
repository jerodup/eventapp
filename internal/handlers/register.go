package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"github.com/jerodup/go-react/internal/utils"
	"gorm.io/gorm"
)

// Register maneja el registro de usuarios
func Register(c *fiber.Ctx, db *gorm.DB) error {
	var payload struct {
		Name            string `json:"name"`
		Email           string `json:"email"`
		Password        string `json:"password"`
		ConfirmPassword string `json:"confirmPassword"`
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).SendString("Datos inválidos")
	}

	// Verificar si las contraseñas coinciden
	if payload.Password != payload.ConfirmPassword {
		return c.Status(400).SendString("Las contraseñas no coinciden")
	}

	// Hashear la contraseña
	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		return c.Status(500).SendString("Error al hashear la contraseña")
	}

	// Crear el usuario
	user := models.User{
		Name:     payload.Name,
		Email:    payload.Email,
		Password: hashedPassword,
	}

	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).SendString("Error al crear el usuario")
	}

	return c.JSON(user)
}
