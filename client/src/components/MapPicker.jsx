import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPicker = ({ onChange }) => {
  const [position, setPosition] = useState(null); // Coordenadas iniciales vacías

  // Obtener la ubicación actual del dispositivo
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]); // Actualizar la posición inicial
          onChange(`${latitude},${longitude}`); // Pasar la ubicación inicial al componente padre
        },
        (err) => {
          console.error("Error al obtener la ubicación:", err.message);
          setPosition([51.505, -0.09]); // Fallback a una ubicación por defecto
        }
      );
    } else {
      console.error("La geolocalización no está soportada por el navegador.");
      setPosition([51.505, -0.09]); // Fallback a una ubicación por defecto
    }
  }, [onChange]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onChange(`${lat},${lng}`); // Pasar la nueva ubicación al componente padre
      },
    });

    return position ? <Marker position={position}></Marker> : null;
  };

  if (!position) return <p>Cargando mapa...</p>; // Muestra un mensaje mientras se obtiene la ubicación

  return (
    <div className="h-64 w-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
