import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import '../styles/Vehicles.css'; // Reutilizar los estilos de UsuariosE

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const handleAddVehicle = () => navigate('/add-vehicle');
    const handleUpdateVehicle = (id) => navigate(`/edit-vehicle/${id}`);

    if (loadingVehicles) {
        return <div className="loading-message">Cargando vehículos...</div>;
    }

    if (errorVehicles) {
        return <div className="error-message">{errorVehicles}</div>;
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Año',
            selector: row => row.año,
            sortable: true,
            wrap: true,
            width: '100px',
        },
        {
            name: 'Color',
            selector: row => row.color || 'N/A',
            wrap: true,
            width: '100px',
        },
        {
            name: 'Placa',
            selector: row => row.placa,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <button onClick={() => handleUpdateVehicle(row.idvehiculo)} className="update-button">
                    Actualizar
                </button>
            ),
            width: '150px',
        },
    ];

    return (
        <div className="informacion-usuarios-content">
            <button onClick={handleAddVehicle} className="add-vehicle-button">Agregar Vehículo</button>

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="data-table-wrapper">
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
                        table: {
                            style: {
                                fontSize: '0.8rem',
                                width: '100%',
                            },
                        },
                        head: {
                            style: {
                                backgroundColor: '#f2f2f2',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                padding: '10px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        },
                        cells: {
                            style: {
                                padding: '10px',
                                fontSize: '0.8rem',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                fontFamily: 'inherit',
                            },
                        },
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
        </div>
    );
};

export default Vehicles;