package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./public")
	app.Get("/users", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"data": "usuarios desde el backend"})
	})
	app.Listen(":4000")
}
