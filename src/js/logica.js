import { ObtenerTareas, postTarea, marcarTareas, borrarTarea, buscarTareas} from "./llamarservidor.js";
const taskInput = document.getElementById("tarea");

import {updateNoTasksMessage} from "./add.js";



/////GET///////VER TAREAS

var listaTareasGlobal = [];

async function crearTareasIniciales() {

  listaTareasGlobal = await ObtenerTareas()

  console.log("Mi lista al iniciar la aplicación: ", listaTareasGlobal);

  for (let indiceTarea = 0; indiceTarea < listaTareasGlobal.length; indiceTarea++) {
    const tarea = listaTareasGlobal[indiceTarea];
    const textoTarea = tarea.task;
    //crear tarea es la función de cada uno

    console.log(listaTareasGlobal[0].id)
    addTask(textoTarea, tarea.id, tarea.check)
  // deleteTask(textoTarea,listaTareasGlobal.id)
  }
}


const addButton = document.getElementById("subir");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");


document.addEventListener("DOMContentLoaded", function () {
  crearTareasIniciales();
  console.log("Ya cargué la pagina");
  addButton.addEventListener("click", addTaskEvent);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTaskEvent(event);
    }
  });

  taskList.addEventListener("click", function (event) {
    // if (event.target.classList.contains("delete")) {
    //   deleteTask(event.target.parentElement);
    if (event.target.classList.contains("checkbox")) {
      completeTask(event.target);
    }
  });

  document.getElementById("contador").textContent = contadorTareasRealizadas;
});


var contadorTareasRealizadas = 0;

async function addTaskEvent(event) {
  console.log("buscar texto", )
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
console.log("Un texto que identificar")
    var respuestaAgreagar = await postTarea (taskText)
    listaTareasGlobal = [ ... respuestaAgreagar]
    var ultimaTarea = respuestaAgreagar.pop()

    const idTarea = ultimaTarea.id;
    const checkTarea = ultimaTarea.check;

    console.log("Mi lista tareas", idTarea)

    // postTarea(taskText)


    addTask(taskText, idTarea, checkTarea)
    
  }else {
    alert("Text eingeben");
    return;
  }
}

function addTask(taskText, idTarea, checkTarea) {

  if (taskText !== "") {
    const existingTasks = Array.from(taskList.getElementsByTagName("label"));
    const isTaskDuplicate = existingTasks.some(task => task.textContent.toLowerCase() === taskText);

    if (isTaskDuplicate) {
      // alert("Wiederholte Aufgabe");
      return;
    }

    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const color = document.createElement("input");

    color.id="colorC"

    color.setAttribute("type", "color")



    color.style.border="none"
    color.style.width="80px"
    color.style.height="40px"
    // color.style.marginLeft="40%"


    checkbox.type = "checkbox";
    checkbox.id = idTarea
    checkbox.checked = checkTarea;
    checkbox.classList.add("checkbox");

    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;
    if (checkTarea){
      contadorTareasRealizadas++;
      taskLabel.classList.add("completed")
      document.getElementById("contador").textContent = contadorTareasRealizadas;
    }
    const deleteButton = document.createElement("span");
    deleteButton.textContent = " || Löschen";

    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", ()=>{deleteTask (listItem, idTarea)})
    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(color);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();

    noTasksMessage.style.display = "none";
  }

  updateNoTasksMessage();
}

function deleteTask(taskItem,idTarea) {

  console.log("tarea",idTarea)
  const checkbox = taskItem.querySelector('.checkbox');
  const isChecked = checkbox.checked;
console.log("tareaaa")

  taskItem.remove();

  borrarTarea(idTarea)
 //llamar funcion de eliminar del servidor

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
  marcarTareas(checkbox.checked, checkbox.id)
  document.getElementById("contador").textContent = contadorTareasRealizadas;
}



var buscarBoton = document.getElementById("buscarTareaButton");
var inputBuscar = document.getElementById("buscarTarea");

buscarBoton.addEventListener("click", async function(evento){
  evento.preventDefault();
  taskList.innerHTML = "";
  contadorTareasRealizadas=0;

  listaTareasGlobal = await buscarTareas(inputBuscar.value)

  console.log("Mi lista al iniciar la aplicación: ", listaTareasGlobal);

  for (let indiceTarea = 0; indiceTarea < listaTareasGlobal.length; indiceTarea++) {
    const tarea = listaTareasGlobal[indiceTarea];
    const textoTarea = tarea.task;
    //crear tarea es la función de cada uno

    console.log(listaTareasGlobal[0].id)
    addTask(textoTarea, tarea.id, tarea.check)
  // deleteTask(textoTarea,listaTareasGlobal.id)
  }

})

crearTareasIniciales();