// Primer arreglo de tareas 
let tasks = [
    { id: 16, description: "Hacer mercado", completed: false },
    { id: 60, description: "Estudiar para la prueba", completed: false },
    { id: 24, description: "Sacar a pasear a Tobby", completed: false }
];

// Elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Actualiza el resumen de tareas
function updateSummary() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

// Muestra las tareas en la tabla
function renderTasks () {
    taskList.innerHTML = ""; // Limpia la lista
    tasks.forEach(task => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = task.id;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;
        descriptionCell.className = task.completed ? "completed-task" : "";

        const completedCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));
        completedCell.appendChild(checkbox);

        const deleteCell = document.createElement("td");
        deleteCell.innerHTML = "❌";
        deleteCell.className = "delete-button";
        deleteCell.addEventListener("click", () => deleteTask(task.id));

        row.appendChild(idCell);
        row.appendChild(descriptionCell);
        row.appendChild(completedCell);
        row.appendChild(deleteCell);

        taskList.appendChild(row);
    });
    updateSummary();

}

// Agregar una nueva tarea
function addTask() {
    const description = taskInput.value.trim();
    if (description) {
        const newTask = {
            id: Math.floor(Math.random() * 100) + 1, // Genera un número entre 1 y 100
            description: description,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = ""; // Limpiar el input
        renderTasks();
    }
}

// Elimina una tarea
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Marca una tarea como completada o no completada
function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Event listenner para el botón de agregar tarea
addTaskButton.addEventListener("click", addTask);

// Muestra las tareas iniciales
renderTasks();

