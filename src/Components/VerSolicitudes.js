import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './styles/Usuarios.css'; // Asegúrate de tener un archivo CSS para los estilos
import Sidebar from './admin/Slidebara';

function VerSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:2071/api/solicitudes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
                setError('Error al obtener las solicitudes.');
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const columns = [
        {
            name: 'Usuario',
            selector: row => row.usuario,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Producto',
            selector: row => row.producto,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Fecha de Solicitud',
            selector: row => row.fecha_solicitud,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true,
            wrap: true,
        },
    ];

    return (
        <div className="informacion-usuarios-content">
            <Sidebar />
            <h2>Solicitudes de Productos</h2>
            <div className="datatable-container">
                <DataTable
                    columns={columns}
                    data={solicitudes}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent="No hay solicitudes disponibles."
                    responsive
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
        </div>
    );
}

export default VerSolicitudes;