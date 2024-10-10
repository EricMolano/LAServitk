import axios from 'axios';

const API_URL = 'http://localhost:2071/api';

export const register = (userData) => {
    console.log("Ingreso a el metodo de registro", userData);
    
    return axios.post(`${API_URL}/register`, userData)
        .then(response => response.data)
        .catch(error => {
            
            console.log('Error al registrar usuario:', error);
            const errorMsg = error.response?.data?.message || error;
            throw new Error(errorMsg);
            
        });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
            } else {
                throw new Error('Token no recibido en la respuesta');
            }
            return response.data;
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
        });
};

export const updateProfile = (userData) => {
    return axios.put(`${API_URL}/update-profile`, userData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al actualizar perfil:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar perfil');
    });
};

export const updateProfileE = (userData) => {
    return axios.put(`${API_URL}/update-profileE`, userData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al actualizar perfil E:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar perfil E');
    });
};

export const updateProfileA = (userData) => {
    return axios.put(`${API_URL}/update-profileA`, userData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al actualizar perfil A:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar perfil A');
    });
};



// Función para agregar un nuevo vehículo
export const addVehicle = (vehicleData) => {
    return axios.post(`${API_URL}/vehicles`, vehicleData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al agregar vehículo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al agregar el vehículo');
    });
};

// Función para actualizar un vehículo existente
export const updateVehicle = (id, vehicleData) => {
    return axios.put(`${API_URL}/vehicles/${id}`, vehicleData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al actualizar vehículo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el vehículo');
    });
};

// Funciones para inventario
export const getInventoryById = (id) => {
    return axios.get(`${API_URL}/inventory/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener inventario por ID:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener el inventario');
    });
};

export const addInventory = (inventoryData) => {
    return axios.post(`${API_URL}/inventory`, inventoryData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al agregar inventario:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al agregar el inventario');
    });
};

export const updateInventory = (id, inventoryData) => {
    return axios.put(`${API_URL}/inventory/${id}`, inventoryData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al actualizar inventario:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el inventario');
    });
};

export const getUsers = () => {
    return axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener usuarios:', error.response?.data || error.message);
        throw new Error('Error al obtener la información de usuarios.');
    });
};

// Obtener un usuario específico por ID
export const getUserById = (id) => {
    return axios.get(`${API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener el usuario:', error.response?.data || error.message);
        throw new Error('Error al obtener la información del usuario.');
    });
};

// Obtener todos los vehículos
export const getAdminVehicles = () => {
    return axios.get(`${API_URL}/admin-vehicles`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener todos los vehículos:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener todos los vehículos');
    });
};

// Función para obtener todos los vehículos del usuario autenticado
export const getVehicles = () => {
    return axios.get(`${API_URL}/vehicles`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener los vehículos:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener los vehículos');
    });
};


export const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/edit-profile-user/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al actualizar');
    });
  };

  export const updateVehicleUser = (idvehiculo, vehicleData) => {
    return axios.put(`${API_URL}/update-vehicle-user/${idvehiculo}`, vehicleData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Token de autenticación
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar el vehículo:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al actualizar el vehículo');
    });
};

// Función para obtener los servicios
export const getServices = () => {
    return axios.get(`${API_URL}/api/servicios`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Token de autenticación
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener los servicios:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al obtener los servicios');
    });
  };
  
export const insertService = (serviceData) => {
    return axios.post(`${API_URL}/api/servicios`, serviceData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Token de autenticación
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al registrar el servicio:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al registrar el servicio');
    });
  };
  
export const updateService = (id, serviceData) => {
    return axios.put(`${API_URL}/servicios/${id}`, serviceData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al actualizar el servicio:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al actualizar el servicio');
    });
  };
  

  export const setLoadingServices = () => {
    return axios.get(`${API_URL}/servicios`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error al obtener los vehículos:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al obtener los vehículos');
    });
};
