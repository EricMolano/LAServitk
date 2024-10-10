import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css';

const AddVehicle = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [color, setColor] = useState('');
    const [placa, setPlaca] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se ha encontrado el token de autenticación.');
            setError('No se ha encontrado el token de autenticación.');
            return;
        }

        try {
            await axios.post('http://localhost:2071/api/vehicles', {
                marca,
                modelo,
                año,
                color,
                placa
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Vehículo agregado exitosamente');
            navigate('/ClientDashboard'); // Redirige al dashboard del cliente
        } catch (error) {
            console.error('Error al agregar el vehículo:', error.response?.data || error.message);
            setError('Error al agregar el vehículo. Intenta nuevamente.');
        }
    };

    return (
        <div className="add-vehicle-container">
            <h1>Agregar Vehículo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="marca">Marca:</label>
                    <input
                        type="text"
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                        type="text"
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="año">Año:</label>
                    <input
                        type="number"
                        id="año"
                        value={año}
                        onChange={(e) => setAño(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="placa">Placa:</label>
                    <input
                        type="text"
                        id="placa"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Agregar Vehículo</button>
            </form>
        </div>
    );
};

export default AddVehicle;
