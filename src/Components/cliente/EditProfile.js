import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const API_URL = 'http://localhost:2071/api'; // Define la URL base de la API

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        addressType: '', // Para el tipo de dirección
        addressDetail: '', // Para el resto de la dirección
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
                    addressType: response.data.addressType || '', // Asume que el tipo de dirección se almacena en el usuario
                    addressDetail: response.data.addressDetail || '', // Asume que el resto de la dirección se almacena en el usuario
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
        const phonePattern = /^3\d{9}$/; // Comienza con 3 y tiene 9 dígitos
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Validaciones
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
                address: `${userData.addressType} ${userData.addressDetail}`, // Combina ambos campos para la dirección
            }, {
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
                        maxLength={20} // Limite de caracteres
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="surname"
                        value={userData.surname}
                        onChange={handleChange}
                        maxLength={20} // Limite de caracteres
                    />
                </label>
                <label>
                    Tipo de Dirección:
                    <select
                        name="addressType"
                        value={userData.addressType}
                        onChange={handleChange}
                        required // Obligatorio
                    >
                        <option value="">Selecciona un tipo de dirección</option>
                        <option value="Calle">Calle</option>
                        <option value="Avenida">Avenida</option>
                        <option value="Carrera">Carrera</option>
                        <option value="Diagonal">Diagonal</option>
                        <option value="Transversal">Transversal</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </label>
                <label>
                    Detalle de Dirección:
                    <input
                        type="text"
                        name="addressDetail"
                        value={userData.addressDetail}
                        onChange={handleChange}
                        placeholder="Ej. 123, Ciudad"
                        required // Obligatorio
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
