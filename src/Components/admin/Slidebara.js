import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebara.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePerfilClick = () => {
        console.log("Perfil clickeado");
        navigate('/ProfileA'); // Cambia la ruta según sea necesario
    };

    const handleVehiculosClick = () => {
        console.log("Vehículos clickeado");
        navigate('/Vehiculos'); // Cambia la ruta según sea necesario
    };

    const handleServiciosClick = () => {
        console.log("Servicios clickeado");
        navigate('/Servicios'); // Cambia la ruta según sea necesario
    };

    const handleProductosClick = () => {
        console.log("Inventario clickeado");
        navigate('/Inventory'); // Cambia la ruta según sea necesario
    };

    const handleUsuariosClick = () => {
        console.log("Usuarios clickeado");
        navigate('/Usuarios'); // Cambia la ruta según sea necesario
    };

    const handleSolicitudesClick = () => {
        console.log("Solicitudes clickeado");
        navigate('/VerSolicitudes'); // Cambia la ruta según sea necesario
    };

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Menú Admin</h3>
            <nav>
                <div className='nav-container-3'>
                    <div className='nav-buttons-3'>
                        <button className='btn-perfil-3 btn-base' onClick={handlePerfilClick}>Perfil</button>
                        <button className='btn-Usuarios-3 btn-base' onClick={handleUsuariosClick}>Usuarios</button>
                        <button className='btn-vehiculos-3 btn-base' onClick={handleVehiculosClick}>Vehículos</button>
                        <button className='btn-servicios-3 btn-base' onClick={handleServiciosClick}>Servicios</button>
                        <button className='btn-inventario-3 btn-base' onClick={handleProductosClick}>Inventario</button>
                        <button className='btn-solicitudes-3 btn-base' onClick={handleSolicitudesClick}>Solicitudes</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;