import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth', { withCredentials: true });
        if (response.data.authenticated) {
          navigate("/dashboard"); // Redirigir si está autenticado
        }
      } catch (error) {
        console.log('Usuario no autenticado o sesión expirada');
      }
    };
    checkAuth();
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/login', data, { withCredentials: true });
      console.log('Respuesta del servidor:', response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Inicio de Sesión</h2>

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

        {/* Botón de Iniciar Sesión */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
