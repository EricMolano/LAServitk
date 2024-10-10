import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../services/authService';

function EditProfileUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(id);
                setUser(userData);
                setFormData({
                    name: userData.name || '',
                    email: userData.email || '',
                    address: userData.address || '',
                    phone: userData.phone || ''
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUser(id, formData)
            .then(() => {
                navigate('/AdminDashboard'); // Redirige a dashboardadmin después de la actualización
            })
            .catch(error => {
                setError(error.message);
            });
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="edit-profile-user-content">
            <h2>Editar Perfil del Usuario</h2>
            {user && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}

export default EditProfileUser;
