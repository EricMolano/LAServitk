import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminVehicles } from "../../services/authService"; // Ensure this function is properly implemented
import Sidebar from './SlidebarE';
import DataTable from 'react-data-table-component';
import '../styles/Usuarios.css'; // Reutilizar los estilos de Usuarios

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
            wrap: true, // Ajusta el contenido para que se vea completo
            width: '150px', // Ajusta el ancho de la columna
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            wrap: true, // Ajusta el contenido para que se vea completo
            width: '150px', // Ajusta el ancho de la columna
        },
        {
            name: 'Año',
            selector: row => row.año,
            sortable: true,
            wrap: true, // Ajusta el contenido para que se vea completo
            width: '150px', // Ajusta el ancho de la columna
        },
        {
            name: 'Color',
            selector: row => row.color,
            wrap: true, // Ajusta el contenido para que se vea completo
            width: '150px', // Ajusta el ancho de la columna
        },
        {
            name: 'Placa',
            selector: row => row.placa,
            wrap: true, // Ajusta el contenido para que se vea completo
            width: '150px', // Ajusta el ancho de la columna
        },
    ];

    return (
        <div className="informacion-usuarios-content">
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>
            <div className="content-wrapper">
                {/* Campo de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                <div className="datatable-container">
                    <DataTable
                        title="Información de Vehículos"
                        columns={columns}
                        data={filteredVehicles}
                        pagination
                        highlightOnHover
                        striped
                        noDataComponent="No hay vehículos disponibles."
                        responsive
                        style={{ marginTop: '10px', fontSize: '0.8rem' }} // Ajusta el tamaño de fuente
                        customStyles={{
                            table: {
                                style: {
                                    fontSize: '0.8rem', // Ajusta el tamaño de la fuente para todo el DataTable
                                    maxWidth: '100%', // Asegura que el DataTable no exceda el ancho del contenedor
                                },
                            },
                            head: {
                                style: {
                                    backgroundColor: '#f2f2f2',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem', // Ajusta el tamaño de la fuente del encabezado
                                    padding: '10px', // Ajusta el espaciado del encabezado
                                    whiteSpace: 'nowrap', // Evita que el texto se corte
                                    overflow: 'hidden', // Oculta el desbordamiento
                                    textOverflow: 'ellipsis', // Añade puntos suspensivos si el texto es demasiado largo
                                },
                            },
                            cells: {
                                style: {
                                    padding: '10px', // Ajusta el espaciado interno de las celdas
                                    fontSize: '0.8rem', // Ajusta el tamaño de fuente de las celdas
                                    whiteSpace: 'normal', // Permite el ajuste de línea
                                    wordBreak: 'break-word', // Rompe las palabras largas
                                    fontFamily: 'inherit', // Asegura que la fuente sea la misma que el resto
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
        </div>
    );
}

export default Vehiculos;