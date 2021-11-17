
// CHAMA O HTTP

const http = require('http');

// CHAMA O PACOTE EXPRESS JS

var express = require('express');

const app = express();

const httpServer = require("http").createServer(app);

// CHAMA O SOCKET  

const io = require('socket.io')(httpServer);

// CHAMA O EXPRESS SESSION  

const session = require('express-session');

// CHAMA O EXPRESS FLASH  

var flash = require('express-flash');

var path = require('path');

var compression = require('compression')

app.use(compression())

const connection = require("./src/banco");

// CHAMA O EJS

app.set('view engine', 'ejs');

// REFERÊNCIA AS PASTAS 

app.set('views',path.join(__dirname + '/views'))
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/img'));

// CRIA UMA SESSÃO DE LOGIN

app.set('trust proxy', 1);

// PARA TER ACESSO AS SENHAS NO .ENV

require('dotenv').config();

// CRIA UMA SESSÃO PARA O USUARIO

app.use(
    session({
      secret: process.env.SS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );
 
// USA O EXPRESS FLASH

  app.use(flash());

// CHAMA O BODYPARSER PARA RECEBER OS DADOS DO HTML

const bodyParser = require("body-parser");

// USA O BODYPARSER PARA PEGAR DADOS DO USUARIO

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
    res.redirect('/Entrar');
});

// RENDERIZA O ARQUIVO LOGIN.EJS PARA A PAGINA DE ENTRAR

app.get("/Entrar", function(req,res){
    const no_login = req.flash('no_login');
    res.render('Login',{no_login})
});

// CRIA UMA SESSÃO DE USUARIO, SE ELE ESTIVER CADASTRADO E COLOCAR SEUS DADOS CORRETAMENTE SERÁ REDIRECIONADO PARA A TELA DE INICIO

app.post('/Entrar', function(req,res) {
	var usuario = req.body.login_usuario;
	var senha = req.body.login_senha;
	if (usuario && senha) {
		connection.query('SELECT nome_usuario,senha FROM usuario WHERE nome_usuario = ? AND senha = ?', [usuario, senha], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
                req.session.usuario = usuario;
				req.session.senha = senha;
	            res.redirect('/Inicio');
			} else {
                req.flash('no_login',"Senha ou usuario esta incorreto, tente novamente!");
                res.redirect('/Entrar');
			}		
			res.end();
		});
	} else {  
        req.flash('no_login', 'Digite seu nome de usuário e senha!')
        res.redirect('/Entrar');
		res.end();
	}
});

// ENVIA OS DADOS DO USUARIO, MEDIDOR E VAZÃO PARA A PAGINA INICIO

app.get("/Inicio", function(req,res){
    if (req.session.loggedin) {

// ATRAVES DA PESQUISA PODEMOS SABER SE ALGUM MEDIDOR NÃO RECEBEU NENHUMA ATUALIZAÇÃO E ENTÃO ENVIAREMOS UMA NOTIFICAÇÃO PELO FLASH SESSION

        let aviso = req.flash('aviso');

        var dados = req.flash('dados');

// ENVIA TODOS OS MEDIDORES CADASTRADOS PARA A TELA INICIAL
         
        connection.query("select  medidor.id_medidor, medidor.nome_medidor from usuario INNER JOIN medidor ON medidor.usuario_nome_usuario= usuario.nome_usuario where usuario.nome_usuario = ?;",[req.session.usuario], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Index',{Index : resultado, aviso:aviso,dados:dados})
    });
    }else{
        res.redirect('/Entrar');
    } 
});

// ENVIA OS DADOS DO GRAFICO PARA A PAGINA DADOS_GRAFICO

app.post('/Inicio', async function(req,res){
    if (req.session.loggedin) {

// CRIA UMA VARIAVEL COM O MEDIDOR ESCOLHIDO PELO USUARIO

        let medidor;
        medidor = req.body.medidor_grafico;
        if (medidor != 0) {
            var dia_v = [];
            var vazao_v = [];
            var vazao_l = [];
            var hora_v = [];
            var longi_lat = [];

  // PESQUISA OS DADOS DO MEDIDOR ESCOLHIDO

  connection.query("select medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v,medidor.longitude, medidor.latitude from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor where medidor.nome_medidor = ? order by medidor_v.idmedidor_v desc limit 5;",[medidor], function(err,result){
    
// CRIA 5 VARIAVEIS COM AS VAZÕES MAIS RECENTES COM A DATA E A HORA DE CADA UMA

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

      var longitude = (result[0].longitude)
      var latitude = (result[0].latitude)
      longi_lat = [longitude,latitude]


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

    var mapa;
    mapa = longi_lat;

    var tds_dados_medidor = [dia,hora,dados,dados_l,mapa];

    return tds_dados_medidor
}   
req.flash('dados',dia_v);
res.redirect('/Inicio');

// PEGA OS DADOS DA FUNÇÃO E ENVIA PARA /DADOS_MEDIDOR

    app.get('/dados_medidor', function(req,res){
    req.flash('dados',dia_v);

    res.send(dados_medidor())
    });

    if(err){
        req.flash('aviso',"Erro ao buscar dados, tente novamente!");
        res.redirect('/Inicio'); 
    }

});
}else{
    req.flash('aviso',"Medidor não tem nenhum dado");
    res.redirect('/Inicio');
} 
}else{
    res.redirect('/Entrar');
} 

});

