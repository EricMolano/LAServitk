import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/authService';
import Modal from '../cliente/ModalCliente'; // Import the modal

function EditProfileUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [modalMessage, setModalMessage] = useState(''); // Message for the modal
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        addressType: '', // Añadimos el tipo de dirección
        addressDetail: '', // Detalle de la dirección
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
                    surname: userData.surname || '',
                    addressType: userData.addressType || '', // Set addressType from user data
                    addressDetail: userData.addressDetail || '', // Set addressDetail from user data
                    phone: userData.phone || ''
                });
            } catch (error) {
                setModalMessage('Error al obtener los datos del usuario');
                setModalOpen(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Función para validar que el nombre/apellido contenga solo letras
    const validateOnlyLetters = (value) => /^[a-zA-Z\s]+$/.test(value);

    // Función para validar el formato del número de teléfono
    const validatePhone = (phone) => /^3\d{9}$/.test(phone); // Exactamente 10 dígitos, comienza con 3

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones antes de enviar el formulario
        if (!formData.name) {
            setModalMessage('¡El nombre es obligatorio!');
            setModalOpen(true);
            return;
        }
        if (formData.name.length > 20) {
            setModalMessage('El nombre no puede exceder los 20 caracteres.');
            setModalOpen(true);
            return;
        }
        if (!validateOnlyLetters(formData.name)) {
            setModalMessage('El nombre solo debe contener letras.');
            setModalOpen(true);
            return;
        }
        if (!formData.surname) {
            setModalMessage('¡El apellido es obligatorio!');
            setModalOpen(true);
            return;
        }
        if (formData.surname.length > 20) {
            setModalMessage('El apellido no puede exceder los 20 caracteres.');
            setModalOpen(true);
            return;
        }
        if (!validateOnlyLetters(formData.surname)) {
            setModalMessage('El apellido solo debe contener letras.');
            setModalOpen(true);
            return;
        }
        if (!formData.addressType) {
            setModalMessage('Debes seleccionar un tipo de dirección.');
            setModalOpen(true);
            return;
        }
        if (!formData.addressDetail) {
            setModalMessage('¡La dirección debe ser obligatoria!');
            setModalOpen(true);
            return;
        }
        if (!validatePhone(formData.phone)) {
            setModalMessage('El teléfono debe comenzar con 3 y tener 10 dígitos.');
            setModalOpen(true);
            return;
        }

        // Si todas las validaciones pasan, procedemos a actualizar
        updateUser(id, {
            ...formData,
            address: `${formData.addressType} ${formData.addressDetail}`, // Combinamos tipo y detalle de dirección
        })
            .then(() => {
                navigate('/AdminDashboard'); // Redirigir al dashboard después de la actualización
            })
            .catch(error => {
                setModalMessage('Error al actualizar el perfil');
                setModalOpen(true);
            });
    };

    if (loading) return <div>Cargando...</div>;
    
    return (
        <div className="edit-profile-user-content">
            <h2>Editar Perfil del Usuario</h2>
            {user && (
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength={20} // Limite de caracteres
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Apellido:</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                maxLength={20} // Limite de caracteres
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="addressType">Tipo de Dirección:</label>
                            <select
                                id="addressType"
                                name="addressType"
                                value={formData.addressType}
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
                            <label htmlFor="addressDetail">Detalle de Dirección:</label>
                            <input
                                type="text"
                                id="addressDetail"
                                name="addressDetail"
                                value={formData.addressDetail}
                                onChange={handleChange}
                                placeholder="Ej. 123, Ciudad"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
        </div>
    );
}

export default EditProfileUser;