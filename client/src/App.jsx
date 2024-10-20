import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
  };

  // Validación para confirmar que las contraseñas coincidan
  const password = watch('password');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Registro</h2>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nombre</label>
          <input
            id="name"
            className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            {...register('name', { required: 'Este campo es obligatorio' })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Correo electrónico no válido'
              }
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {/* Confirmar Contraseña */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full px-3 py-2 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            {...register('confirmPassword', {
              required: 'Este campo es obligatorio',
              validate: (value) => value === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        </div>

        {/* Botón de Registro */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default App;
