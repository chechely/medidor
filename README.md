# <img align = "center" height="100px" width="100px"  alt = "Logo" src = "https://github.com/chechely/medidor/blob/Origin/src/img/Logo.png" />  Projeto 1: Protótipo de medidor inteligente

## Tem como objetivo desenvolver um medidor inteligente de baixo custo com site para um melhor gerenciamento de vazões. Um dos projetos do Instituto Federal de Alagoas campus Palmeira dos Índios  do programa  Oficinas 4.0 ofertado pelo Instituto Federal do Espírito Santos campus Vitória  

### :busts_in_silhouette: Grupo:

Professor orientador:

- Mahelvson

Desenvolvedores do prototipo:

- Emanuel
- Jessica
- Matheus
- Samuel
- Saulo

Desenvolvedores web:

- Michelle 
- Viviane 

### :iphone: Redes sociais do projeto:

- [Site](https://oficinas40.vitoria.ifes.edu.br/)

- [Instagram](https://www.instagram.com/oficinas4.0/)


## :computer: Recursos da aplicação

- Localização dos Medidores
- Monitoramento dos Medidores
- Adicionar Medidores
- Adicionar Medições
- Historico de medições

### Como utilizar os recursos da aplicação


#### :bust_in_silhouette:  Cadastrando-se na plataforma

![cadastro_SparkVideo](https://user-images.githubusercontent.com/72949904/141689299-37d5c874-e87e-479f-bd31-cb36a706df90.gif)

#### :droplet:  Cadastrando um medidor

Insira os dados para cadastro do medidor:

+ Codigo;
+ Nome;
+ Cidade:
+ Estado;
+ Longitude:
+ Latitude;

E clique em cadastrar.

![medidor_SparkVideo](https://user-images.githubusercontent.com/72949904/141690041-92dd0a0c-ad7d-4fc8-994f-38f076920f45.gif)

#### :watch:  Cadastrando uma medição

+ Selecione o código do medidor;
+ Digite a vazão;
+ Selecione a data;
+ Preencha o horário;

E clique em cadastrar.

![cad_med_SparkVideo](https://user-images.githubusercontent.com/72949904/141689228-7b98c0c9-96eb-4e25-881d-fe043dea80db.gif)

#### :chart_with_upwards_trend:  Visualizando o grafico de medições

Na tela de início selecione o medidor e clique em procurar.

![inicio_SparkVideo (1)](https://user-images.githubusercontent.com/72949904/141690223-78ed8507-a583-4e90-a4c0-92945b945a44.gif)

#### :card_file_box:  Visualizando Historico de medições
 
Insira o nome do medidor a data e clique em procurar.

![historico_SparkVideo](https://user-images.githubusercontent.com/72949904/141689419-c9c8ed46-063b-4fac-8b8b-c49d3638fbd4.gif)

#### :round_pushpin:  Visualizando o mapa (Ainda em construção)

Na tela de início ao selecionar o medidor e  clicar em procurar mostra no mapa.

![localizacao_SparkVideo](https://user-images.githubusercontent.com/72949904/141689509-22eb4951-fc15-48da-b7eb-b32d86c62b6c.gif)


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Mysql](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en/)
- [Ejs](https://ejs.co/)
- [Socket.io](https://socket.io/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Chartjs](https://www.chartjs.org/)

### Pré-requisitos para rodar a aplicação localmente

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


## 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/chechely/medidor>

# Acesse a pasta do projeto no terminal/cmd
$ cd medidor

# Utilize o comando para executar o servidor
$ node app.js

# Se tudo ocorrer com exito aparecerá no seu terminal/cmd a porta da qual o servidor está utilizando para rodar a aplicação
$ npm install

# O servidor inciará na porta indicada: 
#Exemplo: 3333 - acesse <http://localhost:3333>
```  