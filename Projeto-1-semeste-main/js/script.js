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

    window.location.href = 'professor_logado.html'
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
    window.location.href = 'professor_logado.html';
} 
else {
    alert('Senha incorreta.');
}

});

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