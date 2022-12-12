var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");// Campo.on do jQuery siginifica que quando vc clicar, vc faça alguma coisa 

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo); 
});

function atualizaTamanhoFrase() {
var frase = $(".frase").text()// Função para selecionarmos o mundo jQuery. Vamos pegar o elemento que tem a palavra frase no HTML. O text pega o elemento que está no texto e salva na variável. Text tambem pode ser usado para tag span
var numPalavras = frase.split(" ").length; // Split quebra a linha e length conta as palavras
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras); 
  
}
 
function inicializaContadores() {
    campo.on("input",function(){ // Colocar uma função e dentor dos parenteses falar o que ela vai fazer.
        var conteudo = campo.val() // O .val ele acessa o valor dos inputs do usuário, é muito utilizado pra vc pegar os valores de um input, de um formulário e também textarea
       
        var qtdPalavras = conteudo.split(/\5+/).length -1;// Expressão regular que busca por vários tipos de espaços vazios
        $("#contador-palavras").text(qtdPalavras);     
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres); 
    });   
}
  
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();// Acessa o conteudo com o .text com o jQuery
    campo.one("focus",function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
            clearInterval(cronometroID);
            finalizaJogo();
            }
        },1000);
    });     
}


function finalizaJogo(){
    campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text();
campo.on("input",function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
     }
}); 
}   

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody"); // O .find ele vai descendo a pagina do HTML em busca do que eu especificar nele
    var usuario = "Gabriel";
    var numPalavras = $("#contador-palavras").text();
   

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha)

    corpoTabela.prepend(linha); //Adiciona a linha da tabela no começo. append adiciona no final.  
}

function novaLinha(usuario,palavras){
   var linha = $("<tr>");
   var colunaUsuario = $("<td>").text(usuario);
   var colunaPalavras = $("<td>").text(palavras); 
   var colunaRemover = $("<td>");

   var link = $("<a>").addClass("botao-remover").attr("href","#");
   var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

   link.append(icone);

   colunaRemover.append(link);

   linha.append(colunaUsuario);
   linha.append(colunaPalavras);
   linha.append(colunaRemover); 

   return linha;
}

function removeLinha(){
     event.preventDefault();
    $(this).parent().parent().remove();  
} 
 // Função para navegar pelo pai


function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro(); 
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}