const inputTask = document.querySelector('.input-text');
const saveTask = document.querySelector('.button');
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
}

const handleClick = (taskContent) => {
    const tasks = containerTasks.childNodes;
  
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild === (taskContent);
  
      if (currentTaskIsBeingClicked) {
        task.firstChild.classList.toggle("completed");
      }
    }
    };
  
const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = containerTasks.childNodes;
  
    for (const task of tasks) {
      const currentTaskIsBeingClicked = task.firstChild === (taskContent);
  
      if (currentTaskIsBeingClicked) {
        taskItemContainer.remove();
      }
    }
  };

saveTask.addEventListener('click', newTask);