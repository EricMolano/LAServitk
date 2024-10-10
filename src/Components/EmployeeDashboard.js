import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {icono} from "../Components/Assets/flecha.png"

import { getAdminVehicles, getUsers } from "../services/authService"; // Asegúrate de importar tu función correctamente

//========= CSS ===================
import "../styles/dashboard.css";
import "../styles/InformacionEmpleados.css";
import "../styles/Perfil.css";

export const API_URL = "http://localhost:2071/api";

// ===============================================================
// Componente principal: EmployeeDashboard
// ===============================================================
function EmployeeDashboard() {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate(); // Inicializa useNavigate

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

  const handleLogout = () => {
    // Elimina el token de autenticación
    localStorage.removeItem("token");

    // Redirige a la página de inicio
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profileE"); // Redirige al formulario de edición de perfil
  };
  const handleCardClick = (view) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case "inventario":
        return <Inventario handleCardClick={handleCardClick} />;
      case "InformacionUsuarios":
        return <InformacionUsuarios handleCardClick={handleCardClick} />;
      case "vehiculos": // Nueva opción para los vehículos
        return <Vehiculos handleCardClick={handleCardClick} />;
      case "Servicios": // Nueva opción para los vehículos
        return <Servicios handleCardClick={handleCardClick} />;
      case "perfil": // Nueva opción para los vehículos
        return <Editarperfil handleCardClick={handleCardClick} />;

      default:
        return (
          <main className="site-wrapper">
            <div className="pt-table desktop-768">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                    <div className="page-title home text-center">
                      <p className="mt20">¡Elige tu próximo movimiento!</p>
                    </div>

                    <div className="hexagon-menu clear">
                      {[
                        {
                          icon: "fa-universal-access",
                          title: "Perfil",
                          view: "perfil",
                        },
                        {
                          icon: "fa-bullseye",
                          title: "Inventario",
                          view: "inventario",
                        },
                        {
                          icon: "fa-braille",
                          title: "Informacion usuarios",
                          view: "InformacionUsuarios",
                        },
                        {
                          icon: "fa-id-badge",
                          title: "vehiculos",
                          view: "vehiculos",
                        },
                        {
                          icon: "fa-life-ring",
                          title: "Servicios",
                          view: "Servicios",
                        },
                      ].map((item, index) => (
                        <div
                          className="hexagon-item"
                          key={index}
                          onClick={() => handleCardClick(item.view)} // Llama a la función correspondiente
                        >
                          <div className="hex-item">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <div className="hex-item">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <a className="hex-content">
                            <span className="hex-content-inner">
                              <span className="icon">
                                <i className={`fa ${item.icon}`}></i>
                              </span>
                              <span className="title">{item.title}</span>
                            </span>
                            <svg
                              viewBox="0 0 173.20508075688772 200"
                              height="200"
                              width="174"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                                fill="#1e2530"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveView={setActiveView} />
      <div className="main-content">
        <Navbar
          handleLogout={handleLogout}
          activeView={activeView} // Pasa el estado activeView aquí
        />
        {renderContent()}
      </div>
    </div>
  );
}

// =======================
// Componente Sidebar
// =======================

function Sidebar({ setActiveView }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  /*
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>
      <h2>{!isCollapsed && "Hola!"}</h2>
      {!isCollapsed && (
        <ul>
          <li onClick={() => setActiveView("overview")}>Inicio</li>
          <li onClick={() => setActiveView("inventario")}>Inventario</li>
          <li onClick={() => setActiveView("InformacionUsuarios")}>
            Información Usuarios
          </li>
          <li onClick={() => setActiveView("vehiculos")}>Vehículos</li>{" "}
        
          <li onClick={() => setActiveView("Servicios")}>Servicios</li>{" "}
      
        </ul>
      )}
    </div>
  );*/
}
// =======================
// Componente Navbar
// =======================
function Navbar({ handleLogout, welcomeMessage, activeView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getTitle = () => {
    switch (activeView) {
      case "inventario":
        return "Inventario";
      case "InformacionUsuarios":
        return "Información de Usuarios";
      case "vehiculos":
        return "Vehículos";
      case "Servicios":
        return "Servicios";
      case "perfil":
        return "Mi Perfil";
      default:
        console.log(activeView);
        return "Bienvenido";
    }
  };

  return (
    <div className="navbar">
      <h1>{getTitle()}</h1>

      <div className="user-menu">
        <button className="user-btn" onClick={toggleMenu}>
          ▼
        </button>
        {isMenuOpen && (
          <div className="user-dropdown">
            <ul>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ===========================================================================
// Componente Editar perfil
//=================================================================
function Editarperfil({handleCardClick}) {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate(); // Inicializa useNavigate

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
    navigate("/edit-profileE"); // Redirige al formulario de edición de perfil
  };
  const handleUsser = () => {
    console.log(activeView);
    setActiveView("overview");
    navigate("/EmployeeDashboard");
  };

  return (
    <div className="dashboard-content">
      <div className="page-wrapper bg-red p-t-180 p-b-100 font-robo">
        <div className="wrapper wrapper--w960">
        <button className="botonCe" onClick={() => handleCardClick()}>
      ←
        </button>
          <div className="card card-2">
            <div className="input-group">
              <div className="welcome-table-container">
                <h1>¡Consulta tus datos!</h1>
                <table className="welcome-table">
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
                      <th>Correo Electrónico</th>
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
                <div className="button-container">
                  <button
                    className="profile-button"
                    onClick={handleEditProfile}
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// Componente InformacionUsuarios
// ===========================================================
function InformacionUsuarios({handleCardClick}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Usa la función getUsers
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("Error al obtener la información de usuarios.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="informacion-usuarios-content">
      <div className="usuarios-table-container">

        <div className="tableu">
        <button className="botonC" onClick={() => handleCardClick()}>
      ←
        </button>
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address || "No disponible"}</td>
                    <td>{user.phone || "No disponible"}</td>
                    <td>
                      {user.rol_id === 1
                        ? "Empleado"
                        : user.rol_id === 2
                        ? "Cliente"
                        : user.rol_id === 3
                        ? "Administrador"
                        : "Desconocido"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay usuarios disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// =======================
// Componente Inventario
// =======================
function Inventario({handleCardClick}) {
  const [inventario, setInventario] = useState([]);

  // Obtener datos de inventario desde el backend
  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2071/api/inventory",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInventario(response.data);
      } catch (error) {
        console.error("Error al obtener el inventario:", error);
      }
    };

    fetchInventario();
  }, []);

  
  return (
    <div className="inventario-content">
      <div className="tableu">
      <button className="botonC" onClick={() => handleCardClick()}>
      ←
        </button>
        <Link
          to="/add-inventory"
          className="Botonprodcutos"
          style={{ marginBottom: "10px", background: "#0000000" }}
        >
          Agregar Nuevo Producto
        </Link>
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio de Compra</th>
              <th>MSRP</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.cantidad_en_stock}</td>
                <td>{item.precio_compra}</td>
                <td>{item.msrp}</td>
                <td>
                  <Link
                    to={`/edit-inventory/${item.id}`}
                    className="btn btn-warning"
                  >
                    Actualizar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// =======================
// Componente Vehiculos
// =======================
function Vehiculos({handleCardClick}) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para navegación

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAdminVehicles();
        setVehicles(data);
      } catch (error) {
        setError("Error al obtener los vehículos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <button className="botonCer" onClick={() => handleCardClick()}>
      ←
        </button>
      <table>

        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Color</th>
            <th>Placa</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.idvehiculo}>
              <td>{vehicle.marca}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.año}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.placa}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// =======================
// Componente Servicios
// =======================

function Servicios({handleCardClick}) {
  const [servicios, setServicios] = useState([]);

  // Obtener datos de servicios desde el backend
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2071/api/servicios",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <div className="servicios-content">
            <button className="botonCer" onClick={() => handleCardClick()}>
      ←
        </button>
      <Link
        to="/agregar-servicio"
        className="nuevo-servicio"
        style={{ marginBottom: "10px" }}
      >
        Agregar Nuevo Servicio
      </Link>
      <table className="servicios-table">
        <thead>
          <tr>
            <th>Nombre Empleado</th>
            <th>Nombre Cliente</th>
            <th>Placa Vehículo</th>
            <th>Nombre Servicio</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.idregistro}>
              <td>{servicio.nombre_empleado}</td>
              <td>{servicio.nombre_cliente}</td>
              <td>{servicio.placa_vehiculo}</td>
              <td>{servicio.nombre_servicio}</td>
              <td>{servicio.descripcion}</td>
              <td>{new Date(servicio.fecha_servicio).toLocaleDateString()}</td>
              <td>{servicio.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
