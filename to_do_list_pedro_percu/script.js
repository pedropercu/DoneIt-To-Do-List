// Variável global para armazenar o usuário atual
let currentUser = null;

// Função chamada ao carregar a página
window.onload = function () {
    const user = JSON.parse(localStorage.getItem('user'));

    // Se houver um usuário logado, mostrar a tela da To-Do List direto
    if (user) {
        currentUser = user;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('todo-screen').style.display = 'block';
        document.getElementById('titulo-todo').textContent = `To-Do List de ${currentUser.name}`;
        loadTasks();
    }
};

// Função para validar o e-mail
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Função para realizar o login e armazenar os dados no LocalStorage
function login() {
    const name = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email || !isValidEmail(email)) {
        alert('Por favor, insira um nome e um e-mail válidos!');
        return;
    }

    const user = { name, email };
    currentUser = user;

    // Salva o usuário atual no localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Mostra a tela da To-Do List e esconde a de login
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('todo-screen').style.display = 'block';

    // Exibe o nome do usuário no título
    document.getElementById('titulo-todo').textContent = `To-Do List de ${name}`;

    loadTasks();
}

// Função para carregar as tarefas do usuário atual
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasksByUser')) || {};
    const userKey = `${currentUser.name}_${currentUser.email}`;
    const tasks = saved[userKey] || [];

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            ${task.name}
            <button onclick="removeTask(${index})">Remover</button>
        `;
        taskList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskName = document.getElementById('nova-tarefa').value.trim();
    if (!taskName) {
        alert('Por favor, insira uma tarefa!');
        return;
    }

    const userKey = `${currentUser.name}_${currentUser.email}`;
    const saved = JSON.parse(localStorage.getItem('tasksByUser')) || {};
    const tasks = saved[userKey] || [];

    tasks.push({ name: taskName, completed: false });
    saved[userKey] = tasks;

    localStorage.setItem('tasksByUser', JSON.stringify(saved));

    document.getElementById('nova-tarefa').value = '';
    loadTasks();
}

// Função para alternar o status de conclusão de uma tarefa
function toggleTask(index) {
    const userKey = `${currentUser.name}_${currentUser.email}`;
    const saved = JSON.parse(localStorage.getItem('tasksByUser')) || {};
    const tasks = saved[userKey];

    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasksByUser', JSON.stringify(saved));
    loadTasks();
}

// Função para remover uma tarefa
function removeTask(index) {
    const userKey = `${currentUser.name}_${currentUser.email}`;
    const saved = JSON.parse(localStorage.getItem('tasksByUser')) || {};
    const tasks = saved[userKey];

    tasks.splice(index, 1);
    saved[userKey] = tasks;
    localStorage.setItem('tasksByUser', JSON.stringify(saved));
    loadTasks();
}

// Função para deslogar o usuário
function logout() {
    // Remove o usuário do localStorage
    localStorage.removeItem('user');

    // Esconde a tela da To-Do List e mostra a de login
    document.getElementById('todo-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';

    // Limpa a lista e reseta o usuário
    document.getElementById('task-list').innerHTML = '';
    currentUser = null;
}
