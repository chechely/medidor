
// Chamar o http

const http = require('http');

// Chama o pacote express.js que faz a conexão com o banco e a navegação entre paginas

const express = require("express");
const app = express();

// Chamar o ejs

app.set('view engine', 'ejs');

// Chama o BodyParser que é encarregado de enviar os dados recebidos das paginas html

const bodyParser = require("body-parser");

// Chama a conexão com o banco que está sendo feita no banco.js

const connection = require("./src/banco");

// Faz referência  a pasta onde estão os arquivos para o site poder "Encontra-los"

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/img'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Fazer a navegação entre as paginas html

app.get("/Entrar", function(req,res){
    res.render('Login')
});

app.get("/Inicio", function(req,res){
    connection.query("select  medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Index',{Index : resultado})
    }); 
}); 
app.get("/dados_grafico", function(req,res){
    res.send(dados_medidor());
}); 
app.get("/Localizacao", function(req,res){
    res.render('Localizacao')
});

app.get("/Historico", function(req,res){
    connection.query("select medidor.cidade, medidor.estado,medidor.id_medidor,medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v  from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor order by medidor_v.idmedidor_v desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('historico',{historico : resultado})
    });
});

app.get("/Cadastro", function(req,res){
   res.render('Cadastro')
});

app.post("/Inicio", function(req,res){
    res.render('Index')
});

app.get("/Medidor", function(req,res){
    res.render('medidor')
});

app.get("/Medidores-cadastrados", function(req,res){
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
        res.render('medidores_cadastrados',{medidores_cadastrados : resultado})
    });
});

app.get("/Seus-dados", function(req,res){
    res.sendFile(__dirname + "/src/dados.html");
});

// Porta que estamos usando localmente

app.listen(8080);

// Cria os arrays que irão receber os dados para o grafico

var dia_v = [];
var vazao_v = [];
var hora_v = [];

// Pesquisas no banco para alimentar o grafico

connection.query("select  medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor where medidor.id_medidor = '0543' order by medidor_v.idmedidor_v desc limit 5;", function(err,result){
    var d1 = (result[0].datat)
    dia_v = [d1];

    var v1 = (result[0].vazao)
    var v2 = (result[1].vazao)
    var v3 = (result[2].vazao)
    var v4 = (result[3].vazao)
    var v5 = (result[4].vazao)
    vazao_v = [v1,v2,v3,v4,v5]

    var dt1 = (result[0].datah)
    var dt2 = (result[1].datah)
    var dt3 = (result[2].datah)
    var dt4 = (result[3].datah)
    var dt5 = (result[4].datah)
    hora_v = [dt1,dt2,dt3,dt4,dt5]
});

// Função que irá direcionar por um jquery os dados em um unico array e mandar para o grafico

function dados_medidor(){
    var dia;
    dia = dia_v;

    var hora;
    hora = hora_v;

    var dados;
    dados = vazao_v;

    var tds_dados_medidor = [dia,hora,dados];

    return tds_dados_medidor
}