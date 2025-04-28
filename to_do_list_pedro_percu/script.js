// Função para realizar o login e armazenar os dados no LocalStorage
function login() {
    const name = document.getElementById('nome').value;  // Obtém o nome do usuário
    const email = document.getElementById('email').value;  // Obtém o e-mail do usuário

    // Verifica se os campos nome e e-mail estão preenchidos
    if (!name || !email) {
        alert('Por favor, preencha todos os campos!');  // Exibe um alerta caso algum campo esteja vazio
        return;
    }

    // Armazena os dados de nome e e-mail no LocalStorage como um objeto JSON
    localStorage.setItem('user', JSON.stringify({ name, email }));

    // Esconde a tela de login e mostra a tela da To-Do List
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('todo-screen').style.display = 'block';
    
    loadTasks();  // Carrega as tarefas do LocalStorage
}

// Função para carregar as tarefas armazenadas no LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Obtém as tarefas do LocalStorage (se houver)
    const taskList = document.getElementById('task-list');  // Obtém o elemento da lista de tarefas
    taskList.innerHTML = '';  // Limpa a lista de tarefas antes de carregar as novas

    // Loop para criar e exibir cada tarefa
    tasks.forEach((task, index) => {
        const li = document.createElement('li');  // Cria um novo item de lista (li)
        li.innerHTML = `
            <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? 'checked' : ''}>  <!-- Checkbox para marcar como concluída -->
            ${task.name}  <!-- Nome da tarefa -->
            <button onclick="removeTask(${index})">Remover</button>  <!-- Botão para remover a tarefa -->
        `;
        taskList.appendChild(li);  // Adiciona o item na lista
    });
}

// Função para adicionar uma nova tarefa à lista
function addTask() {
    const taskName = document.getElementById('nova-tarefa').value;  // Obtém o nome da nova tarefa

    // Verifica se o campo da tarefa não está vazio
    if (!taskName) {
        alert('Por favor, insira uma tarefa!');  // Exibe um alerta caso o campo esteja vazio
        return;
    }

    // Obtém as tarefas existentes no LocalStorage ou cria um array vazio se não houver tarefas
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Adiciona a nova tarefa ao array de tarefas
    tasks.push({ name: taskName, completed: false });

    // Armazena as tarefas atualizadas no LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();  // Recarrega a lista de tarefas
    document.getElementById('nova-tarefa').value = '';  // Limpa o campo de input
}

// Função para alternar o status de conclusão de uma tarefa (marcar/desmarcar)
function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));  // Obtém as tarefas do LocalStorage
    tasks[index].completed = !tasks[index].completed;  // Altera o status de 'completed' da tarefa
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Atualiza as tarefas no LocalStorage
    loadTasks();  // Recarrega a lista de tarefas
}

// Função para remover uma tarefa da lista
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));  // Obtém as tarefas do LocalStorage
    tasks.splice(index, 1);  // Remove a tarefa do array usando o índice
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Atualiza as tarefas no LocalStorage
    loadTasks();  // Recarrega a lista de tarefas
}
