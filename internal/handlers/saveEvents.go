package handlers

import (
	"fmt"
	"strconv"
	"strings"
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

	// Parsear y asignar la fecha del evento
	var parsedDate time.Time
	if parsedDate, err = time.Parse("2006-01-02T15:04", eventDate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Formato de fecha no válido",
			"error":   err.Error(),
		})
	}

	// Parsear la ubicación (latitud y longitud) desde el campo location
	coords := strings.Split(location, ",")
	if len(coords) != 2 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "La ubicación debe estar en formato 'lat,lng'",
		})
	}

	lat, latErr := strconv.ParseFloat(strings.TrimSpace(coords[0]), 64)
	lng, lngErr := strconv.ParseFloat(strings.TrimSpace(coords[1]), 64)
	if latErr != nil || lngErr != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Coordenadas inválidas para la ubicación",
		})
	}

	// Crear el evento y asignar Geom
	event := models.Event{
		UserID:      userID,
		Title:       title,
		Description: description,
		Location:    location,
		ImageURL:    imageURL,
		EventDate:   parsedDate,
		Geom:        fmt.Sprintf("SRID=4326;POINT(%f %f)", lng, lat), // Crear el campo Geom
	}

	// Guardar el evento usando GORM
	if err := db.Create(&event).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al crear el evento",
			"error":   err.Error(),
		})
	}

	// Responder con éxito
	return c.Status(fiber.StatusCreated).JSON(event)
}
