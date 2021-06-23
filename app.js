const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/img'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/src/Index.html");
});

app.get("/Localizacao", function(req,res){
    res.sendFile(__dirname + "/src/Localizacao.html");
});

app.get("/Historico", function(req,res){
    res.sendFile(__dirname + "/src/historico.html");
});

app.get("/Cadastro", function(req,res){
    res.sendFile(__dirname + "/src/Cadastro.html");
});
app.get("/Entrar", function(req,res){
    res.sendFile(__dirname + "/src/Login.html");
});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/Cadastro',function(req,res){
    req
});

app.post('/Entrar',function(req,res){

});

app.listen(8080);

const mysql = require ('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'chechely',
    password: 'xuxu.2003',
    database: 'teste'
});

connection.connect(function(err){
    if(err) console.error('Erro ao realizar a conexão com o banco de dados' + err.stack); return;

});