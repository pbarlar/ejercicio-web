// Variable para almacenar todas las tareas (array de objetos)
let tasks = [];

/**
 * Carga las tareas de localStorage al inicio.
 */
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks(); // Dibuja las tareas en la interfaz
}

/**
 * Guarda el array 'tasks' en localStorage.
 */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Dibuja la lista de tareas en el elemento UL.
 */
export function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Limpia la lista existente

    tasks.forEach((task, index) => {
        // 1. Crear el elemento de la lista (li)
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // 2. Crear el texto de la tarea
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        // 3. Crear el botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '✖';
        
        // 4. Asignar Eventos
        taskText.addEventListener('click', () => toggleTask(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // 5. Ensamblar y añadir al DOM
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

/**
 * Añade una nueva tarea al array.
 * Se exporta para las pruebas unitarias.
 */
export function addTask(text) {
    if (text.trim() === '') return false;
    
    // Añadir el nuevo objeto de tarea
    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();
    return true;
}

/**
 * Cambia el estado 'completed' de una tarea.
 */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

/**
 * Elimina una tarea por su índice.
 */
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


// --- Inicialización y Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar tareas guardadas al iniciar
    loadTasks();
    
    // 2. Asignar evento al formulario de añadir
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el envío del formulario

        const text = taskInput.value;
        if (addTask(text)) {
            taskInput.value = ''; // Limpia el input si la tarea fue añadida
        }
    });
});