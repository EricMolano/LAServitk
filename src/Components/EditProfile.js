import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const API_URL = 'http://localhost:2071/api'; // Define la URL base de la API

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        address: '',
        phone: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/user/data`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData({
                    name: response.data.name,
                    surname: response.data.surname,
                    address: response.data.address,
                    phone: response.data.phone,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error al obtener los datos del usuario');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(`${API_URL}/user/update-profile`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Perfil actualizado exitosamente:', response.data);
            navigate('/ClientDashboard'); // Redirige al dashboard o a donde desees
        } catch (error) {
            setError('Error al actualizar perfil');
            console.error('Error al actualizar perfil:', error.response?.data || error.message);
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="surname"
                        value={userData.surname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Dirección:
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Teléfono:
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Actualizar Perfil</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default EditProfile;
