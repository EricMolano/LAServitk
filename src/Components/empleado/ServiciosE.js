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

      {/* Button to add a new service */}
      <Link to="/agregar-servicioE" className="btn btn-primary mb-3">Agregar Servicio</Link>

      <table className="servicios-table">
        <thead>
          <tr>
            <th>Nombre Empleado</th>
            <th>Nombre Cliente</th> {/* Nueva columna para el nombre del cliente */}
            <th>Placa Vehículo</th>
            <th>Nombre Servicio</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.nombre_empleado}</td>
              <td>{servicio.nombre_cliente}</td> {/* Mostrar el nombre del cliente */}
              <td>{servicio.placa_vehiculo}</td>
              <td>{servicio.nombre_servicio}</td>
              <td>{servicio.descripcion}</td>
              <td>{servicio.costo}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Servicios;
