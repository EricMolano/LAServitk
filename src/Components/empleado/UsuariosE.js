import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService';
import Sidebar from '../empleado/SlidebarE';
import DataTable from 'react-data-table-component';
import '../styles/Usuarios.css';

export const API_URL = "http://localhost:2071/api";

function InformacionUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const clientUsers = users.filter(user => user.rol_id === 2);

  const filteredUsers = clientUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
      wrap: true, // Ajusta el contenido para que se vea completo
      width: '200px', // Ajusta el ancho de la columna
    },
    {
      name: 'Apellido',
      selector: row => row.surname || "No disponible",
      sortable: true,
      wrap: true, // Ajusta el contenido para que se vea completo
      width: '200px', // Ajusta el ancho de la columna
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      wrap: true, // Ajusta el contenido para que se vea completo
      width: '400px', // Ajusta el ancho de la columna
    },
    {
      name: 'Dirección',
      selector: row => row.address || "No disponible",
      wrap: true, // Ajusta el contenido para que se vea completo
      width: '200px', // Ajusta el ancho de la columna
    },
    {
      name: 'Teléfono',
      selector: row => row.phone || "No disponible",
      wrap: true, // Ajusta el contenido para que se vea completo
      width: '200px', // Ajusta el ancho de la columna
    },
    {
      name: 'Rol',
      cell: () => <span style={{ fontFamily: 'inherit' }}>Cliente</span>, // Asegura que la fuente sea la misma que el resto
      width: '100px', // Ajusta el ancho de la columna
    },
  ];

  return (
    <div className="informacion-usuarios-content">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="datatable-container">
          <DataTable
            title="Información de Usuarios"
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            striped
            noDataComponent="No hay usuarios disponibles."
            responsive
            style={{ marginTop: '10px', fontSize: '0.8rem' }} // Ajusta el tamaño de fuente
            customStyles={{
              table: {
                style: {
                  fontSize: '0.8rem', // Ajusta el tamaño de la fuente para todo el DataTable
                  maxWidth: '100%', // Asegura que el DataTable no exceda el ancho del contenedor
                },
              },
              head: {
                style: {
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  fontSize: '0.9rem', // Ajusta el tamaño de la fuente del encabezado
                  padding: '10px', // Ajusta el espaciado del encabezado
                  whiteSpace: 'nowrap', // Evita que el texto se corte
                  overflow: 'hidden', // Oculta el desbordamiento
                  textOverflow: 'ellipsis', // Añade puntos suspensivos si el texto es demasiado largo
                },
              },
              cells: {
                style: {
                  padding: '10px', // Ajusta el espaciado interno de las celdas
                  fontSize: '0.8rem', // Ajusta el tamaño de fuente de las celdas
                  whiteSpace: 'normal', // Permite el ajuste de línea
                  wordBreak: 'break-word', // Rompe las palabras largas
                  fontFamily: 'inherit', // Asegura que la fuente sea la misma que el resto
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
    </div>
  );
}

export default InformacionUsuarios;