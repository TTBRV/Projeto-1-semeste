let nome_cadastro = document.getElementById('nome_cadastro')
let senha_cadastro = document.getElementById('senha_cadastro')
let email_cadastro = document.getElementById('email_cadastro')
let cadastrar = document.getElementById('cadastrar')

let email_login = document.getElementById('email_cadastro')
let senha_login = document.getElementById('senha_login')
let logar = document.getElementById('logar')

cadastrar.addEventListener('click',function(){
    // bglh lá pra ver se o cara escreveu certo
    if(nome_cadastro.value === '' || senha_cadastro.value === '' || email_cadastro.value === '') {
        alert('Por favor, preencha todos os campos.')
    } else if (!/\S+@\S+\.\S+/.test(email_cadastro.value)) {
        alert('Por favor, insira um email válido.')
    }

    // salva os dados no localstorage e vai pra pagina professor_logado
    localStorage.setItem('nome', nome_cadastro.value)
    localStorage.setItem('senha', senha_cadastro.value)
    localStorage.setItem('email', email_cadastro.value)
    window.location.href = 'professor_logado.html'
    document.querySelector('.card-title').textContent = localStorage.getItem('nome') // nn foi, sla pq, to com sono ja kkkkk