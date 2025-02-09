import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow mx-auto ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold"><Link to="/" className="text-blue-600">Y-HOY?</Link></span>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/register" className=" border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white">
              Registrarse
            </Link>
            <Link to="/login" className=" px-4 py-2 border border-blue-500 hover:border-blue-600 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Iniciar sesión
            </Link>
          </div>
          <div className="flex md:hidden">    
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600">
            Home
          </a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600">
            About
          </a>
          <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600">
            Services
          </a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
