// tests/app.test.js

// Importamos Chai para las assertions (expect)
import chai from 'chai';
const expect = chai.expect;

// Importamos las funciones principales y las utilidades de testing
import { addTask, toggleTask, deleteTask, getTasks, resetTasks } from '../src/app.js'; 


// Los tests en sí (usando la sintaxis de Mocha)
describe('To-Do List: Lógica SIN Persistencia (Mocha/Chai)', () => {
    
    // Antes de cada prueba, limpiamos el array interno de tareas
    beforeEach(() => {
        resetTasks();
    });

    it('addTask debe añadir una nueva tarea al array interno', () => {
        addTask('Comprar el pan');
        
        const currentTasks = getTasks();
        
        expect(currentTasks).to.have.lengthOf(1);
        expect(currentTasks[0].text).to.equal('Comprar el pan');
        expect(currentTasks[0].completed).to.be.false;
    });

    it('toggleTask debe cambiar el estado del elemento en memoria', () => {
        // Preparamos el estado inicial
        addTask('Tarea a completar');
        
        // Ejecución de la acción
        toggleTask(0);
        
        // Verificación
        const currentTasks = getTasks();

        expect(currentTasks).to.have.lengthOf(1);
        expect(currentTasks[0].completed).to.be.true;
    });

    it('deleteTask debe remover la tarea del array interno', () => {
        addTask('Tarea 1');
        addTask('Tarea 2');
        
        // Ejecución de la acción
        deleteTask(0); // Eliminamos la primera tarea
        
        // Verificación
        const currentTasks = getTasks();

        expect(currentTasks).to.have.lengthOf(1);
        expect(currentTasks[0].text).to.equal('Tarea 2');
    });
    
    it('addTask no debe añadir tareas si el texto está vacío', () => {
        const success = addTask(' ');
        
        const currentTasks = getTasks();
        
        expect(success).to.be.false;
        expect(currentTasks).to.have.lengthOf(0); 
    });
});