// ProfileE.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileA.css'; // Asegúrate de tener un archivo CSS para los estilos
import Sidebar from '../SlideBarPrueba'; // Importar la Sidebar específica para empleados

const ProfileE = () => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
            setLoadingUser(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoadingUser(false);
        });
    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profileE');
    };

    if (loadingUser) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (!userData) {
        return <div className="error-message">No se pudo cargar la información del usuario.</div>;
    }

    return (
        <div className="profile-page flex">
            <Sidebar />
            <div className="profile-container flex-1 p-4"> {/* Asegúrate de que el contenedor principal ocupe el espacio restante */}
                <h1 className="text-2xl font-bold mb-4">Bienvenido a tu perfil</h1>
                <table className="profile-table w-full border-collapse">
                    <tbody>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <td className="border p-2">{userData.name}</td>
                        </tr>
                        <tr>
                            <th className="border p-2">Apellido</th>
                            <td className="border p-2">{userData.surname}</td>
                        </tr>
                        <tr>
                            <th className="border p-2">Correo Electrónico</th>
                            <td className="border p-2">{userData.email}</td>
                        </tr>
                        <tr>
                            <th className="border p-2">Dirección</th>
                            <td className="border p-2">{userData.address}</td>
                        </tr>
                        <tr>
                            <th className="border p-2">Teléfono</th>
                            <td className="border p-2">{userData.phone}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleEditProfile} className="profile-button mt-4">Editar Perfil</button>
            </div>
        </div>
    );
};

export default ProfileE;