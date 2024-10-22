import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Slidebara';
import DataTable from 'react-data-table-component';
import '../styles/Servicios.css'; // Asegúrate de tener un archivo CSS para los estilos

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
        setError("Error al obtener los servicios.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredServicios = servicios.filter(servicio =>
    servicio.nombre_empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.placa_vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.nombre_servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.costo.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Encargado',
      selector: row => row.nombre_empleado,
      sortable: true,
      wrap: true,
      width: '200px',
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_empleado}</div>,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre_cliente,
      sortable: true,
      wrap: true,
      width: '200px',
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_cliente}</div>,
    },
    {
      name: 'Placa',
      selector: row => row.placa_vehiculo,
      sortable: true,
      wrap: true,
      width: '150px',
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.placa_vehiculo}</div>,
    },
    {
      name: 'Servicio',
      selector: row => row.nombre_servicio,
      sortable: true,
      wrap: true,
      width: '300px',
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_servicio}</div>,
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      wrap: true,
      width: '500px',
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.descripcion}</div>,
    },
    {
      name: 'Precio',
      selector: row => row.costo,
      sortable: true,
      wrap: true,
      width: '200px',
      cell: row => <div style={{ padding: '10px', textAlign: 'right' }}>{row.costo}</div>,
    },
  ];

  return (
    <div className="servicios-content">
      <Sidebar />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ marginRight: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flexGrow: 1 }}
        />
        <Link to="/agregar-servicio" className="agregar-ser">Agregar</Link>
      </div>
      <DataTable
        title="Información de Servicios"
        columns={columns}
        data={filteredServicios}
        pagination
        highlightOnHover
        striped
        noDataComponent="No hay servicios disponibles."
        responsive
        style={{ marginTop: '10px', fontSize: '0.9rem' }}
        customStyles={{
          table: {
            style: {
              maxWidth: '100%',
              marginTop: '10px',
              fontSize: '0.9rem',
              borderSpacing: '0 10px', // Espaciado vertical entre filas
            },
          },
          head: {
            style: {
              backgroundColor: '#f2f2f2',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              padding: '10px',
              textAlign: 'left',
            },
          },
          cells: {
            style: {
              padding: '10px',
              fontSize: '0.9rem',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              borderSpacing: '10px', // Espaciado horizontal entre columnas
            },
          },
        }}
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
          noRowsPerPage: false,
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos',
        }}
      />
    </div>
  );
}

export default Servicios;
