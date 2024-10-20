import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService'; // Adjust import according to your file structure
export const API_URL = "http://localhost:2071/api";

function InformacionUsuarios({ handleCardClick }) {
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

  const handleEditProfile = (userId) => {
    navigate(`/edit-profile-user/${userId}`);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="informacion-usuarios-content">
      <button className="botonC" onClick={() => handleCardClick()}>←</button>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th> {/* Added surname header */}
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th> {/* Added actions header */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname || "No disponible"}</td> {/* Display surname */}
                <td>{user.email}</td>
                <td>{user.address || "No disponible"}</td>
                <td>{user.phone || "No disponible"}</td>
                <td>
                  {user.rol_id === 1 ? "Empleado" : user.rol_id === 2 ? "Cliente" : user.rol_id === 3 ? "Administrador" : "Desconocido"}
                </td>
                <td>
                  <button onClick={() => handleEditProfile(user.id)}>Editar Perfil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay usuarios disponibles.</td> {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InformacionUsuarios;
