import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Sidebar from './Slidebara';
import '../styles/Inventory.css'; // Asegúrate de tener un archivo CSS para los estilos

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
        setError("Error al obtener el inventario.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventario();
  }, []);

  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredInventario = inventario.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cantidad_en_stock.toString().includes(searchTerm.toLowerCase()) ||
    item.precio_compra.toString().includes(searchTerm.toLowerCase()) ||
    item.msrp.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      sortable: true,
      wrap: true,
      width: '250px',
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad_en_stock,
      sortable: true,
      wrap: true,
      width: '100px',
    },
    {
      name: 'Precio de Compra',
      selector: row => row.precio_compra,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'MSRP',
      selector: row => row.msrp,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Acciones',
      cell: row => (
        <Link to={`/edit-inventory/${row.id}`} className="btn btn-warning">Actualizar</Link>
      ),
      width: '150px',
    },
  ];

  return (
    <div className="inventario-content">
      <Sidebar />
      <Link to="/add-inventory" className="Botonprodcutos" style={{ marginBottom: "10px", background: "#0000000" }}>
        Agregar Nuevo Producto
      </Link>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <DataTable
        title="Información de Inventario"
        columns={columns}
        data={filteredInventario}
        pagination
        highlightOnHover
        striped
        noDataComponent="No hay productos disponibles."
        responsive
        style={{ marginTop: '10px', fontSize: '0.8rem' }}
        customStyles={{
          table: {
            style: {
              fontSize: '0.8rem',
              maxWidth: '100%',
            },
          },
          head: {
            style: {
              backgroundColor: '#f2f2f2',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              padding: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
          cells: {
            style: {
              padding: '10px',
              fontSize: '0.8rem',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              fontFamily: 'inherit',
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

export default Inventario;