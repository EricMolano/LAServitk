require('dotenv').config(); // Asegúrate de que esto está en la parte superior
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 2071;

// Configuración de la base de datos
const db = await mysql.createConnection(process.env.DATABASE_URL);
console.log('✅ Conectado a la base de datos de Railway');


db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database',hola("sena@example.com").then((e)=>{
    console.log(e)
  }));



});

async function hola(email) {
  const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  return(results)
}
// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://la-servitk.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());
app.use(express.json());

// Verifica la clave secreta
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Asegúrate de que esta línea muestra la clave secreta

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
  },
});

// Ruta para la recuperación de contraseña
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) {
      return res.status(404).json({ message: 'Correo no encontrado' });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await db.promise().query('UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?', [token, resetPasswordExpires, email]);

  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Recibiste este correo porque tú (o alguien más) solicitó restablecer la contraseña de tu cuenta.\n\n` +
            `Por favor, haz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso:\n\n` +
            `http://localhost:3000/reset-password/${token}\n\n` +
            `Si no solicitaste esto, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n`,
  };

  transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
          console.error('Error al enviar el correo:', error);
          return res.status(500).json({ message: 'Error al enviar el correo' });
      }
      res.status(200).json({ message: 'Correo de recuperación enviado' });
  });
});

// Ruta para el restablecimiento de contraseña
app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const [rows] = await db.promise().query('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?', [token, Date.now()]);

  if (rows.length === 0) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.promise().query('UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE resetPasswordToken = ?', [hashedPassword, token]);

  res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
});


// ===============================================================
// Componente Registro
// ===============================================================
app.post('/api/register', async (req, res) => {
  console.log("Hola mundo",req)
  try {
    const { email, password, name, surname, address, phone } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.promise().query(
      'INSERT INTO users (email, password, name, surname, address, phone, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, name, surname, address, phone, 2] // Suponiendo que rol_id = 2 es para cliente
    );

    return res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    console.error("Error en el registro2:", error);
    return res.status(500).json({ message: 'Error en el registro3', error: error.message });
  }
});


// ===============================================================
// Componente Login
// ===============================================================
// Componente Login
app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

      if (results.length === 0) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: user.id, role: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ success: true, token, user });
  } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });
      req.user = user;
      next();
  });
};

// ===============================================================
// Componente Octener usuarios
// ===============================================================
app.get('/api/user/data', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  console.log('Requesting user data for ID:', req.user.id);
  
  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error al obtener datos del usuario', error: err.message });
    }
    if (results.length === 0) {
      console.warn('User not found for ID:', req.user.id);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    res.status(200).json(user);
  });
});


// ===============================================================
// Componente Actualizar perfil
// ===============================================================
app.put('/api/user/update-profile', authenticateToken, (req, res) => {
  const { name, surname, address, phone } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario desde el token JWT

  // Log para ver qué datos está recibiendo el servidor
  console.log('Datos recibidos para actualizar:', { name, surname, address, phone });

  // Validar que los datos estén completos
  if (!name || !surname || !address || !phone) {
      return res.status(400).json({ message: 'Faltan datos para actualizar el perfil' });
  }

  // Consulta SQL para actualizar el perfil del usuario
  const sql = 'UPDATE users SET name = ?, surname = ?, address = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, surname, address, phone, userId], (err, results) => {
      if (err) {
          console.error('Error al actualizar el perfil:', err);
          return res.status(500).json({ message: 'Error al actualizar el perfil' });
      }

      // Verificar si el usuario fue encontrado y actualizado
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Responder con éxito
      res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  });
});



// ===============================================================
// Componente Actualizar perfil empleado
// ===============================================================
app.put('/api/user/update-profileE', authenticateToken, (req, res) => {
  const { name, surname, address, phone } = req.body;
  const sql = 'UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE id = ?';
  db.query(sql, [name, surname, address, phone, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar perfil' });
    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  });
});


// ===============================================================
// Componente Actualizar perfil Admin
// ===============================================================
app.put('/api/user/update-profileA', authenticateToken, (req, res) => {
  const { name, surname, address, phone } = req.body;
  const sql = 'UPDATE users SET name = ?, surname = ?, address = ?, phone = ? WHERE id = ?';
  db.query(sql, [name, surname, address, phone, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar perfil' });
    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  });
});


