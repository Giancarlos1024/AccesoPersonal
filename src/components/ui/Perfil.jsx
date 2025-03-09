import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User,Settings,CircleHelp,MoonStarIcon,LucideLanguages,LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export const Perfil = () => {
  const { user, logout } = useAuth(); // Extraer usuario y función de logout
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const menuRef = useRef(null);
  
  const navigate = useNavigate();

  

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handlePerfil = () => {
    navigate("/dashboard/perfil");
  };

  const handleConfiguracion = () => {
    navigate("/dashboard/configuracion");
  };


  const handleCerrarSesion = () => {
    logout(); // Llamar a la función de logout
    navigate("/");
  };

  return (
    <div className="flex items-center justify-end bg-cyan-500 text-white px-4 py-1 shadow-md relative">
      {/* Botón de Notificaciones */}
      <button className="relative mr-6 p-2 rounded-full hover:bg-white/10 focus:outline-none">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Sección de Perfil */}
      <div ref={menuRef} className="relative">
        <div
          className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user?.user?.avatar || "/img/perfil.jpg"} // Si hay avatar, úsalo, si no, usa imagen por defecto
            alt="Avatar Usuario"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{`${userData.firstname} ${userData.lastname}` || "Invitado"}</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Menú desplegable */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-black text-white rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li onClick={handlePerfil} className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <User className="w-5 h-5" /> 
              Ver Perfil
            </li>
            <li onClick={handleConfiguracion} className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuración
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <CircleHelp className="w-5 h-5" />
              Ayuda
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <MoonStarIcon className="w-5 h-5" />
              Aspecto : oscuro
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
              <LucideLanguages className="w-5 h-5" />
              Idioma : español
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 border-t border-gray-600 mt-2" onClick={handleCerrarSesion} >
              <LogInIcon />
              Cerrar Sesión
            </li>
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};
