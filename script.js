const inputTask = document.querySelector('.input-text');
const saveTask = document.querySelector('.button');
const containerTasks = document.querySelector('.container-tasks');

const checkInput = () => inputTask.value.trim().length > 0;

const newTask = () => {
  const inputIsValid = checkInput();

  if(!inputIsValid){
    return inputTask.classList.add('erro');
  }

  const taskItemContainer = document.createElement('div');
  taskItemContainer.classList.add('task-item');

  const taskItemContent = document.createElement('p');
  taskItemContent.innerText = inputTask.value;

  taskItemContent.addEventListener('click', () => handleClick(taskItemContent));

  const deleteItem = document.createElement('i');
  deleteItem.classList.add('far');
  deleteItem.classList.add('fa-trash-alt');

  deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContent, taskItemContainer))

  taskItemContainer.appendChild(taskItemContent);
  taskItemContainer.appendChild(deleteItem);

  containerTasks.appendChild(taskItemContainer);

  inputTask.value = ''
  inputTask.focus();

  updateLocalStorage();
}

const handleInputChange = () => {
  const inputIsValid = checkInput();

  if(inputIsValid){
    return inputTask.classList.remove('erro');
  }
}

const handleClick = (taskItemContent) => {
  const tasks = containerTasks.childNodes;

  for (const task of tasks){
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemContent);

    if(currentTaskIsBeingClicked){
      task.firstChild.classList.toggle('taskFinalized');
    }
  }

  updateLocalStorage();
}

const handleDeleteClick = (taskItemContent, taskItemContainer) => {
  const tasks = containerTasks.childNodes;

  for (const task of tasks){
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemContent);

    if(currentTaskIsBeingClicked){
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
}

const updateLocalStorage = () => {
  const tasks = containerTasks.childNodes;

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild;
    const iscompleted = content.classList.contains('taskFinalized');

    return { description: content.innerText, iscompleted };
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
}

const refreshTaskUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if(!tasksFromLocalStorage) re.isSameNode

  for(const task of tasksFromLocalStorage){
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskItemContent = document.createElement('p');
    taskItemContent.innerText = task.description;

    if(task.isCompleted){
      taskItemContent.classList.add('taskFinalized')
    }

    taskItemContent.addEventListener('click', () => handleClick(taskItemContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContent, taskItemContainer)  )

    taskItemContainer.appendChild(taskItemContent);
    taskItemContainer.appendChild(deleteItem);

    containerTasks.appendChild(taskItemContainer);
    }
}

refreshTaskUsingLocalStorage();

saveTask.addEventListener('click', () => newTask()); 
inputTask.addEventListener('change', () => handleInputChange());