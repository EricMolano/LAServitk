import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminVehicles } from "../../services/authService"; // Ensure this function is properly implemented

export const API_URL = "http://localhost:2071/api";

function Vehiculos({ handleCardClick }) {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Importing useNavigate

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAdminVehicles();
                setVehicles(data);
            } catch (error) {
                setError("Error al obtener los vehículos.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);


    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard">
            <button className="botonCer" onClick={handleCardClick}>
                ←
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Color</th>
                        <th>Placa</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.idvehiculo}>
                            <td>{vehicle.marca}</td>
                            <td>{vehicle.modelo}</td>
                            <td>{vehicle.año}</td>
                            <td>{vehicle.color}</td>
                            <td>{vehicle.placa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Vehiculos;
