import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Inventario({ handleCardClick }) {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await axios.get("http://localhost:2071/api/inventory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInventario(response.data);
      } catch (error) {
        console.error("Error al obtener el inventario:", error);
      }
    };

    fetchInventario();
  }, []);

  return (
    <div className="inventario-content">
      <button className="botonC" onClick={() => handleCardClick()}>←</button>
     
      <table className="inventario-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio de Compra</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad_en_stock}</td>
              <td>{item.precio_compra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;