// ===============================================================
// Componente Obtener los vehiculos
// ===============================================================
app.get('/api/admin-vehicles', authenticateToken, (req, res) => {
  // El endpoint no verifica el rol, solo la autenticación
  db.query('SELECT * FROM vehiculo', (err, results) => {
    if (err) {
      console.error('Error al obtener los vehículos:', err);
      return res.status(500).json({ message: 'Error al obtener los vehículos', error: err.message });
    }
    res.status(200).json(results);
  });
});



// ===============================================================
// Componente Obtener los vehiculos por id
// ===============================================================
app.get('/api/vehicles', authenticateToken, (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario desde el token
  
  // Consulta para obtener todos los vehículos del usuario
  const query = 'SELECT * FROM vehiculo WHERE id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); // Devuelve la lista de vehículos
  });
});


// ===============================================================
// Componente Agregar vehiculos
// ===============================================================
app.post('/api/vehicles', authenticateToken, (req, res) => {
  const { marca, modelo, año, color, placa } = req.body;
  const id = req.user.id; // Usa el ID del usuario autenticado

  if (!marca || !modelo || !año || !placa) {
    return res.status(400).json({ message: 'Marca, modelo, año y placa son obligatorios.' });
  }

  const query = 'INSERT INTO vehiculo (marca, modelo, año, color, placa, id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [marca, modelo, año, color, placa, id], (err, result) => {
    if (err) {
      console.error('Error adding vehicle:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ idvehiculo: result.insertId, marca, modelo, año, color, placa, id });
  });
});


// ===============================================================
// Componente Actualizar vehiculos
// ===============================================================
app.put('/api/vehicles/:id', authenticateToken, (req, res) => {
  const { marca, modelo, año, color } = req.body; // Quitar `placa` de la destructuración
  const query = 'UPDATE vehiculo SET marca = ?, modelo = ?, año = ?, color = ? WHERE idvehiculo = ? AND id = ?';
  db.query(query, [marca, modelo, año, color, req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Vehicle updated successfully' });
  });
});



// ===============================================================
// Componente Obtener inventario
// ===============================================================
app.get('/api/inventory', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM producto'; // Asegúrate de que la tabla se llama 'producto'
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// ===============================================================
// Componente Obtener producto por id
// ===============================================================
app.get('/api/inventory/:id', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM producto WHERE id = ?'; // Asegúrate de que la columna es 'id'
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Inventory not found' }); 
    }
  });
});


// ===============================================================
// Componente Agregar el inventario
// ===============================================================
app.post('/api/inventory', authenticateToken, (req, res) => {
  const { nombre, descripcion, cantidad_en_stock, precio_compra } = req.body;

  if (!nombre || !descripcion || cantidad_en_stock === undefined || !precio_compra) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO producto (nombre, descripcion, cantidad_en_stock, precio_compra) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, cantidad_en_stock, precio_compra], (err, result) => {
    if (err) {
      console.error('Error adding inventory:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, nombre, descripcion, cantidad_en_stock, precio_compra });
  });
});


// ===============================================================
// Componente Actualizar el inventario
// ===============================================================
app.put('/api/inventory/:id', authenticateToken, (req, res) => {
  const { nombre, descripcion, cantidad_en_stock, precio_compra } = req.body;
  
  if (!nombre || !descripcion || cantidad_en_stock === undefined || !precio_compra) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'UPDATE producto SET nombre = ?, descripcion = ?, cantidad_en_stock = ?, precio_compra = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, cantidad_en_stock, precio_compra, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Product updated successfully' });
  });
});



// ===============================================================
// Componente Obtener usuarios
// ===============================================================
app.get('/api/users', authenticateToken, (req, res) => {
  const sql = 'SELECT id, name, surname, email, address, phone, rol_id FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
    }
    res.status(200).json(results);
  });
});


app.get('/api/users/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT id, email, name, surname, address, phone FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(results[0]);
  });
});


