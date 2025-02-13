import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleMapPicker from "./GoogleMapPicker";

const EventModal = ({ isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLocationChange = (coords) => {
    setLocation(coords); // Actualiza la ubicación seleccionada
  };

  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza nada

  const onFormSubmit = (data) => {
    onSubmit(data, file, location); // Pasar los datos del formulario, archivo y ubicación seleccionada
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full max-h-screen overflow-y-auto">
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
              {...register("event_date", {
                required: "La fecha es obligatoria",
              })}
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
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
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
              Precio:
            </label>
            <input
              {...register("price", {
                required: "El precio es obligatorio",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Debe ser un número válido",
                },
                min: { value: 0, message: "El precio no puede ser negativo" },
              })}
              type="number"
              step="0.01"
              placeholder="Precio de la entrada"
              className={`border p-2 w-full rounded ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
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
            <GoogleMapPicker onChange={handleLocationChange} />
            <p className="text-sm text-gray-500 mt-2">
              Dirección seleccionada: {location ? location : "No seleccionada"}
            </p>
          </div>
          <div className="flex justify-end mt-4">
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
