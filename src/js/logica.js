import { ObtenerTareas, postTarea, marcarTareas, borrarTarea } from "./llamarservidor.js";
const taskInput = document.getElementById("tarea");



/////GET///////

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








// var postTareasResultado = await postTarea("Sacar al perro");

// console.log(" POST RESULTADO =", postTareasResultado)

// var misTareas = await ObtenerTareas();
// console.log(" Mis tareas ", misTareas)

// var resultadoMarcarTarea = await marcarTarea(true, "9864e7a6-8e95-403d-ad15-6ec8acbe305b")

// console.log(resultadoMarcarTarea)

// var resultadoEliminar = await borrarTarea("9864e7a6-8e95-403d-ad15-6ec8acbe305b")

// console.log("Eliminó", resultadoEliminar)




const addButton = document.getElementById("subir");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");



document.addEventListener("DOMContentLoaded", function () {
  crearTareasIniciales();
  console.log("Ya cargué la pagina");
  addButton.addEventListener("click", addTaskEvent);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask(taskInput.value);
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


var contadorTareasRealizadas = 0;

async function addTaskEvent(event) {
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
      //alert("Wiederholte Aufgabe");
      return;
    }

    var respuestaAgreagar = await postTarea (taskText)
    listaTareasGlobal = [ ... respuestaAgreagar]
    var ultimaTarea = respuestaAgreagar.pop()

    const idTarea = ultimaTarea.id;
    const checkTarea = ultimaTarea.check;

    console.log("Mi lista tareas", listaTareasGlobal)

    // postTarea(taskText)


    addTask(taskText, idTarea, checkTarea)
    
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
    checkbox.type = "checkbox";
    checkbox.id = idTarea
    checkbox.checked = checkTarea;
    checkbox.classList.add("checkbox");

    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;

    const deleteButton = document.createElement("span");
    deleteButton.textContent = " || BORRAR";

    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", ()=>{deleteTask (listItem, idTarea)})
    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();

    noTasksMessage.style.display = "none";
  } else {
    //alert("Text eingeben");
    return;
  }

  updateNoTasksMessage();
}

function deleteTask(taskItem,idTarea) {

  console.log("tarea",idTarea)
  const checkbox = taskItem.querySelector('.checkbox');
  const isChecked = checkbox.checked;
console.log("tareaaa")

 taskItem.remove();

  //ESTE ID ES QUEMADOSI ME ELIMINA NECESITO ENVIAR EL ID EN FORMA DE VARIABLE
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