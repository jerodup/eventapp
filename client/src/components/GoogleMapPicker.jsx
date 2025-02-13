import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -31.9337, // Coordenadas por defecto (en caso de que no se pueda obtener la ubicación)
  lng: -65.043,
};

const GoogleMapPicker = ({ onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(userLocation);
          onChange(`${userLocation.lat},${userLocation.lng}`);
        },
        () => {
          console.error("No se pudo obtener la ubicación del usuario");
          setSelectedLocation(defaultCenter); // Usar valores predeterminados si falla
          onChange(`${defaultCenter.lat},${defaultCenter.lng}`);
        }
      );
    } else {
      console.error("Geolocalización no soportada");
      setSelectedLocation(defaultCenter);
      onChange(`${defaultCenter.lat},${defaultCenter.lng}`);
    }
  }, [onChange]);

  const handleClick = (event) => {
    const coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(coords);
    onChange(`${coords.lat},${coords.lng}`);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {selectedLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation}
          zoom={15} // Zoom más cercano a la ubicación actual
          onClick={handleClick}
        >
          <Marker position={selectedLocation} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapPicker;
