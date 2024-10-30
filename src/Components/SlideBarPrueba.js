// Sidebar.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { FaUser, FaUsers, FaCar, FaTools, FaBox, FaClipboardList } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // Importar Link y useNavigate
import './styles/SideBarPrueba.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Usar useNavigate

  const menuItems = [
    { id: 1, title: "Perfil", icon: <FaUser />, link: "/ProfileE" },
    { id: 2, title: "Usuarios", icon: <FaUsers />, link: "/UsuariosE" },
    { id: 3, title: "Vehículos", icon: <FaCar />, link: "/VehiculosE" },
    { id: 4, title: "Servicios", icon: <FaTools />, link: "/ServiciosE" },
    { id: 5, title: "Inventario", icon: <FaBox />, link: "/InventoryE" },
    { id: 6, title: "Solicitudes", icon: <FaClipboardList />, link: "/VerSolicitudesE" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    navigate('/'); // Redirigir a la página de inicio
  };

  return (
    <motion.div 
      className="sidebar"
      animate={{ width: isOpen ? "240px" : "70px" }}
      transition={{ duration: 0.5, type: "spring", damping: 10 }}
    >
      <div className="top_section">
        {isOpen && (
          <motion.div 
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.div>
        )}
        <motion.div 
          className="toggle-btn"
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenuAlt3 />
        </motion.div>
      </div>
      <div className="menu-items">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link} // Usar Link en lugar de href
            className="menu-item"
          >
            <div className="icon">{item.icon}</div>
            {isOpen && (
              <motion.div 
                className="link_text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item.title}
              </motion.div>
            )}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;