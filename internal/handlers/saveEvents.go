package handlers

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jerodup/go-react/internal/models"
	"gorm.io/gorm"
)

func CreateEvent(c *fiber.Ctx, db *gorm.DB) error {
	// Obtener el user_id desde el contexto
	userID := c.Locals("user_id").(uint)

	// Procesar los campos del formulario
	title := c.FormValue("title")
	description := c.FormValue("description")
	location := c.FormValue("location")
	eventDate := c.FormValue("event_date")

	// Manejar la carga de la imagen
	file, err := c.FormFile("image")
	var imageURL string
	if err == nil {
		// Guardar el archivo localmente o en un almacenamiento externo
		imagePath := fmt.Sprintf("./uploads/%s", file.Filename)
		if saveErr := c.SaveFile(file, imagePath); saveErr != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error al guardar la imagen",
				"error":   saveErr.Error(),
			})
		}
		// En producción, podrías almacenar la URL del archivo en lugar de su ruta local
		imageURL = fmt.Sprintf("http://localhost:4000/uploads/%s", file.Filename)
	} else {
		imageURL = "" // Si no se envió una imagen, deja la URL vacía
	}

	// Crear el evento
	event := models.Event{
		UserID:      userID,
		Title:       title,
		Description: description,
		Location:    location,
		ImageURL:    imageURL,
	}

	// Parsear y asignar la fecha del evento
	if parsedDate, parseErr := time.Parse("2006-01-02T15:04", eventDate); parseErr == nil {
		event.EventDate = parsedDate
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Formato de fecha no válido",
			"error":   parseErr.Error(),
		})
	}

	// Guardar el evento en la base de datos
	if err := db.Create(&event).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al crear el evento",
			"error":   err.Error(),
		})
	}

	// Responder con el evento creado
	return c.Status(fiber.StatusCreated).JSON(event)
}
