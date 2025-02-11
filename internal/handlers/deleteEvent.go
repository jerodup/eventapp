package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

// Handler para eliminar un evento
func DeleteEvent(c *fiber.Ctx, db *gorm.DB) error {
	eventID := c.Params("id")

	if err := db.Delete(&models.Event{}, "event_id = ?", eventID).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error al eliminar el evento"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Evento eliminado"})
}
