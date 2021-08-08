
// CHAMA O HTTP

const http = require('http');

// CHAMA O PACOTE EXPRESS JS

const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);

// CHAMA O SOCKET  

const io = require('socket.io')(httpServer);

const session = require('express-session');

const flash = require('express-flash');

const connection = require("./src/banco");

// CHAMA O NOMALIER PARA ENVIAR EMAIL

const nodemailer = require('nodemailer');

// CHAMA O EJS

app.set('view engine', 'ejs');

// REFERÊNCIA AS PASTAS 

app.use(express.static(__dirname + '/src/'));
app.use(express.static(__dirname + '/src/img'));

// CRIA UMA SESSÃO DE LOGIN

app.use(session({ 
    secret: 'bananafish',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());

// CHAMA O BODYPARSER PARA RECEBER OS DADOS DO HTML

const bodyParser = require("body-parser");

// USA O BODYPARSER PARA PEGAR DADOS DO USUARIO

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// RENDERIZA O ARQUIVO LOGIN.EJS PARA A PAGINA DE ENTRAR

app.get("/Entrar", function(req,res){
    res.render('Login')
});

// CRIA UMA SESSÃO DE USUARIO, SE ELE ESTIVER CADASTRADO E COLOCAR SEUS DADOS CORRETAMENTE SERÁ REDIRECIONADO PARA A TELA DE INICIO

app.post('/Entrar', function(req,res) {
	var usuario = req.body.login_usuario;
	var senha = req.body.login_senha;
	if (usuario && senha) {
		connection.query('SELECT nome_usuario,senha FROM usuario WHERE nome_usuario = ? AND senha = ?', [usuario, senha], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.senha = senha;
				res.redirect('/Inicio');
			} else {
				res.send('Incorrect Username and/or Password!');
			}		
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// ENVIA OS DADOS DO USUARIO, MEDIDOR E VAZÃO PARA A PAGINA INICIO

 app.get("/Inicio", function(req,res){
    connection.query("select  usuario.nome_usuario,medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Index',{Index : resultado})
    });
}); 

// ENVIA OS DADOS DO GRAFICO PARA A PAGINA DADOS_GRAFICO

app.get("/dados_grafico", function(req,res){
    res.send(dados_medidor());
}); 

 app.post("/Inicio", function(req,res){
    grafico_nome = req.body.medidor_grafico
}); 

app.get("/Email", function(req,res){
    res.render('email');
}); 

app.post("/Email", function(req,res){
var codigo_cad = "";
var possibilidade = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 5; i++)
codigo_cad += possibilidade.charAt(Math.floor(Math.random() * possibilidade.length));

     var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
          user: 'michellesantosdeaquino@gmail.com',
          pass: '99845135'
        }
      });
      
      var mailOptions = {
        from: 'michellesantosdeaquino@gmail.com',
        to: req.body.cad_email,
        subject: 'Codigo de confirmação!',
        text: codigo_cad
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
});
app.post("/Cadastro", function(req,res){
        connection.query("insert into usuario(nome_usuario,nome,sobrenome,data_nasci,senha,tel,genero,foto,cargo) values(?,?,?,?,?,?,?,?,?,?);",[req.body.cad_usuario,req.body.cad_nome,req.body.cad_sobrenome,req.body.DataNasci,req.body.cad_senha,req.body.cad_tel,req.body.genero,req.body.imagem,req.body.cargo], function(erro,resultado){
            if(erro){
                console.log("erro ao inserir dados no banco")
            }else{
                res.redirect('/Email');
            }
        });
});

// ENVIA FUNÇÃO DADOS_MAPA PARA A PAGINA DADOS_MAPA

app.get("/dados_mapa", function(req,res){
    res.send(dados_mapa());
}); 

// ENVIA OS DADOS DO MEDIDOR PARA O SELECT NA PAGINA LOCALIZAÇÃO

app.get("/Localizacao", function(req,res){
    connection.query("select  medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Localizacao',{Localizacao : resultado})
    });     
});

// ENVIA DOS DADOS DA VAZÃO PARA A TABELA NA PAGINA HISTORICO

app.get("/Historico", function(req,res){
    connection.query("select medidor.cidade, medidor.estado,medidor.id_medidor,medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v  from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor order by medidor_v.idmedidor_v desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('historico',{historico : resultado})
    });
});

// RENDERIZA O ARQUIVO CADASTRO.EJS PARA A PAGINA CADASTRO

app.get("/Cadastro", function(req,res){
   res.render('Cadastro')
});



// RECEBE OS DADOS DO MEDIDOR QUE O USUARIO COLOCA NA PAGINA MEDIDOR

function codigo_medidor() {

var texto = "";
var possibilidade = "0123456789";

for (var i = 0; i < 5; i++)
texto += possibilidade.charAt(Math.floor(Math.random() * possibilidade.length));

    var codigo_medi;
    codigo_medi = texto
    return codigo_medi
}

