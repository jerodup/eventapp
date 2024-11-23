package models

import "time"

type Event struct {
	EventID     uint      `gorm:"primaryKey" json:"event_id"`
	UserID      uint      `json:"user_id"`
	Title       string    `json:"title"`
	EventDate   time.Time `json:"event_date"`
	Description string    `json:"description"`
	ImageURL    string    `json:"image_url"`
	Location    string    `json:"location"`
}
