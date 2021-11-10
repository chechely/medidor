/* USA O BANCO DE DADOS PROTOTIPO */

use prototipo;

/* INSERE UM NOVO USUARIO COM NOME, USER, SOBRENOME, DATA DE NASCIMENTO, EMAIL, SENHA, TELEFONE, GENERO E CARGO */

insert into usuario(nome_usuario,nome,sobrenome,email,data_nasci,senha,tel,genero,cargo)
values('chechely','Michelle','Santos de Aquino','michellysantosdeaquino@gmail.com','28/01/2003','xuxu.2003','82999845105','feminino','Programadora');

/* INSERE UM NOVO MEDIDOR COM ID, NOME E LOCALIZAÇÃO */

insert into medidor(id_medidor,nome_medidor,longitude,latitude,cidade,estado,usuario_nome_usuario,coordenada)
values('2803','Medidor3','-73.968898','40.778848','Paulo Jacinto','Alagoas (AL)','chechely',ST_CoordenadaFromText('POINT(-36.631 -9.41618'));

/* INSERE UM NOVO MEDIDOR COM ID, NOME E LOCALIZAÇÃO */

insert into medidor(id_medidor,nome_medidor,longitude,latitude,cidade,estado,usuario_nome_usuario)
values('0128','Medidor2','-41.7763 ','-2.90393','Palmeira','Alagoas (AL)','chechely');

/* INSERE UMA NOVA VAZÃO AO MEDIDOR DE ID 0543 */

insert into medidor_v(vazao,datah,datat,id_medidor)
values(20,'15:15:00','02/08/2021','0543');

/* INSERE UMA NOVA VAZÃO AO MEDIDOR DE ID 0128 */

insert into medidor_v(vazao,datah,datat,id_medidor)
values(1999,'21:57:00','2021-10-20','543');

/* BUSCA NOME DO MEDIDOR, ID, LONGITUDE, LATITUDE, CIDADE E ESTADO */

select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado
from medidor
INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario
where usuario.nome_usuario = 'chechely'
order by medidor.id_medidor desc;

/* BUSCA A VAZÃO E O ID DA VAZÃO */

select  medidor_v.vazao, medidor_v.idmedidor_v 
from medidor, medidor_v 
where medidor_v.id_medidor = medidor.id_medidor;

/* BUSCA O NOME DE USUARIO, DO MEDIDOR, VAZÃO, DATA E HORA */

SELECT usuario.nome_usuario, medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat FROM ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor) where usuario.nome_usuario= 'chechely' and medidor.id_medidor = '0543' order by medidor_v.idmedidor_v desc ; 

SELECT usuario.nome_usuario, medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat FROM ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor)  order by medidor_v.idmedidor_v desc ;

/* BUSCA A VAZÃO, DATA E HORA DO MEDIDOR DE ID 0543 EM ORDEM DECRESCENTE */

select medidor.id_medidor,medidor.nome_medidor, medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v 
from medidor 
INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor
order by medidor_v.idmedidor_v desc;

select  medidor.nome_medidor,  medidor.id_medidor, medidor.longitude, medidor.latitude, medidor.cidade, medidor.estado from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario;

UPDATE medidor SET coordenada =-36.631 -9.41618 WHERE id_medidor=543 and coordenada is null;

select sum(vazao), id_medidor from medidor_v group by id_medidor;

select medidor.id_medidor, medidor.nome_medidor, medidor_v.vazao, medidor_v.datat from ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor)  where vazao=null or datat = '2021-10-20' and usuario.nome_usuario = 'chechely';

delete from medidor where longitude   and id_medidor = 543;

select  medidor.id_medidor, medidor.nome_medidor from usuario INNER JOIN medidor ON medidor.usuario_nome_usuario= usuario.nome_usuario where usuario.nome_usuario = 'chechely';

select medidor.nome_medidor,medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor where medidor.id_medidor = '0543' order by medidor_v.idmedidor_v desc limit 5;
select  usuario.nome_usuario,medidor.nome_medidor from medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario where usuario.nome_usuario = 'chechely' order by medidor.id_medidor desc;

select usuario.nome_usuario,medidor.id_medidor,medidor.nome_medidor, medidor_v.datat, medidor_v.idmedidor_v  from ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor) where usuario.nome_usuario= 'chechely' order by medidor_v.idmedidor_v desc;

select nome_usuario, nome, sobrenome, email, data_nasci, senha, tel, genero, foto, cargo from usuario where nome_usuario = "michelle";

select medidor.longitude, medidor.latitude,medidor_v.vazao,medidor_v.datah, medidor_v.datat, medidor_v.idmedidor_v from medidor INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor where medidor.nome_medidor = "Medidor1" order by medidor_v.idmedidor_v desc limit 5;

select count(*)
from medidor;

select count(medidor.id_medidor) from ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor);

select count(idmedidor_v) as total, avg(vazao) as media,count(vazao) as total_v from ((medidor INNER JOIN usuario ON medidor.usuario_nome_usuario = usuario.nome_usuario) INNER JOIN medidor_v ON medidor_v.id_medidor = medidor.id_medidor)  where  usuario.nome_usuario = 'chechely';