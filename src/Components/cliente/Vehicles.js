import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/vehicles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setVehicles(response.data);
            setLoadingVehicles(false);
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
            setErrorVehicles('Error al obtener los vehículos.');
            setLoadingVehicles(false);
        });
    }, []);

    const handleAddVehicle = () => navigate('/add-vehicle');
    const handleUpdateVehicle = (id) => navigate(`/edit-vehicle/${id}`);

    if (loadingVehicles) {
        return <div>Cargando vehículos...</div>;
    }

    return (
        <div className="vehicles-container">
            <h1>Vehículos</h1>
            <button onClick={handleAddVehicle} className="add-vehicle-button">Agregar Vehículo</button>
            {errorVehicles ? (
                <div>{errorVehicles}</div>
            ) : (
                <table className="vehicles-table">
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Color</th>
                            <th>Placa</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.idvehiculo}>
                                <td>{vehicle.marca}</td>
                                <td>{vehicle.modelo}</td>
                                <td>{vehicle.año}</td>
                                <td>{vehicle.color || 'N/A'}</td>
                                <td>{vehicle.placa}</td>
                                <td>
                                    <button onClick={() => handleUpdateVehicle(vehicle.idvehiculo)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Vehicles;
