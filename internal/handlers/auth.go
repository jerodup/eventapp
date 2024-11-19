package handlers

import (
	"time"

	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/jerodup/go-react/internal/utils"
)

// Estructura para los claims del JWT
type Claims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

// Función para verificar la autenticación mediante el JWT en la cookie
func VerifyAuth(c *fiber.Ctx) error {
	// Obtener la cookie con el token
	tokenString := c.Cookies("jwt")
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "No autenticado"})
	}

	// Validar el token
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return utils.GetJWTSecret(), nil
	})
	if err != nil || !token.Valid {
		fmt.Println("Error al validar token:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Token no válido", "error": err.Error()})
	}
	// Verificar si el token está expirado
	claims, ok := token.Claims.(*Claims)
	if !ok || claims.ExpiresAt < time.Now().Unix() {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Token no válido o expirado"})
	}

	// Respuesta de éxito si el token es válido
	fmt.Println("Token válido, autenticación exitosa")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Autenticado"})
}
