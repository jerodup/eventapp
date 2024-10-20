package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

func SetupUserRoutes(app *fiber.App, db *gorm.DB) {
	app.Get("/users", func(c *fiber.Ctx) error {
		var users []models.User
		db.Find(&users)
		return c.JSON(users)
	})

	app.Post("/users", func(c *fiber.Ctx) error {
		var user models.User
		if err := c.BodyParser(&user); err != nil {
			return c.Status(400).SendString("Error en la solicitud")
		}
		db.Create(&user)
		return c.JSON(user)
	})
}