// RENDERIZA A PAGINA MEDIDOR.EJS  PARA A PAGINA MEDIDOR

app.get("/Codi_medidor", function(req,res){
    res.send(codigo_medidor())   
});

app.get("/Medidor", function(req,res){
    res.render('medidor')   
});

app.post("/Medidor", function(req,res){
    var codigo_medidor;
    document.ready(function() {
    get('/Codi_medidor', function(res) {
        codigo_medidor = res;
    })
});
    connection.query("insert into medidor(id_medidor,nome_medidor,longitude,latitude,cidade,estado,usuario_nome_usuario) values(?,?,?,?,?,?,'chechely');",[codigo_medidor,req.body.nome_med,req.body.m_longitude,req.body.m_latitude,req.body.m_cidade,req.body.m_estado], function(erro,resultado){
    if(erro){
        console.log("erro ao inserir dados no banco")
    }else{
        res.redirect('/Medidores-cadastrados');
    }
    });   
});

// PESQUISA OS DADOS DOS MEDIDORES E ENVIA PARA A TABELA DE MEDIDORES CADASTRADOS

app.get("/Medidores-cadastrados", function(req,res){
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
        res.render('medidores_cadastrados',{medidores_cadastrados : resultado})
    });
});

// DIRECIONA PARA A PAGINA ONDE ESTÃO OS SEUS DADOS

app.get("/Seus-dados", function(req,res){
    res.render('dados')
});

// PESQUISA NOS DADOS TODOS OS DADOS DOS MEDIDORES E ENVIA PARA O SELECT NA PAGINA DE CADASTRO DE MEDIÇÕES

app.get("/Cadastrar-medicoes", function(req,res){
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('cadastrar_vazoes',{cadastrar_vazoes : resultado})
    });
});

// DESTROI A SESSÃO E REDIRECIONA PARA A PAGINA DE LOGIN

app.get('/Sair', function (req, res) {
    req.session.destroy();
    res.redirect('/Entrar');
  });

// CRIA ARRAYS QUE IRÃO RECEBER OS DADOS DO GRAFICO

var dia_v = [];
var vazao_v = [];
var vazao_l = [];
var hora_v = [];

// PESQUISAS NO BANCO PARA ALIMENTAR O GRAFICO

    connection.query("select medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor where medidor.id_medidor = '0543' order by medidor_v.idmedidor_v desc limit 5;", function(err,result){
    var d1 = (result[0].datat)
    dia_v = [d1];

    var v1 = (result[0].vazao)
    var v2 = (result[1].vazao)
    var v3 = (result[2].vazao)
    var v4 = (result[3].vazao)
    var v5 = (result[4].vazao)
    vazao_v = [v1,v2,v3,v4,v5]

    var vl1 = (result[0].vazao)/3.6
    var vl2 = (result[1].vazao)/3.6
    var vl3 = (result[2].vazao)/3.6
    var vl4 = (result[3].vazao)/3.6
    var vl5 = (result[4].vazao)/3.6
    vazao_l = [vl1,vl2,vl3,vl4,vl5]

    var dt1 = (result[0].datah)
    var dt2 = (result[1].datah)
    var dt3 = (result[2].datah)
    var dt4 = (result[3].datah)
    var dt5 = (result[4].datah)
    hora_v = [dt1,dt2,dt3,dt4,dt5]
});
// FUNÇÃO QUE IRÁ REDIRECIONAR POR UM JQUERY OS DADOS DE UM UNICO ARRAY E MANDAR PARA O GRAFICO 

function dados_medidor(){
    var dia;
    dia = dia_v;

    var hora;
    hora = hora_v;

    var dados;
    dados = vazao_v;

    var dados_l;
    dados_l = vazao_l;

    var tds_dados_medidor = [dia,hora,dados,dados_l];

    return tds_dados_medidor
}

// CRIA ARRAY´S VAZIOS PARA RECEBER A LONGITUDE E A LATITUDE

var longitude_mapa = [];
var latitude_mapa = [];

// BUSCA A LONGITUDE E A LATITUDE DO BANCO E COLOCA NO ARRAY

connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where  medidor.nome_medidor = 'Medidor1';", function(err,result){
   var longit = (result[0].longitude);
   longitude_mapa = longit ;

   var latit = (result[0].latitude);
    latitude_mapa = latit ;
});


// DADOS DO MAPA COLOCADOS EM UMA FUNÇÃO

function dados_mapa(){
    var longitude;
    longitude = longitude_mapa;

    var latitude;
    latitude = latitude_mapa;

    var tds_dados_mapa = [longitude,latitude];
    return tds_dados_mapa
}
// PORTA QUE USAMOS LOCALMENTE

httpServer.listen(8080);

// EXPORTA CONSTANTE APP

module.exports = app;