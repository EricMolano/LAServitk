import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorServices, setErrorServices] = useState(null);

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
        return <div>Cargando servicios...</div>;
    }

    return (
        <div className="services-container">
            <h1>Servicios</h1>
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
                            <th>Fecha</th>
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
    );
};

export default Services;