package models

import "time"

type Event struct {
	EventID     uint      `gorm:"primaryKey"`
	UserID      uint      `gorm:"not null"`
	Title       string    `gorm:"not null"`
	EventDate   time.Time `gorm:"not null"`
	Description string
	ImageURL    string
	Location    string
	Geom        string  `gorm:"type:geometry"` // Define el campo Geom
	Price       float64 `gorm:"not null;default:0"`
}
