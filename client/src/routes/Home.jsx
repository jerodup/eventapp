import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error.response?.data || error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Eventos Disponibles</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.event_id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "300px",
              }}
            >
              <h2>{event.title}</h2>
              <img
                src={event.image_url}
                alt={event.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <p>{event.description}</p>
              <Link to={`/events/${event.event_id}`}>Ver detalles</Link>
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>
    </div>
  );
}
