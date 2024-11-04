// Vehicles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faTimes, faHome, faCar } from '@fortawesome/free-solid-svg-icons';
import Modal from '../cliente/Modal'; // Import the modal
import AddVehicle from './AddVehicle';
import EditVehicle from './EditVehicle';
import '../styles/Vehicles.css';

const Vehicles = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editVehicleId, setEditVehicleId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/vehicles', {
            headers: { Authorization: `Bearer ${token}` }
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleHomeClick = () => {
        navigate('/ClientDashboard');
    };

    const handleAddVehicle = () => setAddModalOpen(true);
    const handleEditVehicle = (id) => {
        setEditVehicleId(id);
        setEditModalOpen(true);
    };

    const closeModal = () => {
        setAddModalOpen(false);
        setEditModalOpen(false);
        setEditVehicleId(null);
    };

    if (loadingVehicles) return <div>Cargando vehículos...</div>;
    if (errorVehicles) return <div>{errorVehicles}</div>;

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { name: 'Marca', selector: row => row.marca, sortable: true },
        { name: 'Modelo', selector: row => row.modelo, sortable: true },
        { name: 'Año', selector: row => row.año, sortable: true },
        { name: 'Color', selector: row => row.color || 'N/A' },
        { name: 'Placa', selector: row => row.placa, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <button onClick={() => handleEditVehicle(row.idvehiculo)}>Actualizar</button>
            )
        },
    ];

    return (
        <div className="vehicle-app-content">
        <nav className="vehicle-app-navbar">
            <a href="#" className="vehicle-app-logo">
                <img src={require('../Assets/servilogo.png')} alt="La Servitk Logo" className="vehicle-app-logo-image" />
                La Servitk
            </a>

            <div className="vehicle-app-user-menu">
                <button className="vehicle-app-user-menu-button" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                    <FontAwesomeIcon icon={faHome} />
                </button>
                <div className={`vehicle-app-user-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
                    <button onClick={handleHomeClick} className="vehicle-app-user-item">
                        <FontAwesomeIcon icon={faHome} /> Home
                    </button>
                    <button onClick={handleAddVehicle} className="vehicle-app-user-item">
                        <FontAwesomeIcon icon={faCar} /> Agregar Vehículo
                    </button>
                    <button onClick={handleLogout} className="vehicle-app-user-item">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                    </button>
                </div>
            </div>  

            <div className={`vehicle-app-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </div>
        </nav>

            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="vehicle-app-search-input"
            />

            <DataTable
                title="Información de Vehículos"
                columns={columns}
                data={filteredVehicles}
                pagination
            />

<footer className="vehicle-app-footer">
                <p>&copy; 2024 LaServitk. Todos los derechos reservados.</p>
            </footer>

            {/* Modals for Add and Edit */}
            {addModalOpen && <AddVehicle onClose={closeModal} />}
            {editModalOpen && <EditVehicle id={editVehicleId} onClose={closeModal} />}
        </div>

        
    );
};

export default Vehicles;