// ===============================================================
// Componente Actualizar los usuarios
// ===============================================================
app.put('/api/edit-profile-user/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const { email, name, surname, address, phone } = req.body;


  // Consulta SQL para actualizar el perfil
  const sql = 'UPDATE users SET email = ?, name = ?, surname = ?, address = ?, phone = ? WHERE id = ?';

  // Si algunos campos no están definidos, se les asigna el valor actual del usuario
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener datos del usuario:', err);
      return res.status(500).json({ message: 'Error al obtener datos del usuario', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const currentUser = results[0];

    // Asignar valores actuales si no se proporcionan
    const updatedEmail = email || currentUser.email;
    const updatedName = name || currentUser.name;
    const updatedSurname = surname || currentUser.surname;
    const updatedAddress = address || currentUser.address;
    const updatedPhone = phone || currentUser.phone;

    db.query(sql, [updatedEmail, updatedName, updatedSurname, updatedAddress, updatedPhone, userId], (err, results) => {
      if (err) {
        console.error('Error al actualizar el perfil:', err);
        return res.status(500).json({ message: 'Error al actualizar el perfil', error: err.message });
      }

      // Verificación si se actualizó algún registro
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Respuesta exitosa
      res.status(200).json({ message: 'Perfil actualizado exitosamente' });
    });
  });
});

app.get('/api/users/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT id, email, name, surname, address, phone FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(results[0]);
  });
});


