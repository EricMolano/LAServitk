import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientDashboard.css';

const ClientDashboard = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const [errorServices, setErrorServices] = useState(null);
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
            setLoadingUser(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoadingUser(false);
        });
    }, []);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/vehicles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setVehicles(response.data);
            setLoadingVehicles(false);
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
            setErrorVehicles('Error al obtener los vehículos.');
            setLoadingVehicles(false);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token usuario", token);
        axios.get('http://localhost:2071/api/servicios', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setServices(response.data);
            setLoadingServices(false);
        })
        .catch(error => {
            console.error('Error fetching :', error);
            setErrorServices('Error .');
            setLoadingServices(false);
        });
    }, []);
      

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const handleAddVehicle = () => {
        navigate('/add-vehicle');
    };

    const handleUpdateVehicle = (id) => {
        navigate(`/edit-vehicle/${id}`);
    };

    if (loadingUser || loadingVehicles) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="toggle-btn" onClick={toggleSidebar}>
                    {isSidebarCollapsed ? '▶' : '◀'}
                </div>
                <h2 className={`sidebar-title ${isSidebarCollapsed ? 'collapsed' : ''}`}>Menú</h2>
                <ul>
                    <li onClick={() => setActiveSection('profile')}>Perfil</li>
                    <li onClick={() => setActiveSection('vehicles')}>Vehículos</li>
                    <li onClick={() => setActiveSection('services')}>Servicios</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <h1>La Servitk</h1>
                    <div className="user-menu">
                        <button className="user-btn" onClick={toggleDropdown}>
                            👤
                        </button>
                        {isDropdownOpen && (
                            <div className="user-dropdown">
                                <ul>
                                    <li onClick={handleLogout}>Cerrar sesión</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="dashboard-content">
                    {activeSection === 'profile' && (
                        <div className="welcome-table-container">
                            <h1>Bienvenido a tu perfil</h1>
                            <table className="welcome-table">
                                <tbody>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{userData ? userData.name : 'Cargando...'}</td>
                                    </tr>
                                    <tr>
                                        <th>Apellido</th>
                                        <td>{userData ? userData.surname : 'Cargando...'}</td>
                                    </tr>
                                    <tr>
                                        <th>Correo Electrónico</th>
                                        <td>{userData ? userData.email : 'Cargando...'}</td>
                                    </tr>
                                    <tr>
                                        <th>Dirección</th>
                                        <td>{userData ? userData.address : 'Cargando...'}</td>
                                    </tr>
                                    <tr>
                                        <th>Teléfono</th>
                                        <td>{userData ? userData.phone : 'Cargando...'}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="profile-button" onClick={handleEditProfile}>Editar Perfil</button>
                        </div>
                    )}
                    {activeSection === 'vehicles' && (
                        <div className="vehicles-content">
                            <div className="section-title">Vehículos</div>
                            <button className="add-vehicle-button" onClick={handleAddVehicle}>
                                Agregar Vehículo
                            </button>
                            {errorVehicles ? (
                                <div>{errorVehicles}</div>
                            ) : (
                                <table className="vehicles-table">
                                    <thead>
                                        <tr>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Año</th>
                                            <th>Color</th>
                                            <th>Placa</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map(vehicle => (
                                            <tr key={vehicle.idvehiculo}>
                                                <td>{vehicle.marca}</td>
                                                <td>{vehicle.modelo}</td>
                                                <td>{vehicle.año}</td>
                                                <td>{vehicle.color || 'N/A'}</td>
                                                <td>{vehicle.placa}</td>
                                                <td>
                                                    <button onClick={() => handleUpdateVehicle(vehicle.idvehiculo)}>Actualizar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                      {activeSection === 'services' && (
                        <div className="services-content">
                            <div className="section-title">Servicios</div>
                            {errorServices ? (
                                <div>{errorServices}</div>
                            ) : (
                                <table className="services-table">
                                    <thead>
                                        <tr>
                                            <th>Empleado</th>
                                            <th>Cliente</th>
                                            <th>Placa</th>
                                            <th>Servicio</th>
                                            <th>Descripción</th>
                                            <th>Fecha </th>
                                            <th>Costo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map(service => (
                                            <tr key={service.idregistro}>
                                                <td>{service.nombre_empleado}</td>
                                                <td>{service.nombre_cliente}</td>
                                                <td>{service.placa_vehiculo}</td>
                                                <td>{service.nombre_servicio}</td>
                                                <td>{service.descripcion}</td>
                                                <td>{new Date(service.fecha_servicio).toLocaleDateString()}</td>
                                                <td>{service.costo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ClientDashboard;