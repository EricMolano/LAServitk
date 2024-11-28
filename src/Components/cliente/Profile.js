import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import '../styles/Profile.css';
import EditProfile from './EditProfile'; // Adjust the import based on your folder structure

const Profile = ({ onClose }) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false); // State for the edit modal

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
        setEditModalOpen(true); // Open the edit modal
    };

    const closeEditModal = () => {
        setEditModalOpen(false); // Close the edit modal
    };

    if (loadingUser) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="client-modal-overlay">
            <div className="client-modal-content">
                <button1 onClick={onClose} className="client-modal-close">
                    <FaTimes />
                </button1>
                <div className="client-profile-container">
                    <h1>Bienvenido a tu perfil</h1>
                    <table className="client-profile-table">
                        <tbody>
                            <tr><th>Nombre</th><td>{userData.name}</td></tr>
                            <tr><th>Apellido</th><td>{userData.surname}</td></tr>
                            <tr><th>Correo Electrónico</th><td>{userData.email}</td></tr>
                            <tr><th>Dirección</th><td>{userData.address}</td></tr>
                            <tr><th>Teléfono</th><td>{userData.phone}</td></tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Profile; 