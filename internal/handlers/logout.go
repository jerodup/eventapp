package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func Logout(c *fiber.Ctx) error {
	// Elimina la cookie del JWT
	c.ClearCookie("jwt")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Sesión cerrada exitosamente"})
}
