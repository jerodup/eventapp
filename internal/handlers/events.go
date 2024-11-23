package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

// Handler para obtener los eventos del usuario
func GetUserEvents(c *fiber.Ctx, db *gorm.DB) error {
	// Obtener el user_id desde el contexto
	userID := c.Locals("user_id").(uint)

	// Obtener los eventos del usuario desde la base de datos
	var events []models.Event
	if err := db.Where("user_id = ?", userID).Find(&events).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error al obtener los eventos", "error": err.Error()})
	}

	// Devolver los eventos en la respuesta
	return c.JSON(events)
}
