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
    <div className="mt-3 max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
      <img
        src={event.ImageURL}
        alt={event.Title}
        className="w-72 h-auto object-cover mb-4 rounded-md"
      />
      <h2 className="text-2xl font-bold mb-4">{event.Title}</h2>
      <p><strong>Descripción:</strong> {event.Description}</p>
      <p><strong>Fecha:</strong> {new Date(event.EventDate).toLocaleDateString()}</p>
      <p><strong>Ubicación:</strong> {event.Location}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
        Comprar ticket
      </button>
    </div>
  );
}
