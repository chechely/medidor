// CHAMA O EXPRESS 

const express = require('express');

// CHAMA A CLASSE EXPRESS.ROUTER PARA MANIPULAÇÃO DE ROTAS

const router = express.Router();

// CHAMA A CONEXÃO COM O BANCO DE DADOS

const connection = require("./src/banco");

// CHAMA O NOMALIER PARA ENVIAR EMAIL

const nodemailer = require('nodemailer');

// RENDERIZA O ARQUIVO LOGIN.EJS PARA A PAGINA DE ENTRAR

router.get("/Entrar", function(req,res){
    res.render('Login')
});


// CRIA UMA SESSÃO DE USUARIO, SE ELE ESTIVER CADASTRADO E COLOCAR SEUS DADOS CORRETAMENTE SERÁ REDIRECIONADO PARA A TELA DE INICIO

router.post('/Entrar', function(req,res) {
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

router.get("/Inicio", function(req,res){
    connection.query("select  usuario.nome_usuario,medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Index',{Index : resultado})
    });
});

// ENVIA OS DADOS DO GRAFICO PARA A PAGINA DADOS_GRAFICO

router.get("/dados_grafico", function(req,res){
    res.send(dados_medidor());
}); 

router.post("/Cadastro", function(req,res){
    if(req.body.codigo_confi == texto){
        connection.query("insert into usuario(nome_usuario,nome,sobrenome,email,data_nasci,senha,tel,genero,foto,cargo) values(?,?,?,?,?,?,?,?,?,?);",[req.body.cad_usuario,req.body.cad_nome,req.body.cad_sobrenome,req.body.cad_email,req.body.DataNasci,req.body.cad_senha,req.body.cad_tel,req.body.genero,req.body.imagem,req.body.cargo], function(erro,resultado){
            if(erro){
                console.log("erro ao inserir dados no banco")
            }else{
                res.redirect('/Entrar');
            }
        });
    }else{
        console.log(erro)
    }
    module.exports = req.body.cad_email
    module.exports = req.body.codigo_confi
});
router.get("/dados_email", function(req,res){
    res.send(aut_cod());
}); 

function aut_cod(){
    var texto = "";
    var possibilidade = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
    texto += possibilidade.charAt(Math.floor(Math.random() * possibilidade.length));

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
        text: texto
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return texto;
}
// ENVIA FUNÇÃO DADOS_MAPA PARA A PAGINA DADOS_MAPA

router.get("/dados_mapa", function(req,res){
    res.send(dados_mapa());
}); 

// ENVIA OS DADOS DO MEDIDOR PARA O SELECT NA PAGINA LOCALIZAÇÃO

router.get("/Localizacao", function(req,res){
    connection.query("select  medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Localizacao',{Localizacao : resultado})
    });     
});

// ENVIA DOS DADOS DA VAZÃO PARA A TABELA NA PAGINA HISTORICO

router.get("/Historico", function(req,res){
    connection.query("select medidor.cidade, medidor.estado,medidor.id_medidor,medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v  from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor order by medidor_v.idmedidor_v desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('historico',{historico : resultado})
    });
});

// RENDERIZA O ARQUIVO CADASTRO.EJS PARA A PAGINA CADASTRO

router.get("/Cadastro", function(req,res){
   res.render('Cadastro')
});

// RENDERIZA A PAGINA MEDIDOR.EJS  PARA A PAGINA MEDIDOR

router.get("/Medidor", function(req,res){
    res.render('medidor')    
});

// RECEBE OS DADOS DO MEDIDOR QUE O USUARIO COLOCA NA PAGINA MEDIDOR

router.post("/Medidor", function(req,res){
    connection.query("insert into medidor(id_medidor,nome_medidor,longitude,latitude,cidade,estado,usuario_nome_usuario) values(?,?,?,?,?,?,'chechely');",[req.body.codigo_m,req.body.nome_med,req.body.m_longitude,req.body.m_latitude,req.body.m_cidade,req.body.m_estado], function(erro,resultado){
    if(erro){
        console.log("erro ao inserir dados no banco")
    }else{
        res.redirect('/Medidores-cadastrados');
    }
    });   
});

// PESQUISA OS DADOS DOS MEDIDORES E ENVIA PARA A TABELA DE MEDIDORES CADASTRADOS

router.get("/Medidores-cadastrados", function(req,res){
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
        res.render('medidores_cadastrados',{medidores_cadastrados : resultado})
    });
});

// DIRECIONA PARA A PAGINA ONDE ESTÃO OS SEUS DADOS

router.get("/Seus-dados", function(req,res){
    res.render('dados')
});

// PESQUISA NOS DADOS TODOS OS DADOS DOS MEDIDORES E ENVIA PARA O SELECT NA PAGINA DE CADASTRO DE MEDIÇÕES

router.get("/Cadastrar-medicoes", function(req,res){
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;",[], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('cadastrar_vazoes',{cadastrar_vazoes : resultado})
    });
});

// DESTROI A SESSÃO E REDIRECIONA PARA A PAGINA DE LOGIN

router.get('/Sair', function (req, res) {
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

    var usuario;
    usuario_id = usuario;

    var tds_dados_medidor = [dia,hora,dados,dados_l,usuario];

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

// EXPORTA CONSTANTE ROUTER

module.exports = router;