var token = 0;
var button = document.querySelector("button");
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