// CADASTRA UM NOVO USUARIO

app.post("/Cadastro", function(req,res){
    connection.query("insert into usuario(nome_usuario,nome,sobrenome,email,data_nasci,senha,tel,genero,foto,cargo) values(?,?,?,?,?,?,?,?,?,?);",[req.body.cad_usuario,req.body.cad_nome,req.body.cad_sobrenome,req.body.cad_email,req.body.DataNasci,req.body.cad_senha,req.body.cad_tel,req.body.genero,req.body.imagem,req.body.cargo], function(erro,resultado){
        if(req.body.cad_senha_n !== req.body.cad_senha){
            req.flash('err_cad',"Senha e confirmação de senha diferentes!");
            res.redirect('/Cadastro');
        }  
        else{
        if(erro){

            req.flash('err_cad',"Erro ao realizar cadastro, tente novamente!");
            res.redirect('/Cadastro');

            }else{ 
                res.redirect('/Inicio')
            }
        }
        }); 
});

// ENVIA FUNÇÃO DADOS_MAPA PARA A PAGINA DADOS_MAPA

app.get("/dados_mapa", function(req,res){
    res.send(dados_mapa());
}); 

// ENVIA OS DADOS DO MEDIDOR PARA O SELECT NA PAGINA LOCALIZAÇÃO

app.get("/Localizacao", function(req,res){
    if (req.session.loggedin) {

// PEGA A LONGITUDE E A LATITUDE DO MEDIDOR ESCOLHIDO

    connection.query("select  medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = ? order by medidor.id_medidor desc;",[req.session.usuario], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('Localizacao',{Localizacao : resultado})
    });  
    }else{
        res.redirect('/Entrar');
    }   
});

// ENVIA DOS DADOS DA VAZÃO PARA A TABELA NA PAGINA HISTORICO

app.get("/Historico", function(req,res){
    if (req.session.loggedin) {
    connection.query("select usuario.nome_usuario,medidor.cidade, medidor.estado,medidor.id_medidor,medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v  from ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor) where usuario.nome_usuario= ? order by medidor_v.idmedidor_v desc;",[req.session.usuario], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    res.render('historico',{historico : resultado})
    });
    }else{
        res.redirect('/Entrar');
    }  
});

// RENDERIZA O ARQUIVO CADASTRO.EJS PARA A PAGINA CADASTRO

app.get("/Cadastro", function(req,res){
    const err_cad = req.flash('err_cad');
   res.render('Cadastro',{err_cad})
});

// CADASTRA NOVAS MEDIÇÕES NO BANCO

app.post("/cad_v", function(req,res){
    connection.query("insert into medidor_v(vazao,datat,datah,id_medidor) values(?,?,?,?);",[req.body.vazao_cad,req.body.datatt,req.body.datahh,req.body.cod_med_v], function(erro,resultado){
    if(resultado){

// CASO O MEDIDOR FOR CADASTRADO COM SUCESSO APARECERÁ UMA DIV DE ALERTA INDICANDO O SUCESSO

        req.flash('med','Cadastrado com sucesso!');
        res.redirect('/Cadastrar-medicoes')
    } else{

// CASO O MEDIDOR NÃO FOR CADASTRADO  APARECERÁ UMA DIV DE ALERTA INDICANDO A FALHA

        req.flash('med_err','Erro ao cadastrar, tente novamente!');
        res.redirect('/Cadastrar-medicoes')
    }
    });
 });

// APAGA OS DADOS
 
 app.post("/apagar_vazao", function(req,res){
    connection.query("delete from medidor_v where datat = ? and datah = ?;",[], function(erro,resultado){
    if(resultado){
        
    } else{
        
    }
    });
 });

// ATUALIZA OS DADOS 

 app.post("/atualizar", function(req,res){
    
    connection.query("update from usuario where nome_usuario = '';",[], function(erro,resultado){
    if(resultado){
      
    } else{
       
    }
    });
 });

// CRIA UMA PAGINA QUE CADASTRA NOVOS MEDIDORES

app.get("/Medidor", function(req,res){
    if (req.session.loggedin) {

    const med_cad = req.flash('med_cad');
    const med_cad_err = req.flash('med_cad_err');
    res.render('medidor',{med_cad:med_cad,med_cad_err:med_cad_err}) 

    }else{
        res.redirect('/Entrar');
    }   
});

app.post("/Medidor", function(req,res){
    connection.query("insert into medidor(id_medidor,nome_medidor,longitude,latitude,cidade,estado,usuario_nome_usuario) values(?,?,?,?,?,?,?);",[req.body.codigo_medidor,req.body.nome_med,req.body.m_longitude,req.body.m_latitude,req.body.m_cidade,req.body.m_estado,req.session.usuario], function(erro,resultado){
    if(erro){
        req.flash('med_cad_err',"Erro ao inserir medidor, tente novamente!");
        res.redirect('/Medidor');
    }else{
        req.flash('med_cad',"Medidore cadastrado com sucesso!");
        res.redirect('/Medidor');
    }
    });   
});

