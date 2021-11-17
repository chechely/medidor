
require('dotenv').config();


// Chama a conexão com o mysql

const mysql = require ('mysql');

// Cria uma constante que indica o database e o usuario de dominio dele, junto com a senha

const connection = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
    
});


// Inicia a conexão com o databese mostrando no terminal se foi bem sucedida ou não

connection.connect(function(err){

});

// Exporta a conexão com o banco

module.exports = connection
