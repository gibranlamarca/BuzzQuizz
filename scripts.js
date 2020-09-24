var perguntas=[];
var niveis=[];


var token = 0;
var button = document.querySelector("button");
var contadorPergunta =1;
var contadorNivel =1;





function enviaEmailSenha(){
    button.disabled="true";

    var email = document.querySelector("#email");
    var senha = document.querySelector("#senha");

    var dados = {email: email.value, password: senha.value};
    if(email.value !== "" && senha.value !== ""){
    var enviar = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",dados);
    enviar.then(escondeTela).catch(dadosIncorretos);
    }
    else{
        alert("Por favor, preencha os campos!");
        location.reload();
    }
}
function escondeTela(resposta){
    document.querySelector("#header-login").style.display="none";
    document.querySelector("#section-login").style.display="none";
    token = resposta.data.token;
}
function dadosIncorretos(){
    alert("Usuário de email ou senha incorreto!");
    location.reload();
}
/*PÁGINA 2*/

function carregaQuizzes(){

}
/*PÁGINA 3*/
function criaTitulo(){
    var inputTitulo = document.createElement("input")
    inputTitulo.classList.add("input-titulo");
    inputTitulo.placeholder="Digite o título do seu quizz";
    document.querySelector(".criacao-titulo").appendChild(inputTitulo);
}
criaTitulo();
function criaPerguntas(){
    var containerAzul = document.createElement("div")
    containerAzul.classList.add("container-azul");
    document.querySelector(".criacao-quizz").appendChild(containerAzul);

    var pergunta = document.createElement("p");
    pergunta.classList.add("titulo");
    pergunta.innerText="Pergunta "+contadorPergunta;
    containerAzul.appendChild(pergunta);

    var inputPergunta = document.createElement("input");
    inputPergunta.classList.add("box-branca");
    inputPergunta.placeholder="Digite a pergunta";
    containerAzul.appendChild(inputPergunta);

    var divGeral = document.createElement("div");
    divGeral.classList.add("geral");
    containerAzul.appendChild(divGeral);

    var divEsquerda = document.createElement("div");
    divEsquerda.classList.add("esquerda");
    divGeral.appendChild(divEsquerda);

    for(var i=0;i<4;i++){
        if(i==0){
        var input = document.createElement("input");
        input.classList.add("correta");
        input.setAttribute("id","questao"+i);
        input.placeholder="Digite a resposta correta";
        divEsquerda.appendChild(input);
        }
        else{
            var input = document.createElement("input");
            input.classList.add("errada");
            input.setAttribute("id","questao"+i);
            input.placeholder="Digite uma resposta errada "+i;
            divEsquerda.appendChild(input);
        }
    }

    var divDireita = document.createElement("div");
    divDireita.classList.add("direita");
    divGeral.appendChild(divDireita);

    for(var i=0;i<4;i++){
        if(i==0){
        var input = document.createElement("input");
        input.classList.add("correta");
        input.setAttribute("id","imagem"+i);
        input.placeholder="Link para a imagem correta";
        divDireita.appendChild(input);
        }
        else{
            var input = document.createElement("input");
            input.classList.add("errada");
            input.setAttribute("id","imagem"+i);
            input.placeholder="Link para a imagem errada "+i;
            divDireita.appendChild(input);
        }
    }

    var ionIcon = document.createElement("ion-icon");
    ionIcon.setAttribute("name","add-circle");
    ionIcon.setAttribute("onclick","limpaPergunta()");
    ionIcon.classList.add("icone-mais");
    document.querySelector(".criacao-quizz").appendChild(ionIcon);


}
criaPerguntas();

