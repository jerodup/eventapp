package main

import (
	"log"

	"github.com/jerodup/go-react/internal/db"
	"github.com/jerodup/go-react/internal/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Inicializar la base de datos
	dbConn := db.Init()

	// Crear una nueva aplicación Fiber
	app := fiber.New()

	app.Use(cors.New())

	// Registrar rutas
	handlers.SetupUserRoutes(app, dbConn)

	// Iniciar el servidor
	log.Fatal(app.Listen(":4000"))
}
