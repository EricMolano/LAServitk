import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ActualizarServicio() {
    const { id } = useParams(); // Obtener el ID del servicio de la URL
    const [nombre_empleado, setNombreEmpleado] = useState('');
    const [nombre_cliente, setNombreCliente] = useState('');
    const [placa_vehiculo, setPlacaVehiculo] = useState('');
    const [nombre_servicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar los datos del servicio existente
    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const response = await axios.get(`https://laservitk-production.up.railway.app/api/servicios/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                // Precargar los campos con los datos existentes del servicio
                const servicio = response.data;
                setNombreEmpleado(servicio.nombre_empleado);
                setNombreCliente(servicio.nombre_cliente);
                setPlacaVehiculo(servicio.placa_vehiculo);
                setNombreServicio(servicio.nombre_servicio);
                setDescripcion(servicio.descripcion);
                setCosto(servicio.costo);
            } catch (error) {
                console.error('Error al obtener los datos del servicio:', error);
                setError('Error al cargar los datos del servicio.');
            }
        };

        fetchServicio();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Hacer la solicitud para actualizar el servicio
            await axios.put(`https://laservitk-production.up.railway.app/api/servicios/${id}`, {
                nombre_empleado,
                nombre_cliente,
                placa_vehiculo,
                nombre_servicio,
                descripcion,
                costo
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Redirigir al usuario después de actualizar el servicio
            navigate('/AdminDashboard');
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            setError(error.response?.data?.message || 'Error al actualizar el servicio');
        }
    };

    return (
        <div className="formulario-servicio">
            <h2>Actualizar Servicio</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre_empleado">Nombre del Empleado:</label>
                    <input
                        type="text"
                        id="nombre_empleado"
                        value={nombre_empleado}
                        onChange={(e) => setNombreEmpleado(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre_cliente">Nombre del Cliente:</label>
                    <input
                        type="text"
                        id="nombre_cliente"
                        value={nombre_cliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="placa_vehiculo">Placa del Vehículo:</label>
                    <input
                        type="text"
                        id="placa_vehiculo"
                        value={placa_vehiculo}
                        onChange={(e) => setPlacaVehiculo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre_servicio">Nombre del Servicio:</label>
                    <input
                        type="text"
                        id="nombre_servicio"
                        value={nombre_servicio}
                        onChange={(e) => setNombreServicio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="costo">Costo:</label>
                    <input
                        type="number"
                        id="costo"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Servicio</button>
            </form>
        </div>
    );
}

export default ActualizarServicio;
