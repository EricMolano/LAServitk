import { motion } from "framer-motion";
import { useState } from "react";
import { FaUser, FaUsers, FaCar, FaTools, FaBox, FaClipboardList } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ProfileE from './ProfileE'; // Import Profile component
import '../styles/SideBarPrueba.css';

const Slidebarem = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClientesOpen, setIsClientesOpen] = useState(false);
  const [isProductosOpen, setIsProductosOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to control profile modal visibility
  const navigate = useNavigate();

  const toggleClientes = () => setIsClientesOpen(!isClientesOpen);
  const toggleProductos = () => setIsProductosOpen(!isProductosOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen); // Function to toggle profile modal

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <motion.div 
      className="contenedor-barra"
      animate={{ width: isOpen ? "240px" : "70px" }}
      transition={{ duration: 0.3, type: "spring", damping: 10 }}
    >
      <div className="encabezado-barra">
        <motion.div 
          className="boton-toggle"
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenuAlt3 />
        </motion.div>
      </div>

      <div className="lista-items">
        <div className="btn-cerrar-sesion" onClick={toggleProfile}>
          <div className="icono-item"><FaUser /></div>
          {isOpen && <div className="texto-enlace-item">Perfil</div>}
        </div>

        <div className="btn-cerrar-sesion" onClick={toggleClientes}>
          {isOpen && <div className="texto-enlace-item">Clientes</div>}
          <div className="flecha-item">{isClientesOpen ? <MdExpandLess /> : <MdExpandMore />}</div>
        </div>
        
        {isOpen && isClientesOpen && (
          <motion.div 
            className="sublista-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/UsuariosE" className="btn-cerrar-sesion">
              <div className="icono-item"><FaUsers /></div>
              {isOpen && <div className="texto-enlace-item">Usuarios</div>}
            </Link>
            <Link to="/VehiculosE" className="btn-cerrar-sesion">
              <div className="icono-item"><FaCar /></div>
              {isOpen && <div className="texto-enlace-item">Vehículos</div>}
            </Link>
            <Link to="/ServiciosE" className="btn-cerrar-sesion">
              <div className="icono-item"><FaTools /></div>
              {isOpen && <div className="texto-enlace-item">Servicios</div>}
            </Link>
          </motion.div>
        )}

        <div className="btn-cerrar-sesion" onClick={toggleProductos}>
          {isOpen && <div className="texto-enlace-item">Productos</div>}
          <div className="flecha-item">{isProductosOpen ? <MdExpandLess /> : <MdExpandMore />}</div>
        </div>

        {isOpen && isProductosOpen && (
          <motion.div 
            className="sublista-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/InventoryE" className="btn-cerrar-sesion">
              <div className="icono-item"><FaBox /></div>
              {isOpen && <div className="texto-enlace-item">Inventario</div>}
            </Link>
            <Link to="/VerSolicitudesE" className="btn-cerrar-sesion">
              <div className="icono-item"><FaClipboardList /></div>
              {isOpen && <div className="texto-enlace-item">Solicitudes</div>}
            </Link>
          </motion.div>
        )}
      </div>
      
      <div className="cerrar-sesion">
        <button onClick={cerrarSesion} className="btn-cerrar-sesion">
          <div className="icono-item"><BiLogOut /></div>
          {isOpen && <div>Cerrar Sesión</div>}
        </button>
      </div>

      {/* Render Profile as a modal */}
      {isProfileOpen && <ProfileE showModal={isProfileOpen} closeModal={toggleProfile} />}
    </motion.div>
  );
};

export default Slidebarem;