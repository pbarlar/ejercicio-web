// tests/app.test.js

// --- 1. CONFIGURACIÓN DE ENTORNO (JSDOM - Debe ir PRIMERO) ---
// Importamos JSDOM para simular el navegador en el entorno de Node.js (CI)
const { JSDOM } = require('jsdom');

// Creamos la instancia JSDOM, simulando el DOM y localStorage
const dom = new JSDOM('<!doctype html><html><body><ul id="task-list"></ul></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage; // Aquí se crea el localStorage simulado
global.HTMLElement = dom.window.HTMLElement; 


// --- 2. CÓDIGO DE PRUEBAS ---
import { expect } from 'chai';

// Importamos las funciones DESPUÉS de configurar el entorno global
import { addTask, toggleTask, deleteTask } from '../src/app.js'; 


// Los tests en sí (usando la sintaxis de Mocha)
describe('To-Do List: Lógica CON Persistencia (Mocha/Chai)', () => {
    
    // Antes de cada prueba, limpiamos el localStorage simulado
    beforeEach(() => {
        localStorage.clear();
    });

    it('addTask debe añadir una nueva tarea y GUARDARLA en localStorage', () => {
        addTask('Comprar los ingredientes');
        
        // Verificamos que el cambio se refleje en localStorage
        const stored = JSON.parse(localStorage.getItem('tasks'));
        
        expect(stored).to.have.lengthOf(1);
        expect(stored[0].text).to.equal('Comprar los ingredientes');
        expect(stored[0].completed).to.be.false;
    });

    it('toggleTask debe cambiar el estado y actualizar localStorage', () => {
        // Preparamos el estado inicial (la función addTask se encarga de saveTasks)
        addTask('Tarea a completar');
        
        // Ejecución de la acción
        toggleTask(0); // Cambiamos el estado del primer (y único) elemento
        
        // Verificación del cambio en localStorage
        const stored = JSON.parse(localStorage.getItem('tasks'));

        expect(stored).to.have.lengthOf(1);
        expect(stored[0].completed).to.be.true;
    });

    it('deleteTask debe remover la tarea y actualizar localStorage', () => {
        addTask('Tarea 1');
        addTask('Tarea 2');
        
        // Ejecución de la acción
        deleteTask(0); // Eliminamos la primera tarea
        
        // Verificación del cambio en localStorage
        const stored = JSON.parse(localStorage.getItem('tasks'));

        expect(stored).to.have.lengthOf(1);
        expect(stored[0].text).to.equal('Tarea 2'); // Verifica que se eliminó la correcta
    });
    
    it('addTask no debe añadir tareas si el texto está vacío', () => {
        const success = addTask(' ');
        
        expect(success).to.be.false;
        expect(localStorage.getItem('tasks')).to.be.null; 
    });
});