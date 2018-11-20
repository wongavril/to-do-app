function onReady() {
  let toDos = getToDosFromLocalStorage();
  const addToDoForm = document.getElementById('addToDoForm');
  let id = 0;

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++;

    newToDoText.value = '';

    renderTheUI();
  }

  function deleteToDo(id) {
    return toDos.filter(toDo => toDo.id !== id);
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.addEventListener('click', event => {
        toDos[toDo.id].complete = !toDos[toDo.id].complete;
        saveToLocalStorage();
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete!";
      deleteButton.className = "delete_button mdl-button mdl-js-button mdl-button--raised mdl-button--accent";

      deleteButton.addEventListener('click', event => {
        toDos = deleteToDo(toDo.id);
        saveToLocalStorage();
        renderTheUI();
      });

      const toDoText = document.createElement('div');
      toDoText.textContent = toDo.title;
      toDoText.className = 'toDoItem-text mdl-list__item-primary-content';

      newLi.className = "toDoItem mdl-list__item";

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(toDoText);
      newLi.appendChild(deleteButton);
    });

  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
    saveToLocalStorage();
  });

  renderTheUI();

  function saveToLocalStorage() {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }

  function getToDosFromLocalStorage() {
    if (localStorage.getItem('toDos') !== null) {
      return JSON.parse(localStorage.getItem('toDos'));
    } else {
      return [];
    }
  }
}



window.onload = function() {
  onReady();
};
