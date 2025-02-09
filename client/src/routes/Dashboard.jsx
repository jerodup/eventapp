import React, { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "../components/EventModal";

export default function Dashboard() {
  const [events, setEvents] = useState([]); // Estado para almacenar los eventos del usuario
  const [isModalOpen, setModalOpen] = useState(false); // Estado para manejar el modal

  // Función para obtener los eventos del usuario
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events", {
          withCredentials: true,
        });

        setEvents(response.data); // Almacena los eventos en el estado
        console.log("Eventos del usuario:", response.data);
      } catch (error) {
        console.error(
          "Error al obtener los eventos:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserEvents();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Función para manejar el envío del formulario en el modal
  const handleCreateEvent = async (data, file, location) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("event_date", data.event_date);
      formData.append("description", data.description);
      formData.append("image", file); // Agrega la imagen seleccionada
      formData.append("location", location); // Agrega la ubicación seleccionada

      console.log(formData);
      console.log(location);
      // Realiza la petición POST al servidor
      const response = await axios.post(
        "http://localhost:4000/events",
        formData,
        {
          withCredentials: true, // Incluye las credenciales
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Evento creado:", response.data);
      setEvents((prevEvents) => [...prevEvents, response.data]); // Actualiza la lista de eventos
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error(
        "Error al crear el evento:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear Nuevo Evento
      </button>

      {/* Lista de eventos */}
      <div className="mt-4">
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li
                key={event.EventID}
                className="border p-4 mb-2 rounded shadow"
              >
                <h2 className="text-xl font-bold">{event.Title}</h2>
                <p>Fecha: {new Date(event.EventDate).toLocaleString()}</p>
                <p>{event.Description}</p>
                <p>Ubicación: {event.Location}</p>
                <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes eventos registrados.</p>
        )}
      </div>

      {/* Modal de creación de eventos */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}
