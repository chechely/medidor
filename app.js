
// CHAMA O HTTP

const http = require('http');

// CHAMA O PACOTE EXPRESS JS

const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);

// CHAMA O SOCKET  

const io = require('socket.io')(httpServer);

// CHAMA O BODYPARSER PARA RECEBER OS DADOS DO HTML

const bodyParser = require("body-parser");

const session = require('express-session');

const flash = require('express-flash');

// CHAMA A CONEXÃO COM O ROUTER

var router = require('./route');

// CHAMA O EJS

app.set('view engine', 'ejs');

// REFERÊNCIA AS PASTAS 

app.use(express.static(__dirname + '/src/'));
app.use(express.static(__dirname + '/src/img'));

app.use('/',router);

// CRIA UMA SESSÃO DE LOGIN

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 


app.use(flash());

// USA O BODYPARSER PARA PEGAR DADOS DO USUARIO

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PORTA QUE USAMOS LOCALMENTE

httpServer.listen(8080);

// EXPORTA CONSTANTE APP

module.exports = app;