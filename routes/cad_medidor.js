// CHAMA O EXPRESS 

const express = require('express');

// CHAMA A CLASSE EXPRESS.ROUTER PARA MANIPULAÇÃO DE ROTAS

const router = express.Router();

// CHAMA A CONEXÃO COM O BANCO DE DADOS

const connection = require("./src/banco");
  
  module.exports = router;
  