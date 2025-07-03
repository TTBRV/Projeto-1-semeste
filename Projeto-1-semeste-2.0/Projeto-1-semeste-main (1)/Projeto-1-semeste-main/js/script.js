// Pegando elementos (se existirem)
let nome_cadastro = document.getElementById('nome_cadastro');
let senha_cadastro = document.getElementById('senha_cadastro');
let email_cadastro = document.getElementById('email_cadastro');
let cadastrar = document.getElementById('cadastrar');
let email_login = document.getElementById('email_login');
let senha_login = document.getElementById('senha_login');
let logar = document.getElementById('logar');
let email_troca = document.getElementById('email_troca');
let senha_atual_troca = document.getElementById('senha_atual_troca');
let senha_nova_troca = document.getElementById('senha_nova_troca');
let trocar = document.getElementById('Trocar');
let senha_excluir = document.getElementById('senha_excluir');
let email_excluir = document.getElementById('email_excluir');
let excluir = document.getElementById('excluir');
let tarefas = document.getElementById('tarefas')

// Classe de cadastro
class Cadastro {
  constructor(nome, senha, email) {
    this.email = email;
    this.nome = nome;
    this.senha = senha;
  }
}

// Cadastro
if (cadastrar) {
  cadastrar.addEventListener('click', function () {
    if (
      nome_cadastro.value === '' ||
      senha_cadastro.value === '' ||
      email_cadastro.value === ''
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email_cadastro.value)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    for (let i = 0; i < localStorage.length; i++) {
      if (email_cadastro.value === localStorage.key(i)) {
        alert('Email Já Cadastrado!');
        return;
      }
    }

    let Usuario = new Cadastro(
      nome_cadastro.value,
      senha_cadastro.value,
      email_cadastro.value
    );
    localStorage.setItem(Usuario.email, Usuario.senha);
    localStorage.setItem('nome', Usuario.nome);

    if (document.body.id === 'aluno') {
      window.location.href = 'aluno_logado.html';
    } else {
      window.location.href = 'professor_logado.html';
    }
  });
}

// Login
if (logar) {
  logar.addEventListener('click', function () {
    let email = email_login.value;
    let senha = senha_login.value;
    let dados = localStorage.getItem(email);

    if (dados === null) {
      alert('Usuário não encontrado.');
      return;
    }

    if (dados === senha) {
      if (document.body.id === 'aluno') {
        window.location.href = 'aluno_logado.html';
      } else {
        window.location.href = 'professor_logado.html';
      }
    } else {
      alert('Senha incorreta.');
    }
  });
}

// Trocar senha
if (trocar) {
  trocar.addEventListener('click', function () {
    let email = email_troca.value;
    let senha_atual = senha_atual_troca.value;
    let senha_nova = senha_nova_troca.value;

    if (localStorage.getItem(email) === senha_atual) {
      localStorage.setItem(email, senha_nova);
    } else {
      alert('Insira a sua senha atual corretamente!');
    }
  });
}

// Excluir conta
if (excluir) {
  excluir.addEventListener('click', function () {
    let email = email_excluir.value;
    let senha_atual = senha_excluir.value;

    if (localStorage.getItem(email) === senha_atual) {
      localStorage.removeItem(email);
    } else {
      alert('Insira a sua senha atual corretamente!');
    }
  });
}

// MÓ PREGUIÇA DE FAZER O NEGÓCIO AHHHHHHH

let c = localStorage.length //contador pra funcionar varios localStorage


document.querySelectorAll('form').forEach((form) =>
  form.addEventListener('submit', (e) => e.preventDefault())
);
const btnAdicionar = document.getElementById('btn-adicionar');
if (btnAdicionar) {
  btnAdicionar.addEventListener('click', function (event) {
    event.preventDefault(); // impede que o precoce atualize a página
    const novaTarefaInput = document.getElementById('nova-tarefa');
    const novaTarefa = novaTarefaInput.value.trim();

    if (novaTarefa) {
      //container da tarefa

      const divTarefa = document.createElement('div');
      divTarefa.classList.add('cards');

      //cria o texto da tarefa
      const spanTarefa = document.createElement('span'); // vi que esse span facilita o serviço
      spanTarefa.textContent = novaTarefa;
      divTarefa.appendChild(spanTarefa);
      const botao_concluir = document.createElement('button');
      botao_concluir.textContent = 'Concluir';
      divTarefa.appendChild(botao_concluir);
      const botao_excluir = document.createElement('button');
      botao_excluir.textContent = 'Excluir';
      divTarefa.appendChild(botao_excluir);



      // muda a cor pra verde e tira os botões
      botao_concluir.addEventListener('click', function () {
        divTarefa.style.backgroundColor = 'green';
        botao_concluir.style.display = 'none';
        botao_excluir.style.display = 'none';
        const spanConcluida = document.createElement('span');
        spanConcluida.textContent = ' - Atividade Concluída';
        divTarefa.appendChild(spanConcluida);
      })
      botao_excluir.addEventListener('click', function () {
        divTarefa.remove();
      });
      tarefas.appendChild(divTarefa);
      console.log(`divTarefa = ${divTarefa}`)
          console.log(`tipo da divTarefa ${typeof divTarefa}`)
      novaTarefaInput.value = '';
      localStorage.setItem(`${c}`,novaTarefa);
      c++;

    }

  });

}


document.body.onload = function(){
  for(i=0; i<localStorage.length; i++){

      let textoSalvo = localStorage.getItem(localStorage.key(i));
      const divTarefa = document.createElement('div');
      divTarefa.classList.add('cards');

      //cria o texto da tarefa
      const spanTarefa = document.createElement('span'); // vi que esse span facilita o serviço
      spanTarefa.textContent = textoSalvo;
      divTarefa.appendChild(spanTarefa);
      const botao_concluir = document.createElement('button');
      botao_concluir.textContent = 'Concluir';
      divTarefa.appendChild(botao_concluir);
      const botao_excluir = document.createElement('button');
      botao_excluir.textContent = 'Excluir';
      divTarefa.appendChild(botao_excluir);



      // muda a cor pra verde e tira os botões
      botao_concluir.addEventListener('click', function () {
        divTarefa.style.backgroundColor = 'green';
        botao_concluir.style.display = 'none';
        botao_excluir.style.display = 'none';
        const spanConcluida = document.createElement('span');
        spanConcluida.textContent = ' - Atividade Concluída';
        divTarefa.appendChild(spanConcluida);
      })
      botao_excluir.addEventListener('click', function () {
        divTarefa.remove();
      });
      tarefas.appendChild(divTarefa);
}
}