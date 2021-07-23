function gerar() {
    var texto = "";
    var possibilidade = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      texto += possibilidade.charAt(Math.floor(Math.random() * possibilidade.length));
  
    return texto;
  }