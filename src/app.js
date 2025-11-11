// Variable para almacenar todas las tareas (array de objetos)
let tasks = [];

/**
 * Carga las tareas de localStorage al inicio.
 */
function loadTasks() {
    // Solo procede si estamos en un entorno con localStorage
    if (typeof localStorage === 'undefined') return; 
    
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

/**
 * Guarda el array 'tasks' en localStorage.
 */
function saveTasks() {
    // Solo procede si estamos en un entorno con localStorage
    if (typeof localStorage === 'undefined') return;
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Dibuja la lista de tareas en el elemento UL.
 */
export function renderTasks() {
    // Solo procede si estamos en un entorno con DOM
    if (typeof document === 'undefined') return;
    
    const taskList = document.getElementById('task-list');
    if (!taskList) return; 
    
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '✖';
        
        // Asignar Eventos
        taskText.addEventListener('click', () => toggleTask(index));
        deleteBtn.addEventListener('click', () => deleteTask(index));

        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

/**
 * Añade una nueva tarea al array.
 * EXPORTADA para pruebas.
 */
export function addTask(text) {
    if (text.trim() === '') return false;
    
    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();
    return true;
}

/**
 * Cambia el estado 'completed' de una tarea.
 * EXPORTADA para pruebas.
 */
export function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

/**
 * Elimina una tarea por su índice.
 * EXPORTADA para pruebas.
 */
export function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


// --- Inicialización y Event Listeners (Lógica de arranque) ---
// Solo ejecuta esto en el navegador, no durante los tests de Node.js
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        loadTasks();
        
        const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');

        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault(); 

                const text = taskInput.value;
                if (addTask(text)) {
                    taskInput.value = '';
                }
            });
        }
    });
}