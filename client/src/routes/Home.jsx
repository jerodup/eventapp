import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Estado para guardar la ubicación del usuario
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el cargando

  // Obtener la ubicación del usuario
  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        console.error("La geolocalización no es soportada por este navegador.");
        setIsLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
          setIsLoading(false);
        }
      );
    };

    getUserLocation();
    console.log(events)
  }, []);

  // Obtener eventos cercanos cuando haya una ubicación del usuario
  useEffect(() => {
    const fetchNearbyEvents = async () => {
      if (!userLocation) return;

      try {
        const response = await axios.get("http://localhost:4000/events/nearby", {
          params: {
            lat: userLocation.lat,
            lng: userLocation.lng,
            radius: 30, // Radio en kilómetros
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error(
          "Error al obtener eventos cercanos:",
          error.response?.data || error.message);
      }
    };

    fetchNearbyEvents();
  }, [userLocation]);

  // Mostrar mensaje de cargando mientras obtenemos ubicación o eventos
  if (isLoading) {
    return <p className="text-gray-600">Buscando eventos cercanos...</p>;
  }

  // Renderizar los eventos
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 py-6">Eventos disponibles cerca tuyo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.event_id}
              className="border border-gray-300 rounded-lg p-4 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2">{event.description}</p>
              <Link to={`/events/${event.event_id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Ver evento
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No hay eventos disponibles cerca de tu ubicación.
          </p>
        )}
      </div>
    </div>
  );
}
