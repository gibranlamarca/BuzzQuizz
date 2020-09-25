var perguntas=[];
var niveis=[];
var idClicada=0;

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
    pagina2();
}
function dadosIncorretos(){
    alert("Usuário de email ou senha incorreto!");
    location.reload();
}
/*PÁGINA 2*/
function pagina2(){
    document.querySelector(".header-novo-quizz").style.display="flex";
    document.querySelector(".section-novo-quizz").style.display="flex";
    document.querySelector(".div-novo-quizz").style.display="initial";
    setTimeout(carregaQuizzes,1000);
}
function carregaQuizzes(){
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",{headers: {"User-Token": token}});
    console.log(requisicao);
    requisicao.then(criaIconeQuizz);
}
function criaIconeQuizz(dados){
    for(var i =0;i<dados.data.length;i++){
        var icone = document.createElement("div");
        icone.classList.add("div-novo-quizz-branco");
        icone.setAttribute("id",dados.data[i].id)
        icone.setAttribute("onclick","guardaId(this);carregaQuizz()");
        document.querySelector(".section-novo-quizz").appendChild(icone);

        var titulo = document.createElement("p");
        titulo.innerText=dados.data[i].title;
        icone.appendChild(titulo);
    }
}
function guardaId(objeto){
    idClicada = objeto.id;
}

/*PÁGINA 3*/
function pagina3(){
    document.querySelector(".section-novo-quizz").style.display="none";
    document.querySelector(".section-criacao-quizz").style.display="initial";
    criaTitulo();
    criaPerguntas();
    criaNiveis();
}
function pagina3pt2(){
    document.querySelector(".section-criacao-quizz").style.display="none";
    document.querySelector(".section-novo-quizz").style.display="flex";
    carregaQuizzes();
}
function criaTitulo(){
    var inputTitulo = document.createElement("input")
    inputTitulo.classList.add("input-titulo");
    inputTitulo.placeholder="Digite o título do seu quizz";
    document.querySelector(".criacao-titulo").appendChild(inputTitulo);
}
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
    ionIcon.setAttribute("onclick","selecionaPerguntas();limpaPergunta()");
    ionIcon.classList.add("icone-mais");
    document.querySelector(".criacao-quizz").appendChild(ionIcon);


}
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
     ionIcon.setAttribute("onclick","selecionaNiveis();limpaNivel()");
     ionIcon.classList.add("icone-mais");
     document.querySelector(".criacao-niveis").appendChild(ionIcon);


}
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
/*PÁGINA 4*/
function pagina4(){

}
function carregaQuizz(){
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",{headers: {"User-Token": token}});
    requisicao.then(renderizaQuizz);
}
function renderizaQuizz(requisicao){
    document.querySelector(".section-novo-quizz").style.display="none";

    var indiceClicado = 0;
    for(var i=0;i<requisicao.data.length;i++){
        if(requisicao.data[i].id==idClicada){
            indiceClicado=i;
        }
    }
    //vou criar uma função que da shuffle no perguntas
    // var quantasPerguntas = requisicao.data[indiceClicado].perguntas.length;
    // var valorTemporario
    //   for(var i=0;i<quantasPerguntas;i++){//roda as perguntas
    //     for(var j=0;j<4;j++){//roda as respostas
    //         var respostaSelecionada = requisicao.data[indiceClicado].data.perguntas.respostas[j];
    //         if(j==0){
    //             respostaSelecionada.setAttribute("id","correta");
    //             var sorteiaIndice = Math.floor(4*Math.random());
    //             valorTemporario = respostaSelecionada;
    //             respostaSelecionada = requisicao.data[indiceClicado].data.perguntas.respostas[sorteiaIndice];
    //             requisicao.data[indiceClicado].data.perguntas.respostas[sorteiaIndice] = valorTemporario;
    //         }
    //         else{
    //             var sorteiaIndice = Math.floor(4*Math.random());

    //         }
    //     }
    //   }
    quantasPerguntas = requisicao.data[indiceClicado].data.perguntas.length;
    var section = document.querySelector(".centralizar");
    for(var i=0;i<requisicao.data.length;i++){
        if(requisicao.data[i].id==idClicada){
            for(j=0;j<quantasPerguntas;j++){

            section.innerHTML= "<h1>"+requisicao.data[i].title+"</h1><div class='box-azul'><p>"+requisicao.data[i].data.perguntas[j].titulo+"</p></div><ul class='box-imagens'><li class='box-imagens-individual' onclick='limpaHTML();shameOnMe()'><figure><img src="+"'"+requisicao.data[i].data.perguntas[j].imagens[0]+"'"+" alt=''></figure><figcaption class='nome-da-imagem'><span>"+requisicao.data[i].data.perguntas[j].respostas[0]+"</span>"+"</li>"+"<li class='box-imagens-individual' onclick='limpaHTML();shameOnMe()'><figure><img src="+"'"+requisicao.data[i].data.perguntas[j].imagens[1]+"'"+" alt=''></figure><figcaption class='nome-da-imagem'><span>"+requisicao.data[i].data.perguntas[j].respostas[1]+"</span>"+"</li>"+"<li class='box-imagens-individual onclick='limpaHTML();shameOnMe()'><figure><img src="+"'"+requisicao.data[i].data.perguntas[j].imagens[2]+"'"+" alt=''></figure><figcaption class='nome-da-imagem'><span>"+requisicao.data[i].data.perguntas[j].respostas[2]+"</span>"+"</li>"+"<li class='box-imagens-individual' onclick='limpaHTML();shameOnMe()'><figure><img src="+"'"+requisicao.data[i].data.perguntas[j].imagens[3]+"'"+" alt=''></figure><figcaption class='nome-da-imagem'><span>"+requisicao.data[i].data.perguntas[j].respostas[3]+"</span>"+"</li>"+"</ul>";

            }
        }
    }
    //preciso criar uma função e por no onclick de todas essas caixas individuais que limpe o html e passe para a próxima pergunta
    //pensar na lógica para saber qual vai ser a resposta e a imagem correta. No momento ta sendo sempre o indice 0.
    //adicionar mais uma função onclick nos li's pra checar se é a correta
    //criar a página assim ocupou menos linhas, porém ficou muito menos legível, e provavelmente não vou conseguir dar shuffle
}
function limpaHTML(){
    if(j<=quantasPerguntas){
        //limpa o HTML da section .centralizar -> setar um timeOut para isso acontecer (pra dar pra ver se errou ou acertou)
        //faz j++
        //chama a renderizaQuizz de novo, agora com o j atualizado
    }
}
function shameOnMe(){
    document.querySelector(".centralizar").style.display="none";

    var titulo = document.createElement("h1");
    titulo.innerText="Pegadinha do malandro! Esse quizz não funciona. Shame on you Gibran";
    titulo.style.fontSize="35px";
    titulo.style.textAlign="center";
    titulo.style.fontWeight="bold";
    titulo.style.marginTop="30px";
    document.querySelector("body").appendChild(titulo);

    var imagem = document.createElement("img");
    imagem.setAttribute("src","https://pbs.twimg.com/media/CltmK7dXIAA6FCO.jpg");
    imagem.style.marginLeft="25%";
    document.querySelector("body").appendChild(imagem);
    
}
