package handlers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetNearbyEvents(c *fiber.Ctx, db *gorm.DB) error {
	// Obtener latitud, longitud y radio del usuario desde los parámetros de consulta
	lat, errLat := strconv.ParseFloat(c.Query("lat"), 64)
	lng, errLng := strconv.ParseFloat(c.Query("lng"), 64)
	radius, errRadius := strconv.ParseFloat(c.Query("radius", "60"), 64) // 30 km por defecto

	if errLat != nil || errLng != nil || errRadius != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Parámetros de latitud, longitud o radio inválidos",
		})
	}

	// Convertir el radio de kilómetros a metros
	radiusMeters := radius * 1000

	// Crear la consulta SQL para encontrar eventos dentro del radio
	query := `
        SELECT event_id, user_id, title, event_date, description, image_url, location,
               ST_Distance(ST_Transform(geom, 3857), ST_Transform(ST_SetSRID(ST_MakePoint(?, ?), 4326), 3857)) AS distance
        FROM events
        WHERE ST_DWithin(ST_Transform(geom, 3857), ST_Transform(ST_SetSRID(ST_MakePoint(?, ?), 4326), 3857), ?)
        ORDER BY distance ASC;
    `

	// Ejecutar la consulta y escanear los resultados
	var events []map[string]interface{}
	if err := db.Raw(query, lng, lat, lng, lat, radiusMeters).Scan(&events).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error al buscar eventos cercanos",
			"error":   err.Error(),
		})
	}

	// Si no hay eventos, devolver un array vacío
	if len(events) == 0 {
		return c.JSON([]map[string]interface{}{})
	}

	// Devolver los eventos en la respuesta
	return c.JSON(events)
}
