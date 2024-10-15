const app = new TodoApp(); // Get the app's class from the library
function dom(query) { // Just do it faster 😁
  return document.querySelector(query);
}
var listscroll = dom(".listscroll");
var addbtn = dom("#addbtn");

addbtn.addEventListener('click', function(event) {
  event.preventDefault();
});

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
    taskItem.className = 'task' + (task.completed ? ' completed' : ''); // Add a class name to check if it's completed or not
    taskItem.type = "button"; // For material design
    taskItem.innerHTML = `
      <span slot="headline">${task.task}</span>
      <span slot="end">
            <md-icon-button onclick="markAsCompleted(${index})"> 
              <md-icon><i class="material-symbols-rounded">check</i></md-icon>
            </md-icon-button>
            <md-icon-button onclick="removeTask(${index})">
              <md-icon><i class="material-symbols-rounded">delete</i></md-icon>
            </md-icon-button>
      </span>
    `; // There are some material design elements, for better mobile experience.
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