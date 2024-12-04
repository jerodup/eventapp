import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MapPicker from "./MapPicker"; // Componente para seleccionar la ubicación en el mapa

const EventModal = ({ isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState(""); // Ubicación seleccionada
  const [file, setFile] = useState(null); // Archivo seleccionado

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null; // No renderizar si el modal está cerrado

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation); // Actualizar la ubicación seleccionada
  };

  const onFormSubmit = (data) => {
    onSubmit(data, file, location); // Pasar los datos, archivo y ubicación al handler del padre
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Título:
            </label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              type="text"
              placeholder="Título del evento"
              className={`border p-2 w-full rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Fecha:</label>
            <input
              {...register("event_date", { required: "La fecha es obligatoria" })}
              type="datetime-local"
              className={`border p-2 w-full rounded ${
                errors.event_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.event_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.event_date.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Descripción:
            </label>
            <textarea
              {...register("description", { required: "La descripción es obligatoria" })}
              placeholder="Descripción del evento"
              className={`border p-2 w-full rounded ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Imagen:
            </label>
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 p-2 w-full rounded"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Ubicación:
            </label>
            {/* Mapa para seleccionar la ubicación */}
            <MapPicker onChange={handleLocationChange} />
            <p className="text-sm text-gray-500 mt-2">
              Dirección seleccionada: {location || "No seleccionada"}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
