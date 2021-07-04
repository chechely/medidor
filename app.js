// Chamar o http

const http = require('http');

// Chama o pacote express.js que faz a conexão com o banco e a navegação entre paginas

const express = require("express");
const app = express();

// Chama o BodyParser que é encarregado de enviar os dados recebidos das paginas html

const bodyParser = require("body-parser");

// Chama a conexão com o banco que está sendo feita no banco.js

const connection = require("./src/banco");

// Faz referência  a pasta onde estão os arquivos para o site poder "Encontra-los"

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/style.css'));
app.use(express.static(__dirname + '/src/img'));
app.use(bodyParser.urlencoded({extended:false}))

// Fazer a navegação entre as paginas html

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

// Porta que estamos usando localmente

app.listen(8080);

// Faz as pesquisas no sql e transforma em um Json 

connection.query("select datat from medidor_t order by datat desc limit 5; ", function(err,result){
    const dt1 = JSON.stringify(result[0].datat)
    const dt2 = JSON.stringify(result[1].datat)
    const dt3 = JSON.stringify(result[2].datat)
    const dt4 = JSON.stringify(result[3].datat)
    const dt5 = JSON.stringify(result[4].datat)
    const datat = [dt1,dt2,dt3,dt4,dt5]
    console.log(datat);
});
connection.query("select vazao from medidor_t  order by vazao  limit 5;", function(err,result){
    const v1 = JSON.stringify(result[0].vazao)
    const v2 = JSON.stringify(result[1].vazao)
    const v3 = JSON.stringify(result[2].vazao)
    const v4 = JSON.stringify(result[3].vazao)
    const v5 = JSON.stringify(result[4].vazao)
    const vazao = [v1,v2,v3,v4,v5]
    console.log(vazao);
});

connection.query("select datas from medidor_t order by datas desc  limit 5;", function(err,result){
    const d1 = JSON.stringify(result[0].datas)
    const d2 = JSON.stringify(result[1].datas)
    const d3 = JSON.stringify(result[2].datas)
    const d4 = JSON.stringify(result[3].datas)
    const d5 = JSON.stringify(result[4].datas)
    const datas = [d1,d2,d3,d4,d5]
    console.log(datas);
});