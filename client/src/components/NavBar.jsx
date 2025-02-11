import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get("http://localhost:4000/auth-check", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/"); // Redirige al usuario al home después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="shadow mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">
              <Link to="/" className="text-blue-600">Y-HOY?</Link>
            </span>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {!isAuthenticated && (
              <>
                <Link to="/register" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white">
                  Registrarse
                </Link>
                <Link to="/login" className="px-4 py-2 border border-blue-500 hover:border-blue-600 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Iniciar sesión
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="px-4 py-2 border border-blue-500 hover:border-blue-600 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Mis eventos
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-blue-500 hover:border-blue-600 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
