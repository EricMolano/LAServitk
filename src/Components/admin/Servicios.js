import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Servicios({ handleCardClick }) {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:2071/api/servicios", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <div className="servicios-content">
      <button className="botonC" onClick={() => handleCardClick()}>←</button>
    
      <table className="servicios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
              <td>{servicio.precio}</td>
              <td>
                <Link to={`/edit-servicio/${servicio.id}`} className="btn btn-warning">Actualizar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Servicios;
