const app = new TodoApp(); // Get the app's class from the library
function dom(query) { // Just do it faster 😁
  return document.querySelector(query);
}
var listscroll = dom(".listscroll");
var addbtn = dom("#addbtn");

addbtn.addEventListener('click', function(event) {
  event.preventDefault();
});

document.getElementById('newTask').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
  }
});

// document.addEventListener('touchmove', function(event) {
//   event.preventDefault();
// }, { passive: false });

let listheight;
setTimeout(() => {
  listscroll.scrollTo({
    top: listscroll.scrollHeight,
    behavior: 'smooth'
  }); // Scroll to bottom after the page loads
}, 500);
  
function renderTasks() { // Function to show all the task
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  app.getTasks().forEach((task, index) => { // First get the tasks, then take task and their index as an argument
    const taskItem = document.createElement('md-list-item'); // Create one for every element
    taskItem.type = "button"; // For material design
    taskItem.innerHTML = `
      <span slot="headline" id="taskitem">${task.task}</span>
            <md-icon-button onclick="markAsCompleted(${index})" slot="start" id="completebtn"> 
              <md-icon><i class="material-symbols-rounded">check</i></md-icon>
            </md-icon-button>
            <md-icon-button onclick="removeTask(${index})" slot="end">
              <md-icon><i class="material-symbols-rounded">delete</i></md-icon>
              </md-icon-button>
              `; // There are some material design elements, for better mobile experience.

    taskItem.querySelector("span#taskitem").className = 'task' + (task.completed ? ' completed' : ''); // Add a class name to check if it's completed or not
    taskItem.querySelector("#completebtn").className = task.completed ? 'done' : '';
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const newTask = document.getElementById('newTask').value;
  if (newTask) { // Do it if the input is not empty
    app.addTask(newTask); // Add task with the function from the libray
    document.getElementById('newTask').value = '';
    renderTasks();
  }

setTimeout(() => {
    listscroll.scrollTo({
      top: listscroll.scrollHeight,
      behavior: 'smooth'
    });
}, 100); // Take a deley because it might take some time to update dom
}

document.querySelector("#newTask").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Handle keyboard event
      addTask()
    }
  });

function removeTask(index) {
    app.removeTask(index); // Remove function from library function
    renderTasks();
}

function markAsCompleted(index) {
  app.markAsCompleted(index);
  renderTasks();
}

renderTasks();