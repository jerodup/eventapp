package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jerodup/go-react/internal/db"
	"github.com/jerodup/go-react/internal/handlers"
)

func main() {
	// Conectar a la base de datos
	dbConn, err := db.Connect()
	if err != nil {
		log.Fatal("Error al conectarse a la base de datos:", err)
	}

	// Migrar modelos
	db.Migrate(dbConn)

	// Configurar el servidor Fiber
	app := fiber.New()

	app.Static("/uploads", "./uploads")

	// Habilitar CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173", // Cambia esto a la URL de tu frontend
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))

	// Rutas

	app.Get("/auth-check", func(c *fiber.Ctx) error {
		token := c.Cookies("jwt")
		if token == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "No autenticado"})
		}
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Autenticado"})
	})

	app.Post("/register", func(c *fiber.Ctx) error {
		return handlers.Register(c, dbConn)
	})

	app.Post("/login", func(c *fiber.Ctx) error {
		return handlers.Login(c, dbConn)
	})

	app.Get("/auth", handlers.VerifyAuth, func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message":       "Esta es una ruta protegida",
			"authenticated": true,
		})
	})
	app.Get("/events", handlers.VerifyAuth, func(c *fiber.Ctx) error {
		return handlers.GetUserEvents(c, dbConn)
	})

	app.Post("/events", handlers.VerifyAuth, func(c *fiber.Ctx) error {
		return handlers.CreateEvent(c, dbConn)
	})
	app.Get("/events/nearby", func(c *fiber.Ctx) error {
		return handlers.GetNearbyEvents(c, dbConn)
	})
	app.Get("/events/:id", func(c *fiber.Ctx) error {
		return handlers.GetEventByID(c, dbConn)
	})
	app.Delete("/events/:id", handlers.VerifyAuth, func(c *fiber.Ctx) error {
		return handlers.DeleteEvent(c, dbConn)
	})
	app.Post("/logout", handlers.Logout)

	log.Fatal(app.Listen(":4000"))
}
