# EJERCICIO WEB: Aplicación To-Do List

Este proyecto es una aplicación web simple de lista de tareas pendientes (To-Do List) construida utilizando HTML, CSS, y JavaScript. La aplicación demuestra la implementación de la lógica y el uso de herramientas de desarrollo.

El proyecto sigue el flujo de trabajo **Gitflow** y utiliza **GitHub Actions** para automatizar la Integración Continua (CI).

---

## Funcionalidades Implementadas

* **Añadir Tarea:** Permite ingresar nuevas tareas.
* **Completar Tarea:** Al hacer clic en el texto de una tarea, se marca como completada (tachado).
* **Eliminar Tarea:** Botón para remover tareas permanentemente de la lista.

---

## Instalación y Ejecución Local

Para poner en marcha el proyecto y verificar la lógica localmente:

### 1. Clonar e Instalar Dependencias

Clona el repositorio y navega al directorio del proyecto. Luego instala las dependencias de Node.js (principalmente Jest) definidas en `package.json`:

```
git clone [https://www.youtube.com/watch?v=eQMcIGVc8N0](https://www.youtube.com/watch?v=eQMcIGVc8N0)
cd ejercicio-web
npm install
```

### 2. Ejecutar la Aplicación
Para ver la aplicación en el navegador, simplemente haz doble clic en el archivo src/index.html para abrirlo.

### 3. Ejecutar Pruebas Unitarias
Para verificar que la lógica de JavaScript funciona correctamente, utiliza el siguiente comando:

```
npm test
```

### Integración Continua (CI)
El proyecto utiliza GitHub Actions para automatizar las pruebas:

El workflow ci.yml se ejecuta automáticamente en cada push a las ramas feature/* y deploy.

El trabajo de CI consiste en instalar dependencias (npm install) y ejecutar las pruebas (npm test).