// PESQUISA OS DADOS DOS MEDIDORES E ENVIA PARA A TABELA DE MEDIDORES CADASTRADOS

app.get("/Medidores-cadastrados", function(req,res){
    if (req.session.loggedin) {
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = ? order by medidor.id_medidor desc;",[req.session.usuario], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
        res.render('medidores_cadastrados',{medidores_cadastrados : resultado})
    });
    }else{
        res.redirect('/Entrar');
    } 
});

// DIRECIONA PARA A PAGINA ONDE ESTÃO OS SEUS DADOS

app.get("/Seus-dados", function(req,res){
    if (req.session.loggedin) {
        connection.query("select nome_usuario, nome, sobrenome, email, data_nasci, senha, tel, genero, foto, cargo from usuario where nome_usuario = ?;",[req.session.usuario], function(erro,resultado){
            if(erro){
                res.status(200).send(erro)
            }
            res.render('dados',{dados_usuario : resultado})
    });
    }else{
        res.redirect('/Entrar');
    } 
});

// PESQUISA NOS DADOS TODOS OS DADOS DOS MEDIDORES E ENVIA PARA O SELECT NA PAGINA DE CADASTRO DE MEDIÇÕES

app.get("/Cadastrar-medicoes", function(req,res){
    if (req.session.loggedin) {
    connection.query("select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = ? order by medidor.id_medidor desc;",[req.session.usuario], function(erro,resultado){
        if(erro){
            res.status(200).send(erro)
        }
    const med = req.flash('med');
    const med_err = req.flash('med_err');
    res.render('cadastrar_vazoes',{cadastrar_vazoes : resultado,med:med,med_err:med_err})
    });
    }else{
        res.redirect('/Entrar');
    } 
});

// CRIA UMA PAGINA PARA ATUALIZAR A SENHA DE USUARIO

app.get("/Nova-senha", function(req,res){
    const senha_up = req.flash('senha_up');
    res.render('rec_senha',{senha_up});
}); 

app.post("/Nova-senha", function(req,res){
if(req.body.rec_rep === req.body.req_senha){
    connection.query("UPDATE usuario SET senha=? WHERE email=?;",[req.body.req_senha,req.body.req_email], function(err,result){
        if(err){
            req.flash('senha_up',"Erro ao tentar atualizar a senha, tente novamente!");
            res.redirect('/Nova-senha')
        }else{
        res.redirect('/Entrar')
        }
     });
}
else{
    req.flash('senha_up',"Senha e confirmação de senha não estão iguais!");
    res.redirect('/Nova-senha')
}
});

// ENVIA OS DADOS DO GRAFICO PARA A PAGINA DADOS_GRAFICO

app.post('/localizacao', function(req,res){
    if (req.session.loggedin) {

// CRIA UMA VARIAVEL COM O MEDIDOR ESCOLHIDO PELO USUARIO

        var estado_l;
        estado_l = req.body.estado_l;
        if (estado_l) {
            var longi_lat = [];

  // PESQUISA OS DADOS DO MEDIDOR ESCOLHIDO

  connection.query("select longitude, latitude from medidor where estado=?;",[estado_l], function(err,result){
    
// CRIA  VARIAVEIS COM AS VAZÕES MAIS RECENTES COM A DATA E A HORA DE CADA UMA

      var longitude = (result[0].longitude)
      var latitude = (result[0].latitude)
      longi_lat = [longitude,latitude]

// FUNÇÃO QUE IRÁ REDIRECIONAR POR UM JQUERY OS DADOS DE UM UNICO ARRAY E MANDAR PARA O GRAFICO 

  function dados_grafico(){

    var mapa;
    mapa = longi_lat;

    var grafico = [mapa];

    return grafico
}   

res.redirect('/Localizacao');

// PEGA OS DADOS DA FUNÇÃO E ENVIA PARA /DADOS_GRAFICO

    app.get('/dados_grafico', function(req,res){
    res.send(dados_grafico())
    });
});

}else{
    res.send('Medidor não tem nenhum dado');
} 
}else{
    res.redirect('/Entrar');
} 

});

// DESTROI A SESSÃO E REDIRECIONA PARA A PAGINA DE LOGIN

app.get('/Sair', function (req, res) {
    req.session.destroy();
    res.redirect('/Entrar');
  });


 /*
  io.on("connection", (socket) => {

socket.on('msg',(msg) => {
connection.query("SELECT * FROM  medidor_v;", function(erro,resultado){
    if(erro){
        console.log(erro)
    }else{ 
        msg = resultado;
        socket.emit('msg',msg); 
        console.log(msg);
    }
}); 
});

}); 
*/
io.on("connection", (socket) => {

    
    }); 

// PORTA QUE USAMOS LOCALMENTE E NO HEROKU

httpServer.listen(process.env.PORT, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// DESATIVA O CABEÇALHO  X-Powered-By

app.disable('x-powered-by');

// EXPORTA CONSTANTE APP

module.exports = app;