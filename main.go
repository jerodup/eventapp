package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// User es el modelo de la tabla "users"
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	// Configuración de la conexión (reemplaza con tus credenciales)
	dsn := "user=postgres password=quake3q3dm6 dbname=registro host=localhost port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error al conectarse a la base de datos:", err)
	}

	// Migrar el esquema de la base de datos si es necesario
	db.AutoMigrate(&User{})

	app := fiber.New()
	app.Use(cors.New())

	// Ruta para obtener todos los usuarios
	app.Get("/users", func(c *fiber.Ctx) error {
		var users []User
		if err := db.Find(&users).Error; err != nil {
			return c.Status(500).SendString("Error al obtener usuarios")
		}
		return c.JSON(users)
	})

	app.Post("/users", func(c *fiber.Ctx) error {
		var user User

		// Parsear el JSON del cuerpo de la solicitud
		if err := c.BodyParser(&user); err != nil {
			return c.Status(400).SendString("Error al parsear los datos")
		}

		// Crear el usuario en la base de datos
		if err := db.Create(&user).Error; err != nil {
			return c.Status(500).SendString("Error al crear usuario")
		}

		return c.JSON(user)
	})

	log.Fatal(app.Listen(":4000"))
}
