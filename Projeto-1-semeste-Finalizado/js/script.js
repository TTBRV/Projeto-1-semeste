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
let tarefas = document.getElementById('tarefas');
let btnAdicionar = document.getElementById('btnAdicionar');
let novaTarefaInput = document.getElementById('novaTarefaInput');
const btnFiltrarPendentes = document.getElementById('filtrarPendentes');
const btnFiltrarConcluidas = document.getElementById('filtrarConcluidas');
const btnLimparFiltro = document.getElementById('limparFiltro');

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

// contador pra salvar as tarefas no localStorage
let c = localStorage.getItem('contadorTarefas') 
        ? parseInt(localStorage.getItem('contadorTarefas')) 
        : 0;

// função que renderiza cada tarefa e manipula evento de concluir e excluir
function renderizarTarefa(obj, chave) {
  const divTarefa = document.createElement('div');
  divTarefa.classList.add('cards');

  const spanTarefa = document.createElement('span');
  spanTarefa.textContent = obj.texto;
  divTarefa.appendChild(spanTarefa);

  if (obj.concluida) {
    divTarefa.style.backgroundColor = 'green';
    const spanConcluida = document.createElement('span');
    spanConcluida.textContent = ' - Atividade Concluída';
    divTarefa.appendChild(spanConcluida);
  } else {
    const botao_concluir = document.createElement('button');
    botao_concluir.textContent = 'Concluir';
    botao_concluir.addEventListener('click', function () {
      obj.concluida = true;
      localStorage.setItem(chave, JSON.stringify(obj));
      location.reload(); // atualiza a página para refletir alteração
    });
    divTarefa.appendChild(botao_concluir);
  }

  const botao_excluir = document.createElement('button');
  botao_excluir.textContent = 'Excluir';
  botao_excluir.addEventListener('click', function () {
    localStorage.removeItem(chave);
    divTarefa.remove();
  });
  divTarefa.appendChild(botao_excluir);

  tarefas.appendChild(divTarefa);
}

if (btnAdicionar) {
  btnAdicionar.addEventListener('click', function (event) {
    event.preventDefault();
    const novaTarefa = novaTarefaInput.value.trim();

    if (novaTarefa) {
      const tarefaObj = {
        texto: novaTarefa,
        concluida: false
      };
      let chave = `tarefa_${c}`;
      localStorage.setItem(chave, JSON.stringify(tarefaObj));
      localStorage.setItem('contadorTarefas', c + 1); // atualiza o contador
      renderizarTarefa(tarefaObj, chave);
      c++;
      novaTarefaInput.value = '';
    }
  });
}

// carrega as tarefas ao abrir a página
window.addEventListener('load', function () {
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave.startsWith('tarefa_')) {
      let obj = JSON.parse(localStorage.getItem(chave));
      renderizarTarefa(obj, chave);
    }
  }
});
// filtra por tarefas concluidas ou pendentes
function filtragem() {
  while (tarefas.firstChild) {
    tarefas.removeChild(tarefas.firstChild);
  }
}

// filtra só as tarefas que não estão concluídas
if (btnFiltrarPendentes) {
  btnFiltrarPendentes.addEventListener('click', function () {
    filtragem();
    for (let i = 0; i < localStorage.length; i++) {
      let chave = localStorage.key(i);
      if (chave.startsWith('tarefa_')) {
        let obj = JSON.parse(localStorage.getItem(chave));
        if (!obj.concluida) {
          renderizarTarefa(obj, chave);
        }
      }
    }
  });
}

// filtra só as tarefas que estão concluídas
if (btnFiltrarConcluidas) {
  btnFiltrarConcluidas.addEventListener('click', function () {
    filtragem();
    for (let i = 0; i < localStorage.length; i++) {
      let chave = localStorage.key(i);
      if (chave.startsWith('tarefa_')) {
        let obj = JSON.parse(localStorage.getItem(chave));
        if (obj.concluida) {
          renderizarTarefa(obj, chave);
        }
      }
    }
  });
}

if (btnLimparFiltro) {
  btnLimparFiltro.addEventListener('click', function () {
    filtragem();
    for (let i = 0; i < localStorage.length; i++) {
      let chave = localStorage.key(i);
      if (chave.startsWith('tarefa_')) {
        let obj = JSON.parse(localStorage.getItem(chave));
        renderizarTarefa(obj, chave);
      }
    }
  });
}