const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const btnAddTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criandoLi(){
    const li = document.createElement('li');
    return li;
}

inputNovaTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputNovaTarefa.value) return;
        criaTarefa(inputNovaTarefa.value);
    }
});

function LimpaInput() {
    inputNovaTarefa.value = '';
    inputNovaTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += '';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'btn-botao-apagar');
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoDoInput) {
    const li = criandoLi();
    li.innerHTML = textoDoInput;
    tarefas.appendChild(li);
    LimpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnAddTarefa.addEventListener('click', function() {
    if (!inputNovaTarefa.value) return;
    criaTarefa(inputNovaTarefa.value);
});

document.addEventListener('click', function(e) {
    const element = e.target;
    if (element.classList.contains('btn-botao-apagar')) {
       element.parentElement.remove();
       salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        console.log(tarefaTexto);
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (const tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
        
    }
}
adicionaTarefasSalvas();