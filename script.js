let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let currentPage = 1;
const tasksPerPage = 4;

window.onload = function() {
    updatePagination();
    updateTaskCounter();
};

function updatePagination() {
    document.getElementById("Tasklist").innerHTML = "";
    const start = (currentPage - 1) * tasksPerPage;
    const paginatedTasks = tasks.slice(start, start + tasksPerPage);
    
    paginatedTasks.forEach(task => addTaskToUI(task.name, task.priority, task.completed));

    document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${Math.ceil(tasks.length / tasksPerPage) || 1}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
}

function nextPage() {
    if (currentPage * tasksPerPage < tasks.length) {
        currentPage++;
        updatePagination();
    }
}

function addTask() {
    const taskInput = document.getElementById("TaskName");
    const taskName = taskInput.value.trim();
    const priority = document.getElementById("Priority").value;
    if (taskName === "") {
        alert("Enter valid task name");
        taskInput.value="";
        return;
    }
    if (tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())) {
        alert("Task already exists");
        return;
    }
    tasks.push({ name: taskName, priority: priority, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    updatePagination();
    updateTaskCounter();
    taskInput.value = "";
}

function addTaskToUI(taskName, priority, isCompleted = false) {
    const taskList = document.getElementById("Tasklist");

    const listItem = document.createElement("li");

    const priorityMarker = document.createElement("div");
    priorityMarker.classList.add("priority");
    priorityMarker.style.backgroundColor = priority === "High" ? "#E74C3C" : priority === "Medium" ? "#F39C12" : "#27AE60";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = `${taskName} (${priority})`;
    if (isCompleted) taskSpan.classList.add("completed");
    taskSpan.onclick = () => updateTaskStatus(taskName, taskSpan);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = () => editTask(taskSpan, taskName);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => removeTask(taskName);

    listItem.append(priorityMarker, taskSpan, editButton, deleteButton);
    taskList.appendChild(listItem);
}

function updateTaskStatus(taskName, taskSpan) {
    tasks.forEach(task => {
        if (task.name === taskName) task.completed = !task.completed;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskSpan.classList.toggle("completed");
    updateTaskCounter();
}

function removeTask(taskName) {
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updatePagination();
    updateTaskCounter();
}

function editTask(taskSpan, oldTaskName) {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldTaskName;

    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") saveEditedTask(inputField, oldTaskName, inputField.value.trim());
        if (event.key === "Escape") inputField.replaceWith(taskSpan);
    });

    taskSpan.replaceWith(inputField);
    inputField.focus();
}

function saveEditedTask(inputField, oldTaskName, newTaskName) {
    if (!newTaskName) {
        alert("Task name cannot be empty");
        return;
    }
    if (tasks.some(task => task.name.toLowerCase() === newTaskName.toLowerCase() && task.name !== oldTaskName)) {
        alert("Task name already exists");
        inputField.replaceWith(taskSpan);
        return;
    }
    tasks.forEach(task => {
        if (task.name === oldTaskName) task.name = newTaskName;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    updatePagination();
    updateTaskCounter();
}

function updateTaskCounter() {
    const completed = tasks.filter(task => task.completed).length;
    const remaining = tasks.length - completed;
    document.querySelector(".count").textContent = `Completed: ${completed}/${remaining}`;
}
