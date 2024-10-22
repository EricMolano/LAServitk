import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css';

const API_URL = 'http://localhost:2071/api'; // Base URL for the API

const EditProfileA = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        addressType: '', // For address type
        addressDetail: '', // For address details
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
                    addressType: response.data.addressType || '', // Assuming address type
                    addressDetail: response.data.addressDetail || '', // Assuming address detail
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

    const validatePhone = (phone) => {
        const phonePattern = /^3\d{9}$/; // Phone must start with 3 and have 9 digits
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Validations
        if (userData.name.length > 20) {
            setError('El nombre no puede exceder los 20 caracteres.');
            return;
        }
        if (userData.surname.length > 20) {
            setError('El apellido no puede exceder los 20 caracteres.');
            return;
        }
        if (!userData.addressType) {
            setError('Debes seleccionar un tipo de dirección.');
            return;
        }
        if (!userData.addressDetail) {
            setError('Debes ingresar el detalle de la dirección.');
            return;
        }
        if (!validatePhone(userData.phone)) {
            setError('El teléfono debe comenzar con 3 y tener 9 dígitos.');
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/user/update-profile`, {
                ...userData,
                address: `${userData.addressType} ${userData.addressDetail}`, // Combine address type and details
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Perfil actualizado exitosamente:', response.data);
            navigate('/AdminDashboard'); // Redirect to admin dashboard or desired page
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError('Error al actualizar perfil');
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellido</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={userData.surname}
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="addressType">Tipo de Dirección</label>
                        <select
                            id="addressType"
                            name="addressType"
                            value={userData.addressType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un tipo de dirección</option>
                            <option value="Calle">Calle</option>
                            <option value="Avenida">Avenida</option>
                            <option value="Carrera">Carrera</option>
                            <option value="Diagonal">Diagonal</option>
                            <option value="Transversal">Transversal</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addressDetail">Detalle de Dirección</label>
                        <input
                            type="text"
                            id="addressDetail"
                            name="addressDetail"
                            value={userData.addressDetail}
                            onChange={handleChange}
                            placeholder="Ej. 123, Ciudad"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="submit-button">Actualizar</button>
            </form>
        </div>
    );
};

export default EditProfileA;