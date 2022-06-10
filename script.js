const inputTask = document.querySelector('[data-input-text]');
const saveTask = document.querySelector('[data-button]');
const containerTasks = document.querySelector('.container-tasks');

const checkInput = () => inputTask.value.trim().length > 0;

const newTask = () => {
    const inputIsValid = checkInput();

    if (!inputIsValid){
        return inputTask.classList.add('erro');
    }

    if(inputIsValid){
        inputTask.classList.remove('erro');
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p');
    taskContent.innerHTML = inputTask.value;
    taskContent.style.padding = '5px';

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteTask = document.createElement('i');
    deleteTask.classList.add('far');
    deleteTask.classList.add('fa-trash-alt');

    deleteTask.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    containerTasks.appendChild(taskItemContainer);

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteTask);

    inputTask.value = ''
    inputTask.focus();

    updateLocalStorage()
}

const handleClick = (taskContent) => {
    const tasks = containerTasks.childNodes;
  
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild === (taskContent);
  
      if (currentTaskIsBeingClicked) {
        task.firstChild.classList.toggle("completed");
      }
    }

    updateLocalStorage()
    };
  
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = containerTasks.childNodes;
  
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild === (taskContent);
  
      if (currentTaskIsBeingClicked) {
        taskItemContainer.remove();
      }
    }

    updateLocalStorage()
  };

const updateLocalStorage = () => {
    const tasks = containerTasks.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");//erro

        return { description: content.innerText, isCompleted };

        /*console.log({localStorageTasks});*/

        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
    })
  }

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if (!tasksFromLocalStorage) return; //tirar erro

    for (const task of tasksFromLocalStorage){
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerHTML = task.description
    taskContent.style.padding = '5px';

    if(task.isCompleted){
        taskContent.classList.add("completed");
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteTask = document.createElement('i');
    deleteTask.classList.add('far');
    deleteTask.classList.add('fa-trash-alt');

    deleteTask.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    containerTasks.appendChild(taskItemContainer);

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteTask);
    }
}

saveTask.addEventListener('click', newTask);