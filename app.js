
// Chamar o http

const http = require('http');

// Chama o pacote express.js que faz a conexão com o banco e a navegação entre paginas

const express = require("express");
const app = express();

// Chama o BodyParser que é encarregado de enviar os dados recebidos das paginas html

const bodyParser = require("body-parser");

// Chama a conexão com o banco que está sendo feita no banco.js

const connection = require("./src/banco");

// Cria os arrays que irão receber os dados

var data1 = [];
var vazao = [];
var datas = [];

// Pesquisas no banco

connection.query("select datat,vazao,datas,id from medidor_t order by id desc; ", function(err,result){
    var d1 = (result[0].datat)
    var d2 = (result[1].datat)
    var d3 = (result[2].datat)
    var d4 = (result[3].datat)
    var d5 = (result[4].datat)
    data1 = [d1,d2,d3,d4,d5];

    const v1 = (result[0].vazao)
    const v2 = (result[1].vazao)
    const v3 = (result[2].vazao)
    const v4 = (result[3].vazao)
    const v5 = (result[4].vazao)
    vazao = [v1,v2,v3,v4,v5]

    const dt1 = (result[0].datas)
    const dt2 = (result[1].datas)
    const dt3 = (result[2].datas)
    const dt4 = (result[3].datas)
    const dt5 = (result[4].datas)
    datas = [dt1,dt2,dt3,dt4,dt5]
});

// Função que irá direcionar por um jquery os dados em um unico array

function data3(){
    var data2;
    data2 = data1;

    var hora;
    hora = datas;

    var dados;
    dados = vazao;

    var tudo = [data2,hora,dados];

    return tudo
}
// Faz referência  a pasta onde estão os arquivos para o site poder "Encontra-los"
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/img'));
app.use(bodyParser.urlencoded({extended:true}))

// Fazer a navegação entre as paginas html

app.get("/Entrar", function(req,res){
    res.sendFile(__dirname + "/src/Login.html");
});

app.get("/Inicio", function(req,res){
    res.sendFile(__dirname + "/src/Index.html");
}); 
app.get("/d", function(req,res){
    res.send(data3());
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

app.get("/Medidor", function(req,res){
    res.sendFile(__dirname + "/src/medidor.html");
});

app.get("/Medidores-cadastrados", function(req,res){
    res.sendFile(__dirname + "/src/medidores-cadastrados.html");
});

app.get("/Seus-dados", function(req,res){
    res.sendFile(__dirname + "/src/dados.html");
});

// Porta que estamos usando localmente

app.listen(8080);