package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

func GetAllEvents(c *fiber.Ctx, db *gorm.DB) error {
	var events []models.Event

	// Consultar todos los eventos en la base de datos
	if err := db.Find(&events).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al obtener los eventos",
			"error":   err.Error(),
		})
	}

	// Devolver los eventos en la respuesta
	return c.JSON(events)
}
