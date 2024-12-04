package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

func GetEventByID(c *fiber.Ctx, db *gorm.DB) error {
	// Obtener el ID del evento desde los parámetros
	eventID := c.Params("id")

	var event models.Event
	if err := db.First(&event, "event_id = ?", eventID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Evento no encontrado",
			"error":   err.Error(),
		})
	}

	// Devolver el evento en la respuesta
	return c.JSON(event)
}
