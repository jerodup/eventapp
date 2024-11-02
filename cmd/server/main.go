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

	// Habilitar CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // Cambia esto a la URL de tu frontend
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Rutas
	app.Post("/register", func(c *fiber.Ctx) error {
		return handlers.Register(c, dbConn)
	})
	app.Post("/login", func(c *fiber.Ctx) error {
		return handlers.Login(c, dbConn)
	})

	log.Fatal(app.Listen(":4000"))
}
