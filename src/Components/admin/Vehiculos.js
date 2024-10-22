import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminVehicles } from "../../services/authService"; // Ensure this function is properly implemented
import Sidebar from './Slidebara';
import DataTable from 'react-data-table-component';
import '../styles/Vehiculos.css'; // Asegúrate de tener un archivo CSS para los estilos

export const API_URL = "http://localhost:2071/api";

function Vehiculos() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Importing useNavigate

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAdminVehicles();
                setVehicles(data);
            } catch (error) {
                setError("Error al obtener los vehículos.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const handleUpdateVehicleUser = (idvehiculo) => {
        navigate(`/update-vehicle-user/${idvehiculo}`);
    };

    if (loading) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.año.toString().includes(searchTerm.toLowerCase()) ||
        vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            selector: row => row.color,
            sortable: true,
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
                <button onClick={() => handleUpdateVehicleUser(row.idvehiculo)}>Actualizar</button>
            ),
            width: '150px',
        },
    ];

    return (
        <div className="vehiculos-content">
            <Sidebar />
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
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
                            maxWidth: '100%',
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
    );
}

export default Vehiculos;