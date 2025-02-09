import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -31.9337, // Coordenadas iniciales
  lng: -65.043,
};

const GoogleMapPicker = ({ onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  const handleClick = (event) => {
    const coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(coords);
    // Formatear las coordenadas como 'lat,lng'
    const formattedCoords = `${coords.lat},${coords.lng}`;
    onChange(formattedCoords); // Pasar las coordenadas formateadas al componente padre
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={10}
        onClick={handleClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapPicker;
