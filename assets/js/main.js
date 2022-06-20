const input = document.querySelector(".textInput");
const button = document.querySelector(".btnCreate");
const taskContainer = document.querySelector(".taskContainer");

function createTask(textInput) {
  const li = createLi();
  li.innerText = textInput;
  taskContainer.appendChild(li);
  cleanInput();
  createButtonErase(li);
  saveTask();
}

function createLi() {
  const li = document.createElement("li");
  return li;
}

function createButtonErase(li) {
  li.innerText += " ";
  const erase = document.createElement("button");
  erase.innerText = "apagar";
  erase.setAttribute("class", "apagar");
  li.appendChild(erase);
}

function cleanInput() {
  input.value = "";
  input.focus();
}

function saveTask() {
  const liTasks = document.querySelectorAll("li");
  const taskList = new Array();
  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("apagar", " ").trim();
    taskList.push(taskText);
  }
  const taskJson = JSON.stringify(taskList);
  localStorage.setItem("tasks", taskJson);
}

function addSavedTasks() {
  const tasks = localStorage.getItem("tasks");
  const tasksList = JSON.parse(tasks);

  console.log(tasksList);

  for (let task of tasksList) {
    createTask(task);
  }
}
addSavedTasks();
input.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) createTask(input.value), cleanInput();
});

button.addEventListener("click", function (e) {
  if (!input.value) return;
  createTask(input.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    saveTask();
  }
});
