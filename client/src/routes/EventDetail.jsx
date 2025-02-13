import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams(); // Obtener el ID del evento desde la URL
  const [event, setEvent] = useState(null);
  const [locationName, setLocationName] = useState(""); // Estado para el nombre de la ubicación
 
  console.log("API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
        fetchLocationName(response.data.Location); // Llamar a la función para obtener el nombre del lugar
      } catch (error) {
        console.error("Error al obtener el evento:", error.response?.data || error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const fetchLocationName = async (coords) => {
    if (!coords) return;

    const [lat, lng] = coords.split(",").map(Number); // Convertir "lat,lng" en valores numéricos

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.status === "OK") {
        const address = response.data.results[0]?.formatted_address || "Ubicación desconocida";
        setLocationName(address);
      } else {
        console.error("Error en la geocodificación:", response.data.status);
        setLocationName("Ubicación no disponible");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error.message);
      setLocationName("Error al obtener ubicación");
    }
  };

  if (!event) return <p>Cargando evento...</p>;

  return (
    <div className="mt-3 max-w-7xl mx-auto bg-white p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <img
          src={event.ImageURL}
          alt={event.Title}
          className="w-full h-auto object-cover mb-4 rounded-md"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 capitalize">{event.Title}</h2>
        <p><strong>Descripción:</strong> {event.Description}</p>
        <p><strong>Fecha:</strong> {new Date(event.EventDate).toLocaleDateString()}</p>
        <p><strong>Precio:</strong> ${event.Price}</p>

        {/* Mostrar el nombre del lugar en vez de las coordenadas */}
        <p><strong>Ubicación:</strong> {locationName}</p>

        <form action="" className="mt-4 flex flex-col">
          <label htmlFor="email">Email donde se enviará la entrada</label>
          <input type="email" className="w-1/2 border border-gray-300 rounded-md px-4 py-2 mt-4" placeholder="nombre@mail.com" />
          <label htmlFor="">Cantidad</label>
          <input type="number" name="" id=""  className="w-1/4 border border-gray-300 rounded-md px-4 py-2 mt-4"/>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 w-fit">Comprar entada</button>
        </form>
      </div>
    </div>
  );
}
