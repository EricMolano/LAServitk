import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService';
import Slidebara from '../admin/Slidebara';
import DataTable from 'react-data-table-component';
import '../styles/Usuarios.css';

export const API_URL = "http://localhost:2071/api";

function InformacionUsuarios({ handleCardClick }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control de si el sidebar está abierto o cerrado
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

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alterna el estado de apertura/cierre del sidebar
  };

  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
      wrap: true,
      width: '170px',
    },
    {
      name: 'Apellido',
      selector: row => row.surname || "No disponible",
      sortable: true,
      wrap: true,
      width: '170px',
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      wrap: true,
      width: '360px',
      cell: row => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {row.email}
        </div>
      ),
    },
    {
      name: 'Dirección',
      selector: row => row.address || "No disponible",
      wrap: true,
      width: '280px',
    },
    {
      name: 'Teléfono',
      selector: row => row.phone || "No disponible",
      wrap: true,
      width: '170px',
    },
    {
      name: 'Rol',
      cell: row => (
        <span>
          {row.rol_id === 1 ? "Empleado" : row.rol_id === 2 ? "Cliente" : row.rol_id === 3 ? "Administrador" : "Desconocido"}
        </span>
      ),
      width: '170px',
    },
    {
      name: 'Acción',
      cell: row => (
        <button onClick={() => handleEditProfile(row.id)}>
          Editar Perfil
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    },
  ];

  return (
    <div className="info-usuarios-content">
      <div className="sidebar-contenedor">
        <Slidebara onToggle={handleSidebarToggle} />
      </div>
      <div className={`contenido-contenedor ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-busqueda"
        />

        <div className="tabla-contenedor">
          <DataTable
            title="Información de Usuarios"
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            striped
            noDataComponent="No hay usuarios disponibles."
            responsive
            customStyles={{
              table: {
                style: {
                  maxWidth: '100%',
                  width: '100%',
                },
              },
              head: {
                style: {
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  fontSize: '1rem',
                },
              },
              cells: {
                style: {
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  fontSize: '0.9rem',
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
