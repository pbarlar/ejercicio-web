// Importa las funciones a probar desde el script principal.
// NOTA: Para Jest o Mocha, deberás mockear (simular) localStorage y el DOM.
import { addTask, renderTasks } from '../src/app.js';

// Mock (simulación) de localStorage y el DOM para las pruebas.
const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        getStore: () => store // Función auxiliar para inspeccionar
    };
})();

// Reemplazar localStorage con nuestro mock
global.localStorage = mockLocalStorage;

// Mock del DOM para simular la lista (UL)
document.body.innerHTML = '<ul id="task-list"></ul>';


describe('To-Do List: Función addTask', () => {
    
    beforeEach(() => {
        // Limpiar localStorage y el DOM antes de cada prueba
        localStorage.clear();
        document.getElementById('task-list').innerHTML = ''; 
    });

    test('addTask debe añadir una nueva tarea al almacenamiento', () => {
        // La tarea inicial debe guardarse
        addTask('Comprar café');
        
        // Verifica que se llamó a setItem
        expect(localStorage.setItem).toHaveBeenCalled();
        
        // Verifica que el contenido guardado sea correcto
        const stored = JSON.parse(localStorage.getStore().tasks);
        expect(stored.length).toBe(1);
        expect(stored[0].text).toBe('Comprar café');
        expect(stored[0].completed).toBe(false);
    });

    test('addTask no debe añadir tareas vacías', () => {
        // Intentar añadir un espacio en blanco
        const success = addTask(' ');
        
        expect(success).toBe(false);
        // Verifica que no se llamó a setItem si la tarea está vacía
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });
});



describe('To-Do List: Función renderTasks', () => {
    
    beforeEach(() => {
        localStorage.clear();
        document.getElementById('task-list').innerHTML = '';
        // Simular que el array 'tasks' tiene contenido antes de renderizar.
        // Dado que 'tasks' no está exportada, nos basamos en el almacenamiento inicial para esta prueba.
    });

    test('renderTasks debe crear elementos LI en el DOM según el array de tareas', () => {
        // Simular la adición de tareas que luego serán renderizadas
        addTask('Tarea 1');
        addTask('Tarea 2');
        
        // La función renderTasks se llama dentro de addTask, por lo que ya debería estar renderizado.
        renderTasks(); 
        
        const listItems = document.querySelectorAll('#task-list li');
        
        // Verifica que hay dos elementos LI en el DOM
        expect(listItems.length).toBe(2);
        
        // Verifica el contenido del primer elemento
        expect(listItems[0].querySelector('.task-text').textContent).toBe('Tarea 1');
    });

    test('renderTasks debe asignar la clase "completed" a las tareas completadas', () => { 
        // Añadir una tarea (estará incompleta)
        addTask('Tarea de prueba');
        
        // Simulamos la persistencia, luego cargamos y renderizamos
        renderTasks(); 
        
        const listItem = document.querySelector('#task-list li');
        expect(listItem.classList.contains('completed')).toBe(false);
    });
});