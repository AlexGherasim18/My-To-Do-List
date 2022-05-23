// Selectors
const taskInput = document.querySelector('#todo-Input');
const submitBtn = document.querySelector('.submit-btn');
const taskList = document.querySelector('#collection');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
submitBtn.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck);
taskList.addEventListener('click', updateCheck);

// Functions

// ADD ITEM TO LIST
function addTask (e) {
  // If nothing is typed in input show alert
  if (taskInput.value === "") {
    alert('Please add a task');
  } else {
  // Create list item
  const taskItem = document.createElement('li');
  taskItem.classList.add('item');

  // Add child elements to the list item
  taskItem.innerHTML = `<p class="item-text"></p>
  <a href="#" class="check-btn"><i class="fa-solid fa-check"></i></a>
  <a href="#" class="delete-btn"><i class="fa-solid fa-trash"></i></a>
  <a href="#" class="update-btn"><i class="fa-solid fa-pen"></i></a>`;

  // Add text to paragraph
  let itemText = taskItem.firstChild;
  itemText.textContent = taskInput.value;
  
  // Append list item to the UL
  taskList.appendChild(taskItem);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";
  }

  // Prevent form from submitting
  e.preventDefault();
}

// DELETE/CHECK ITEM FROM LIST
function deleteCheck(e) {
  const item = e.target;

  // Delete Item
  if (item.parentElement.classList.contains('delete-btn')) {
    // Set a var for the li
    const taskItem = item.parentElement.parentElement;
    // Animation
    taskItem.classList.add('fall');
     
    taskItem.addEventListener('transitionend', function() {
      // Remove the li
      taskItem.remove();
    });
    // Remove from LocalSTorage
    removeTaskFromLocalStorage(taskItem);
  } else if (item.classList.contains('delete-btn')) {
    // Set a var for the li
    const taskItem = item.parentElement;
    // Animation
    taskItem.classList.add('fall');
    
    taskItem.addEventListener('transitionend', function() {
      // Remove the li
      taskItem.remove();
    });
    // Remove from LocalSTorage
    removeTaskFromLocalStorage(taskItem);
  }

  // Check Item
  if(item.parentElement.classList.contains('check-btn')) {
    // Create a var for li
    const taskItem = item.parentElement.parentElement;
    // Give completed class to li
    taskItem.classList.toggle('completed');
  } else if (item.classList.contains('check-btn')) {
    // Create a var for
    const taskItem = item.parentElement;
    // Give completed class to li
    taskItem.classList.toggle('completed');
  }


  e.preventDefault();
}

// UPDATE ITEM FROM THE LIST
function updateCheck(e) {
  const item = e.target;
  // const taskItem = document.querySelector('.item');
  if(item.parentElement.classList.contains('update-btn')) {
    // Create a var for li
    const taskItem = item.parentElement.parentElement;
    if(!taskItem.classList.contains('completed')) {
      // Take the text from item to input
      taskInput.value = taskItem.firstChild.textContent;
      // Remove the item from list
      taskItem.remove();

      // Remove from LocalSTorage
      removeTaskFromLocalStorage(taskItem);
    }
  } else if (item.classList.contains('update-btn')) {
    // Create a var for li
    const taskItem = item.parentElement;
    if(!taskItem.classList.contains('completed')) {
      // Take the text from item to input
      taskInput.value = taskItem.firstChild.textContent;
      // Remove the item from list
      taskItem.remove();

      // Remove from LocalSTorage
      removeTaskFromLocalStorage(taskItem);
    }
  }
  
  e.preventDefault();
}


// Get Tasks from LocalStorage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create list item
    const taskItem = document.createElement('li');
    taskItem.classList.add('item');

    // Add child elements to the list item
    taskItem.innerHTML = `<p class="item-text"></p>
    <a href="#" class="check-btn"><i class="fa-solid fa-check"></i></a>
    <a href="#" class="delete-btn"><i class="fa-solid fa-trash"></i></a>
    <a href="#" class="update-btn"><i class="fa-solid fa-pen"></i></a>`;

    // Add text to paragraph
    let itemText = taskItem.firstChild;
    itemText.textContent = task;
    
    // Append list item to the UL
    taskList.appendChild(taskItem);
  })
}  

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.firstChild.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
