import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faTimes, faHome, faCar } from '@fortawesome/free-solid-svg-icons'; // Import the car icon
import '../styles/Vehicles.css';

const Vehicles = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        navigate('/home');
    };

    const handleAddVehicle = () => navigate('/add-vehicle');
    const handleUpdateVehicle = (id) => navigate(`/edit-vehicle/${id}`);

    if (loadingVehicles) {
        return <div className="vehicle-app-loading">Cargando vehículos...</div>;
    }

    if (errorVehicles) {
        return <div className="vehicle-app-error">{errorVehicles}</div>;
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { name: 'Marca', selector: row => row.marca, sortable: true, wrap: true, width: '150px' },
        { name: 'Modelo', selector: row => row.modelo, sortable: true, wrap: true, width: '150px' },
        { name: 'Año', selector: row => row.año, sortable: true, wrap: true, width: '100px' },
        { name: 'Color', selector: row => row.color || 'N/A', wrap: true, width: '100px' },
        { name: 'Placa', selector: row => row.placa, sortable: true, wrap: true, width: '150px' },
        {
            name: 'Acciones',
            cell: row => (
                <button onClick={() => handleUpdateVehicle(row.idvehiculo)} className="vehicle-app-update-button">
                    Actualizar
                </button>
            ),
            width: '150px',
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

            <div className="vehicle-app-table-wrapper">
                <DataTable
                    title="Información de Vehículos"
                    columns={columns}
                    data={filteredVehicles}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent="No hay vehículos disponibles."
                    responsive
                    style={{ marginTop: '10px', fontSize: '0.8rem' }}
                    customStyles={{
                        table: { style: { fontSize: '0.8rem', width: '100%' } },
                        head: { style: { backgroundColor: '#a93226', fontWeight: 'bold', fontSize: '0.9rem', padding: '10px' } },
                        cells: { style: { padding: '10px', fontSize: '0.8rem', wordBreak: 'break-word' } },
                    }}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Filas por página',
                        rangeSeparatorText: 'de',
                        noRowsPerPage: false,
                        selectAllRowsItem: true,
                        selectAllRowsItemText: 'Todos',
                    }}
                />
            </div>

            <footer className="vehicle-app-footer">
                <p>&copy; 2024 LaServitk. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Vehicles;
