

export function updateNoTasksMessage() {
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");

    if (taskList.children.length === 0) {
        noTasksMessage.style.display = "block";
    } else {
        noTasksMessage.style.display = "none";
    }
}

