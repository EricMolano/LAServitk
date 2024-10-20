import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileE({ handleCardClick }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:2071/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profileE");
  };

  return (
    <div className="dashboard-content">
      <button className="botonCe" onClick={() => handleCardClick("overview")}>
        ←
      </button>
      <div className="card">
        <h1>¡Consulta tus datos!</h1>
        <table>
          <tbody>
            <tr>
              <th>Nombre</th>
              <td>{userData ? userData.name : "Cargando..."}</td>
            </tr>
            <tr>
              <th>Apellido</th>
              <td>{userData ? userData.surname : "Cargando..."}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{userData ? userData.email : "Cargando..."}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td>{userData ? userData.address : "Cargando..."}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>{userData ? userData.phone : "Cargando..."}</td>
            </tr>
          </tbody>
        </table>
        <button className="profile-button" onClick={handleEditProfile}>
          Editar Perfil
        </button>
      </div>
    </div>
  );
}

export default ProfileE;