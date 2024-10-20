import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService'; // Adjust import according to your file structure

export const API_URL = "http://localhost:2071/api";

function InformacionUsuarios({ handleCardClick }) { // Ensure the component name starts with uppercase
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("Error al obtener la información de usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading-message">Cargando...</div>; // Optional: Add a CSS class for styling
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Optional: Add a CSS class for styling
  }

  // Filter users to only include clients (rol_id === 2)
  const clientUsers = users.filter(user => user.rol_id === 2);

  return (
    <div className="informacion-usuarios-content">
      <button className="botonC" onClick={handleCardClick}>←</button>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {clientUsers.length > 0 ? (
            clientUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname || "No disponible"}</td>
                <td>{user.email}</td>
                <td>{user.address || "No disponible"}</td>
                <td>{user.phone || "No disponible"}</td>
                <td>Cliente</td> {/* Hardcoded since we're only showing clients */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay usuarios disponibles.</td> {/* Adjusted colspan to match number of headers */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InformacionUsuarios; // Make sure to export the component with the correct name