// ===============================================================
// Componente Actualizar el vehiculos por id
// ===============================================================
app.put('/api/update-vehicle-user/:idvehiculo', authenticateToken, (req, res) => {
  const vehiculoId = req.params.idvehiculo;
  const { marca, modelo, año, color, placa } = req.body;

  // Consulta SQL para actualizar el vehículo
  const sql = 'UPDATE vehiculo SET marca = ?, modelo = ?, año = ?, color = ?, placa = ? WHERE idvehiculo = ?';

  // Si algunos campos no están definidos, se les asigna el valor actual del vehículo
  db.query('SELECT * FROM vehiculo WHERE idvehiculo = ?', [vehiculoId], (err, results) => {
    if (err) {
      console.error('Error al obtener datos del vehículo:', err);
      return res.status(500).json({ message: 'Error al obtener datos del vehículo', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    const currentVehicle = results[0];

    // Asignar valores actuales si no se proporcionan
    const updatedMarca = marca || currentVehicle.marca;
    const updatedModelo = modelo || currentVehicle.modelo;
    const updatedAño = año || currentVehicle.año;
    const updatedColor = color || currentVehicle.color;
    const updatedPlaca = placa || currentVehicle.placa;

    // Ejecutar la consulta de actualización
    db.query(sql, [updatedMarca, updatedModelo, updatedAño, updatedColor, updatedPlaca, vehiculoId], (err, results) => {
      if (err) {
        console.error('Error al actualizar el vehículo:', err);
        return res.status(500).json({ message: 'Error al actualizar el vehículo', error: err.message });
      }

      // Verificación si se actualizó algún registro
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }

      // Respuesta exitosa
      res.status(200).json({ message: 'Vehículo actualizado exitosamente' });
    });
  });
});


// ===============================================================
// Componente Insertar servicios
// ===============================================================
app.post('/api/servicios', (req, res) => {
  console.log('Datos recibidos:', req.body);
  
  const { nombre_empleado, nombre_cliente, placa_vehiculo, nombre_servicio, descripcion, costo } = req.body;

  if (!nombre_empleado || !nombre_cliente || !placa_vehiculo || !nombre_servicio || !costo) {
    console.log('Campos faltantes:', { nombre_empleado, nombre_cliente, placa_vehiculo, nombre_servicio, costo });
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  let idempleado, idcliente;

  // Buscar el ID del cliente y verificar la propiedad del vehículo
  db.promise().query(`
    SELECT users.id, vehiculo.placa
    FROM users 
    JOIN rol ON users.rol_id = rol.id 
    LEFT JOIN vehiculo ON users.id = vehiculo.id
    WHERE users.name = ? AND rol.nombre = 'Cliente' AND vehiculo.placa = ?
  `, [nombre_cliente, placa_vehiculo])
    .then(([rows]) => {
      if (rows.length === 0) {
        throw { status: 404, message: 'El cliente especificado no existe, no tiene el rol correcto o no es propietario del vehículo' };
      }
      idcliente = rows[0].id;
      console.log("Cliente y vehículo verificados correctamente, ID cliente:", idcliente);

      // Buscar el ID del empleado por nombre
      return db.promise().query(`
        SELECT users.id 
        FROM users 
        JOIN rol ON users.rol_id = rol.id 
        WHERE users.name = ? AND rol.nombre = 'Empleado'
      `, [nombre_empleado]);
    })
    .then(([rows]) => {
      if (rows.length === 0) {
        throw { status: 404, message: 'El empleado especificado no existe o no tiene el rol correcto' };
      }
      idempleado = rows[0].id;
      console.log("Empleado verificado correctamente, ID:", idempleado);

      // Insertar el servicio en la tabla registro_servicio
      return db.promise().query(
        'INSERT INTO registro_servicio (idempleado, idcliente, placa_vehiculo, nombre_servicio, descripcion, costo) VALUES (?, ?, ?, ?, ?, ?)',
        [idempleado, idcliente, placa_vehiculo, nombre_servicio, descripcion, costo]
      );
    })
    .then(([result]) => {
      console.log("Servicio registrado exitosamente:", result);
      return res.status(201).json({ message: 'Servicio registrado exitosamente', servicioId: result.insertId });
    })
    .catch(error => {
      console.error("Error al registrar el servicio:", error);
      const status = error.status || 500;
      const message = error.message || 'Error al registrar el servicio';
      if (!res.headersSent) {
        return res.status(status).json({ message, error: error.toString() });
      }
    });
});

/*

// ===============================================================
// Componente Actualizar el servicio 
// ===============================================================

app.put('/api/servicios/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { nombre_empleado, nombre_cliente, placa_vehiculo, nombre_servicio, descripcion, costo } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre_empleado || !nombre_cliente || !placa_vehiculo || !nombre_servicio || !costo) {
    console.log('Campos faltantes:', { nombre_empleado, nombre_cliente, placa_vehiculo, nombre_servicio, costo });
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  let idempleado, idcliente;

  // Verificar cliente y propiedad del vehículo
  db.promise().query(`
    SELECT users.id, vehiculo.placa
    FROM users 
    JOIN rol ON users.rol_id = rol.id 
    LEFT JOIN vehiculo ON users.id = vehiculo.id
    WHERE users.name = ? AND rol.nombre = 'Cliente' AND vehiculo.placa = ?
  `, [nombre_cliente, placa_vehiculo])
    .then(([rows]) => {
      if (rows.length === 0) {
        throw { status: 404, message: 'El cliente especificado no existe, no tiene el rol correcto o no es propietario del vehículo' };
      }
      idcliente = rows[0].id;
      console.log("Cliente y vehículo verificados correctamente, ID cliente:", idcliente);

      // Verificar empleado
      return db.promise().query(`
        SELECT users.id 
        FROM users 
        JOIN rol ON users.rol_id = rol.id 
        WHERE users.name = ? AND rol.nombre = 'Empleado'
      `, [nombre_empleado]);
    })
    .then(([rows]) => {
      if (rows.length === 0) {
        throw { status: 404, message: 'El empleado especificado no existe o no tiene el rol correcto' };
      }
      idempleado = rows[0].id;
      console.log("Empleado verificado correctamente, ID:", idempleado);

      // Verificar si la placa del vehículo existe
      return db.promise().query('SELECT * FROM vehiculo WHERE placa = ?', [placa_vehiculo]);
    })
    .then(([vehiculo]) => {
      if (vehiculo.length === 0) {
        throw { status: 404, message: 'El vehículo con esa placa no está registrado' };
      }

      // Actualizar el servicio en la tabla registro_servicio
      return db.promise().query(
        'UPDATE registro_servicio SET idempleado = ?, placa_vehiculo = ?, nombre_servicio = ?, descripcion = ?, costo = ? WHERE idregistro = ?',
        [idempleado, placa_vehiculo, nombre_servicio, descripcion, costo, id]
      );
    })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        throw { status: 404, message: 'Servicio no encontrado' };
      }

      // Responder con éxito
      console.log("Servicio actualizado exitosamente");
      return res.status(200).json({ message: 'Servicio actualizado exitosamente' });
    })
    .catch(error => {
      console.error("Error al actualizar el servicio:", error);
      const status = error.status || 500;
      const message = error.message || 'Error al actualizar el servicio';
      if (!res.headersSent) {
        return res.status(status).json({ message, error: error.toString() });
      }
    });
});

*/

  
  

// ===============================================================
// Componente Obtener el servicio por id
// ===============================================================

app.get('/api/servicios', authenticateToken, (req, res) => {
  const idCliente = req.user.id;
  const rolIdCliente = req.user.role;

  let query = `
    SELECT rs.*, e.name AS nombre_empleado, c.name AS nombre_cliente, v.marca, v.modelo, v.placa
    FROM registro_servicio rs
    JOIN users e ON rs.idempleado = e.id
    JOIN users c ON rs.idcliente = c.id
    JOIN vehiculo v ON rs.placa_vehiculo = v.placa
  `;

  // Si el usuario es cliente, limitamos los resultados a los servicios de ese cliente
  if (rolIdCliente === 2) { // 2 es el rol del cliente
    query += ` WHERE rs.idcliente = ?`;
  }

  // Ejecutar la consulta
  db.query(query, rolIdCliente === 2 ? [idCliente] : [], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // Devuelve la lista de servicios
  });
});

// Inicia el servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Ruta para obtener las solicitudes de productos
app.get('/api/solicitudes', authenticateToken, (req, res) => {
  const query = `
    SELECT s.id, u.name AS usuario, p.nombre AS producto, s.cantidad, s.fecha_solicitud, s.estado
    FROM solicitudes s
    JOIN users u ON s.id_usuario = u.id
    JOIN producto p ON s.id_producto = p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las solicitudes:', err);
      return res.status(500).json({ message: 'Error al obtener las solicitudes' });
    }
    res.status(200).json(results);
  });
});
// Ruta para solicitar un producto
app.post('/api/solicitar-producto', authenticateToken, (req, res) => {
  const { id_producto, cantidad } = req.body;
  const id_usuario = req.user.id; // Obtener el ID del usuario desde el token JWT

  // Validar que los datos estén completos
  if (!id_producto || !cantidad) {
    return res.status(400).json({ message: 'Faltan datos para solicitar el producto' });
  }

  // Consulta SQL para insertar la solicitud
  const sql = 'INSERT INTO solicitudes (id_usuario, id_producto, cantidad, estado) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_usuario, id_producto, cantidad, 'Pendiente'], (err, result) => {
    if (err) {
      console.error('Error al solicitar el producto:', err);
      return res.status(500).json({ message: 'Error al solicitar el producto' });
    }

    // Responder con éxito
    res.status(201).json({ message: 'Producto solicitado exitosamente', solicitudId: result.insertId });
  });
});
// Ruta para obtener los productos
app.get('/api/productos', authenticateToken, (req, res) => {
  const query = 'SELECT id, nombre FROM producto';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      return res.status(500).json({ message: 'Error al obtener los productos' });
    }
    res.status(200).json(results);
  });
});

// Ruta para agregar un producto al inventario
app.post('/api/inventory', authenticateToken, (req, res) => {
  const { nombre, descripcion, cantidad_en_stock, precio_compra } = req.body;

  // Validar que los datos estén completos
  if (!nombre || !cantidad_en_stock || !precio_compra) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Consulta SQL para insertar el producto
  const sql = 'INSERT INTO producto (nombre, descripcion, cantidad_en_stock, precio_compra) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, cantidad_en_stock, precio_compra], (err, result) => {
    if (err) {
      console.error('Error al agregar el producto:', err);
      return res.status(500).json({ message: 'Error al agregar el producto' });
    }

    // Responder con éxito
    res.status(201).json({ message: 'Producto agregado exitosamente', productoId: result.insertId });
  });
});


// Ruta para obtener los detalles de un producto específico
app.get('/api/productos/:id', (req, res) => {
  const query = 'SELECT nombre, descripcion, cantidad_en_stock, precio_compra FROM producto WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
      if (err) {
          console.error('Error al obtener el producto:', err);
          return res.status(500).json({ message: 'Error al obtener el producto' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(results[0]);
  });
});

// Ruta para obtener las compras del cliente
app.get('/api/compras', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const query = `
    SELECT s.id, p.nombre AS producto, s.cantidad, s.fecha_solicitud
    FROM solicitudes s
    JOIN producto p ON s.id_producto = p.id
    WHERE s.id_usuario = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener las compras:', err);
      return res.status(500).json({ message: 'Error al obtener las compras' });
    }
    res.status(200).json(results);
  });
});

// Ruta para borrar una solicitud
app.delete('/api/solicitudes/:id', authenticateToken, (req, res) => {
  const solicitudId = req.params.id;
  const userId = req.user.id;
  const query = 'DELETE FROM solicitudes WHERE id = ? AND id_usuario = ?';
  db.query(query, [solicitudId, userId], (err, result) => {
    if (err) {
      console.error('Error al borrar la solicitud:', err);
      return res.status(500).json({ message: 'Error al borrar la solicitud' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    res.status(200).json({ message: 'Solicitud borrada exitosamente' });
  });
});
