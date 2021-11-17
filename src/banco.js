
require('dotenv').config();

const pool = require('generic-pool');


// Chama a conexão com o mysql

const mysql = require ('mysql');

// Cria uma constante que indica o database e o usuario de dominio dele, junto com a senha

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE 
});

// Exporta a conexão com o banco

module.exports = connection
