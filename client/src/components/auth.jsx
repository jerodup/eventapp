import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function auth({children}) {

  const navigate = useNavigate();

  useEffect(() => {
      // Verificar autenticación
      axios.get('http://localhost:4000/auth', { withCredentials: true })
          .then(response => {
              if (response.status !== 200) {
                  throw new Error('No autenticado');
              }
          })
          .catch(error => {
              console.error("Acceso denegado:", error.response?.data?.message || error.message);
              navigate('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
          });
  }, [navigate]);
  return children
}