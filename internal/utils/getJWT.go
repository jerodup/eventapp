package utils

import "os"

// GetJWTSecret retorna la clave secreta para el JWT
func GetJWTSecret() []byte {
	return []byte(os.Getenv("JWT_SECRET"))
}
