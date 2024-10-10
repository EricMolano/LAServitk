import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Edit.css';

const EditVehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({ marca: '', modelo: '', año: '', color: '', placa: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:2071/api/vehicles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Vehicle fetched successfully:', response.data);
            setVehicle(response.data);
        })
        .catch(error => {
            console.error('Error fetching vehicle:', error);
            setError('');
        });
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:2071/api/vehicles/${id}`, vehicle, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Vehicle updated successfully:', response.data);
            navigate('/ClientDashboard'); // Redirige al dashboard después de actualizar el vehículo
        })
        .catch(error => {
            console.error('Error updating vehicle:', error);
            setError('Error al actualizar el vehículo. Intenta nuevamente.');
        });
    };

    return (
        <div className="edit-vehicle-container">
            <h1>Editar Vehículo</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="marca">Marca:</label>
                    <input
                        type="text"
                        id="marca"
                        name="marca"
                        placeholder="Marca"
                        value={vehicle.marca}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        placeholder="Modelo"
                        value={vehicle.modelo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="año">Año:</label>
                    <input
                        type="number"
                        id="año"
                        name="año"
                        placeholder="Año"
                        value={vehicle.año}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Color"
                        value={vehicle.color}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="placa">Placa:</label>
                    <input
                        type="text"
                        id="placa"
                        name="placa"
                        placeholder="Placa"
                        value={vehicle.placa}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Vehículo</button>
            </form>
        </div>
    );
};


export default EditVehicle;
