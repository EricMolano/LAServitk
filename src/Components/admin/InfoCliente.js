import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../services/authService';

function EditProfileUsers() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(id);
                setUser(userData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleEditProfile = () => {
        navigate(`/edit-profile-user/${id}`); // Redirige a la página de edición con el ID del usuario
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-profile-users-content">
            <h2>Información del Usuario</h2>
            {user && (
                <div className="user-info">
                    <h3>Datos del Usuario</h3>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Dirección:</strong> {user.address}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                </div>
            )}
            <button className="profile-button" onClick={handleEditProfile}>Editar Perfil</button>
        </div>
    );
}

export default EditProfileUsers;
