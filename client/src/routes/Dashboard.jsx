
import React, { useEffect } from "react";
import axios from "axios";

export default function Dashboard() {

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events", {
          withCredentials: true, // Envía las cookies (incluye el JWT en la cookie)
        });

        // Muestra los eventos obtenidos en la consola
        console.log("Eventos del usuario:", response.data);
      } catch (error) {
        // Muestra el error en caso de fallo
        console.error("Error al obtener los eventos:", error.response?.data || error.message);
      }
    };

    fetchUserEvents();
  }, []);   

  return (
    
   <>
    <h1>Dashboard</h1>
   </>
  )
}