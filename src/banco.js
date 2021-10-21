// Chama a conexão com o mysql

const mysql = require ('mysql');

// Cria uma constante que indica o database e o usuario de dominio dele, junto com a senha

const connection = mysql.createConnection({
    host: 'bsxhgkaksohfxjkryiij-mysql.services.clever-cloud.com',
    user: 'uhsel6hckcsczsdo',
    password: 'rFYEjyUKSlOuLxpr20wk',
    database: 'bsxhgkaksohfxjkryiij'
});


// Inicia a conexão com o databese mostrando no terminal se foi bem sucedida ou não

connection.connect(function(err){
    if(err) console.error('Erro ao realizar a conexão com o banco de dados' + err.stack); return;

});

// Exporta a conexão com o banco

module.exports = connection
