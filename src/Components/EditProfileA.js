import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css';


const EditProfileA = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        address: '',
        phone: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setUserData({
                name: response.data.name,
                surname: response.data.surname,
                address: response.data.address,
                phone: response.data.phone,
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
    
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.');
                return;
            }
    
            // Realizar la solicitud para actualizar el perfil
            const response = await axios.put('http://localhost:2071/api/user/update-profile', userData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // CORRECCIÓN: Asegurarnos de que solo estamos usando headers y no .set()
                },
            });
    
            console.log('Perfil actualizado exitosamente:', response.data);
    
            // Limpiar mensajes de error y redirigir al dashboard
            setError(null);
            navigate('/AdminDashboard'); // Cambia la ruta según tus necesidades
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
    
            // Manejar errores de red o problemas con la solicitud
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                setError(error.response.data.message || 'Error al actualizar perfil. Intenta de nuevo.');
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                setError('No se recibió respuesta del servidor. Verifica tu conexión a internet e intenta nuevamente.');
            } else {
                // Un error ocurrió al configurar la solicitud
                setError('Ocurrió un error inesperado. Revisa la consola del navegador para más detalles.');
            }
        }
    };
    

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit" className="submit-button">Actualizar</button>
            </form>
        </div>
    );
};

export default EditProfileA;
