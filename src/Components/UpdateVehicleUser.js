import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicles, updateVehicleUser } from '../services/authService'; // Asume que tienes un servicio que maneja estas solicitudes
import '../styles/Edit.css'
function UpdateVehicleUser() {
    const { idvehiculo } = useParams(); // Obtener el id del vehículo de la URL
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        marca: '',
        modelo: '',
        año: '',
        color: '',
        placa: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await getVehicles(idvehiculo); // Obtener los datos del vehículo
                setVehicle(data);
            } catch (error) {
                setError('Error al cargar los datos del vehículo.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [idvehiculo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVehicleUser(idvehiculo, vehicle); // Actualiza los datos del vehículo
            navigate('/AdminDashboard'); // Redirige a la lista de vehículos después de actualizar
        } catch (error) {
            setError('Error al actualizar el vehículo.');
        }
    };

    if (loading) {
        return <div>Cargando datos del vehículo...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Actualizar Vehículo</h2>
            <div>
                <label>Marca:</label>
                <input type="text" name="marca" value={vehicle.marca} onChange={handleChange} required />
            </div>
            <div>
                <label>Modelo:</label>
                <input type="text" name="modelo" value={vehicle.modelo} onChange={handleChange} required />
            </div>
            <div>
                <label>Año:</label>
                <input type="number" name="año" value={vehicle.año} onChange={handleChange} required />
            </div>
            <div>
                <label>Color:</label>
                <input type="text" name="color" value={vehicle.color} onChange={handleChange} />
            </div>
            <div>
                <label>Placa:</label>
                <input type="text" name="placa" value={vehicle.placa} onChange={handleChange} required />
            </div>
            <button type="submit">Actualizar</button>
        </form>
    );
}

export default UpdateVehicleUser;
