const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = '123'; // Contraseña en texto plano

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) throw err;
    console.log(hash); // Imprime el hash que deberás usar en la consulta SQL
});


//npm install bcrypt
//node hashPassword.js (funciona para la encriptacion de una contraseña por mysql)


// crear usuario desde aqui