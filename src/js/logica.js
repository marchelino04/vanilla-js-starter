import { ObtenerTareas, postTarea, marcarTarea, borrarTarea } from "./llamarservidor.js";
const taskInput = document.getElementById("tarea");


var listaTareasGlobal = [];

async function crearTareasIniciales() {

  listaTareasGlobal = await ObtenerTareas()
  console.log("Mi lista al iniciar la aplicación: ", listaTareasGlobal);

  for (let indiceTarea = 0; indiceTarea < listaTareasGlobal.length; indiceTarea++) {
    const tarea = listaTareasGlobal[indiceTarea];
    const textoTarea = tarea.task;
    //crear tarea es la función de cada uno
    addTask(textoTarea)
  }
}



// var postTareasResultado = await postTarea("Sacar al perro");

// console.log(" POST RESULTADO =", postTareasResultado)

// var misTareas = await ObtenerTareas();
// console.log(" Mis tareas ", misTareas)

//var resultadoMarcarTarea = await marcarTarea(true, "9864e7a6-8e95-403d-ad15-6ec8acbe305b")

// console.log(resultadoMarcarTarea)

// var resultadoEliminar = await borrarTarea("9864e7a6-8e95-403d-ad15-6ec8acbe305b")

// console.log("Eliminó", resultadoEliminar)




const addButton = document.getElementById("subir");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");



document.addEventListener("DOMContentLoaded", function () {
  crearTareasIniciales();
  let contadorTareasRealizadas = 0;
  console.log("Ya cargué la pagina");
  addButton.addEventListener("click", addTaskEvent);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      deleteTask(event.target.parentElement);
    } else if (event.target.classList.contains("checkbox")) {
      completeTask(event.target);
    }
  });

  document.getElementById("contador").textContent = contadorTareasRealizadas;
});




function addTaskEvent(event) {
  event.preventDefault()

  const taskText = taskInput.value.trim().toLowerCase();

  console.log(taskInput.value);

  if (taskText.length > 0) {
    console.log(taskText)
    const existingTasks = Array.from(taskList.getElementsByTagName("label"));
    const isTaskDuplicate = existingTasks.some(task => task.textContent.toLowerCase() === taskText);
    console.log("Is this task duplicated", isTaskDuplicate)
    if (isTaskDuplicate) {
      console.log(isTaskDuplicate)
      alert("Wiederholte Aufgabe");
      return;
    }
    postTarea(taskText)
    addTask(taskText)

  }
}

function addTask(taskText) {

  if (taskText !== "") {
    const existingTasks = Array.from(taskList.getElementsByTagName("label"));
    const isTaskDuplicate = existingTasks.some(task => task.textContent.toLowerCase() === taskText);

    if (isTaskDuplicate) {
      alert("Wiederholte Aufgabe");
      return;
    }

    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;

    const deleteButton = document.createElement("span");
    deleteButton.textContent = " || Löschen";
    deleteButton.classList.add("delete");

    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();

    noTasksMessage.style.display = "none";
  } else {
    alert("Text eingeben");
    return;
  }

  updateNoTasksMessage();
}

function deleteTask(taskItem) {
  const checkbox = taskItem.querySelector('.checkbox');
  const isChecked = checkbox.checked;

  taskItem.remove();

  if (isChecked) {
    contadorTareasRealizadas--;
    document.getElementById("contador").textContent = contadorTareasRealizadas;
  }

  updateNoTasksMessage();
}

function completeTask(checkbox) {
  const taskLabel = checkbox.nextElementSibling;

  if (checkbox.checked) {
    taskLabel.classList.add("completed");
    contadorTareasRealizadas++;
  } else {
    taskLabel.classList.remove("completed");
    contadorTareasRealizadas--;
  }

  document.getElementById("contador").textContent = contadorTareasRealizadas;
}

function updateNoTasksMessage() {
  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "block";
  } else {
    noTasksMessage.style.display = "none";
  }
}



crearTareasIniciales();