function criaNiveis(){
    var containerAzulNiveis = document.createElement("div");
    containerAzulNiveis.classList.add("container-azul");
    document.querySelector(".criacao-niveis").appendChild(containerAzulNiveis);

    var nivel = document.createElement("p");
    nivel.classList.add("titulo");
    nivel.innerText="Nível "+contadorNivel;
    containerAzulNiveis.appendChild(nivel);

     var divGeralNiveis = document.createElement("div");
     divGeralNiveis.classList.add("geral");
     containerAzulNiveis.appendChild(divGeralNiveis);

     var divEsquerdaNiveis = document.createElement("div");
     divEsquerdaNiveis.classList.add("esquerda");
     divGeralNiveis.appendChild(divEsquerdaNiveis);

     var inputAcertoMinimo = document.createElement("input");
     inputAcertoMinimo.classList.add("campo-porcentagem");
     inputAcertoMinimo.placeholder="% Mínima de Acerto do nível";
     divEsquerdaNiveis.appendChild(inputAcertoMinimo)

     var divDireitaNiveis = document.createElement("div");
     divDireitaNiveis.classList.add("direita");
     divGeralNiveis.appendChild(divDireitaNiveis);

     var inputAcertoMaximo = document.createElement("input");
     inputAcertoMaximo.classList.add("campo-porcentagem");
     inputAcertoMaximo.placeholder="% Máxima de Acerto do nível";
     inputAcertoMaximo.style.marginRight="0";
     inputAcertoMaximo.style.paddingRight="0";
     divDireitaNiveis.appendChild(inputAcertoMaximo);

     var divOrganizadora = document.createElement("div");
     containerAzulNiveis.appendChild(divOrganizadora);

     var inputTituloDoNivel = document.createElement("input");
     inputTituloDoNivel.classList.add("box-branca");
     inputTituloDoNivel.placeholder="Título do nível";
     divOrganizadora.appendChild(inputTituloDoNivel);

     var inputLinkDoNivel = document.createElement("input");
     inputLinkDoNivel.classList.add("box-branca");
     inputLinkDoNivel.placeholder="Link da imagem do nível";
     divOrganizadora.appendChild(inputLinkDoNivel);
    
     var textArea = document.createElement("textarea");
     textArea.name="descricao";
     textArea.setAttribute("id","descricao");
     textArea.cols="41";
     textArea.rows="2";
     textArea.classList.add("box-branca");
     textArea.classList.add("descricao");
     textArea.placeholder="Descrição do nível";
     containerAzulNiveis.appendChild(textArea);

     var ionIcon = document.createElement("ion-icon");
     ionIcon.setAttribute("name","add-circle");
     ionIcon.setAttribute("onclick","limpaNivel()");
     ionIcon.classList.add("icone-mais");
     document.querySelector(".criacao-niveis").appendChild(ionIcon);


}
criaNiveis();

function limpaPergunta(){
    var input = document.querySelectorAll(".criacao-quizz input");
    for(index=0;index<input.length;index++){
        input[index].value = "";
    }
    contadorPergunta++;
    document.querySelector(".titulo").innerText="Pergunta "+contadorPergunta;
}
function limpaNivel(){
    var input = document.querySelectorAll(".criacao-niveis input");
    for(index=0;index<input.length;index++){
        input[index].value = "";
    }
    contadorNivel++;
    document.querySelector(".criacao-niveis .titulo").innerText="Nível "+contadorNivel;
}

function selecionaPerguntas() {
    var tituloPergunta = document.querySelector(".box-branca").value;
    // tituloPergunta = verificaMaiuscula(tituloPergunta);
    // tituloPergunta = verificaEspaco(tituloPergunta);
    // correto = verificaInterrogacao(tituloPergunta);
    // if(!correto) {
    //     return;
    // }
    var resposta = "";
    var imagem = "";
    var arrayRespostas = [];
    var arrayImagens = [];
    for(var i = 0; i < 4; i++) {
        resposta = document.querySelector("#questao" + i).value;
        // resposta = verificaMaiuscula(resposta);
        // resposta = verificaEspaco(resposta);
        imagem = document.querySelector("#imagem" + i).value;
        // imagem = verificaEspaco(imagem);
        if(resposta === "" || imagem === "" || tituloPergunta === "") {
            alert("por favor preencha todos os campos");
            return false;
        }
        var testaImagem = imagem.slice(0, 5);
        if(testaImagem !== "https"){
            alert("Por favor, adicione um link válido nas imagens");
            return;
        }
        arrayRespostas.push(resposta);
        arrayImagens.push(imagem);
    }
    var pergunta = {"titulo": tituloPergunta, "respostas": arrayRespostas, "imagens": arrayImagens};
    perguntas.push(pergunta);
}

function selecionaNiveis() {
    // minimo = verificaEspaco(minimo);
    // minimo = parseInt(minimo);

    // maximo = verificaEspaco(maximo);
    // maximo = parseInt(maximo);
    var complementos = [];
    var input = document.querySelectorAll(".criacao-niveis input");
    for(index=0;index<input.length;index++){
        complemento=input[index].value;
        complementos.push(complemento);
    }

    var nivel = {"minAcerto": complementos[0], "maxAcerto": complementos[1], "titulo": complementos[2], "linkImagem": complementos[3], "descricao": complementos[4]};
    niveis.push(nivel);

    limpaNivel();
}
function selecionaTitulo(){
    var titulo = document.querySelector(".criacao-titulo input").value;
    return titulo;
}

function formataQuizz(){
    var titulo = selecionaTitulo();
    selecionaPerguntas();
    selecionaNiveis();
     var quizzFormatado = {
          "title": titulo,
          "data": {perguntas, niveis}
      };

      postaQuizz(quizzFormatado);
}

function postaQuizz(quizzFormatado){
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",quizzFormatado,{headers: {"User-Token": token}});
    requisicao.catch(verificaErro);
}

function verificaErro(erro){
    console.log(erro.response);
}
