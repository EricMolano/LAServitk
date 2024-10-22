import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../styles/Vehicles.css'; // Reutilizar los estilos de Vehicles

const Services = () => {
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorServices, setErrorServices] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            console.error('Error fetching services:', error);
            setErrorServices('Error al obtener los servicios.');
            setLoadingServices(false);
        });
    }, []);

    if (loadingServices) {
        return <div className="loading-message">Cargando servicios...</div>;
    }

    if (errorServices) {
        return <div className="error-message">{errorServices}</div>;
    }

    const filteredServices = services.filter(service =>
        service.nombre_empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.placa_vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.nombre_servicio.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { name: 'Empleado', selector: row => row.nombre_empleado, sortable: true, wrap: true, width: '150px' },
        { name: 'Cliente', selector: row => row.nombre_cliente, sortable: true, wrap: true, width: '150px' },
        { name: 'Placa', selector: row => row.placa_vehiculo, sortable: true, wrap: true, width: '150px' },
        { name: 'Servicio', selector: row => row.nombre_servicio, sortable: true, wrap: true, width: '150px' },
        { name: 'Descripción', selector: row => row.descripcion, wrap: true, width: '200px' },
        { name: 'Fecha', selector: row => new Date(row.fecha_servicio).toLocaleDateString(), sortable: true, wrap: true, width: '150px' },
        { name: 'Costo', selector: row => row.costo, sortable: true, wrap: true, width: '100px' },
    ];

    return (
        <div className="informacion-usuarios-content">
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
                    title="Información de Servicios"
                    columns={columns}
                    data={filteredServices}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent="No hay servicios disponibles."
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

export default Services;