import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams(); // Obtener el ID del evento desde la URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error al obtener el evento:", error.response?.data || error.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Cargando evento...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>{event.title}</h1>
      <img
        src={event.image_url}
        alt={event.title}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <p><strong>Descripción:</strong> {event.description}</p>
      <p><strong>Fecha:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
      <p><strong>Ubicación:</strong> {event.location}</p>
    </div>
  );
}
