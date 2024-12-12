import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de datos

  // Función para calcular la distancia entre dos coordenadas
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna la distancia en kilómetros
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error.response?.data || error.message);
      }
    };

    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setIsLoading(false); // Finaliza la carga cuando se obtiene la ubicación
          },
          (error) => {
            console.error("Error al obtener la ubicación del usuario:", error.message);
            setIsLoading(false); // Finaliza la carga incluso si hay un error
          }
        );
      } else {
        setIsLoading(false); // Finaliza la carga si no se puede usar geolocalización
      }
    };

    fetchEvents();
    fetchUserLocation();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (!userLocation || !event.location) return false;

    const [eventLat, eventLng] = event.location.split(",").map(Number);
    const distance = calculateDistance(userLocation.lat, userLocation.lng, eventLat, eventLng);
    return distance <= 30; // Filtra los eventos dentro de 30 km
  });

  // Mientras los eventos y la ubicación estén cargando
  if (isLoading) {
    return <p className="text-gray-600">Buscando eventos cercanos...</p>;
  }

  // Después de cargar, renderiza los eventos
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Eventos disponibles cerca tuyo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
          <p className="text-gray-600">No hay eventos disponibles cerca de tu ubicación.</p>
        )}
      </div>
    </div>
  );
}
