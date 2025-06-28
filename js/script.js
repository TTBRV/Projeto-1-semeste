let nome_cadastro = document.getElementById('nome_cadastro')
let senha_cadastro = document.getElementById('senha_cadastro')
let email_cadastro = document.getElementById('email_cadastro')
let cadastrar = document.getElementById('cadastrar')
let email_login = document.getElementById('email_login')
let senha_login = document.getElementById('senha_login')
let logar = document.getElementById('logar')
let email_troca = document.getElementById('email_troca')
let senha_atual_troca = document.getElementById('senha_atual_troca')
let senha_nova_troca = document.getElementById('senha_nova_troca')
let trocar = document.getElementById('Trocar')
let senha_excluir = document.getElementById('senha_excluir')
let email_excluir = document.getElementById('email_excluir')
let excluir = document.getElementById('excluir');

class Cadastro{
    constructor(nome, senha, email){
        this.email=email;
        this.nome=nome;
        this.senha=senha;

    }
}

cadastrar.addEventListener('click',function(){
    // bglh lá pra ver se o cara escreveu certo
    if(nome_cadastro.value === '' || senha_cadastro.value === '' || email_cadastro.value === '') {
        alert('Por favor, preencha todos os campos.')
        return(null);
    } else if (!/\S+@\S+\.\S+/.test(email_cadastro.value)) {
        alert('Por favor, insira um email válido.')
        return(null);
    }

    for(i = 0; i < localStorage.length;i++){
        if(email_cadastro.value===localStorage.key(i)){
            window.alert('Email Já Cadastrado!')
            return(null);
        }
    }

    // salva os dados no localstorage e vai pra pagina professor_logado

    Usuario = new Cadastro(nome_cadastro.value,senha_cadastro.value,email_cadastro.value);
    localStorage.setItem(Usuario.email,Usuario.senha)

    if(document.body.id=='aluno'){
        window.location.href = 'aluno_logado.html'
    }
    else{
    window.location.href = 'professor_logado.html'}
    document.querySelector('.card-title').textContent = localStorage.getItem('nome')
})

// login do professro

logar.addEventListener('click', function(){
    let email = email_login.value;
    console.log(email);
    let senha = senha_login.value;
    console.log(senha);
    let dados = localStorage.getItem(email);

    if(dados === null){
    alert('Usuário não encontrado.');
    return;
    }

if(dados === senha){
    if(document.body.id=='aluno'){
        window.location.href = 'aluno_logado.html'
    }
    else{
    window.location.href = 'professor_logado.html'}
} 
else {
    alert('Senha incorreta.');
}

});


// trocar a senha
trocar.addEventListener('click',function(){
    let email = email_troca.value;
    let senha_atual = senha_atual_troca.value;
    let senha_nova = senha_nova_troca.value;
    if(localStorage.getItem(email) == senha_atual){
        localStorage.removeItem(email)
        localStorage.setItem(email,senha_nova);
    }
    else{
        alert('Insira a sua senha atual corretamente!')
        return(null);
    }
})

// excluir conta
excluir.addEventListener('click',function(){
    let email = email_excluir.value;
    let senha_atual = senha_excluir.value;
    if(localStorage.getItem(email) == senha_atual){
        localStorage.removeItem(email)
    }
    else{
        alert('Insira a sua senha atual corretamente!')
        return(null);
    }
})
