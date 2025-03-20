import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './styles/VerCompras.css'; // Asegúrate de tener un archivo CSS para los estilos

function VerCompras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await axios.get('https://laservitk-production.up.railway.app/api/compras', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCompras(response.data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
        setError('Error al obtener las compras.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://laservitk-production.up.railway.app/api/solicitudes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCompras(compras.filter(compra => compra.id !== id));
    } catch (error) {
      console.error('Error al borrar la solicitud:', error);
      setError('Error al borrar la solicitud.');
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const columns = [
    {
      name: 'Producto',
      selector: row => row.producto,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Fecha de Solicitud',
      selector: row => row.fecha_solicitud,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <button onClick={() => handleDelete(row.id)} className="btn btn-danger">
          Borrar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="compras-content">
      <h2>Mis Compras</h2>
      <div className="datatable-container">
        <DataTable
          columns={columns}
          data={compras}
          pagination
          highlightOnHover
          striped
          noDataComponent="No hay compras disponibles."
          responsive
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
    </div>
  );
}

export default VerCompras;