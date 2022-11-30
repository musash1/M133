import { ToDo } from "./todo.js";

let todos = [];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById("todolist");

  // Liste leeren
  todoListElement.innerHTML = "";

  // ToDo's einfügen
  for (const todo of todos.sort((a, b) => a.titel.localeCompare(b.titel))) {
    const toDoListEntry = todo.element();
    todoListElement.appendChild(toDoListEntry);
  }

  // offene ToDo's
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById("anzahl");
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;

  // Im Local Storage speichern
  const todosObj = [];
  for (const todo of todos) {
    const todoObj = { titel: todo.titel, erledigt: todo.erledigt };
    todosObj.push(todoObj);
  }
  const todosJson = JSON.stringify(todosObj);
  localStorage.setItem("todos", todosJson);
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Aus Local Storage auslesen
  const savedTodos = JSON.parse(localStorage.getItem("todos"));

  if (savedTodos) {
    for (const savedToDo of savedTodos) {
      const todo = new ToDo(savedToDo.titel, savedToDo.erledigt);
      todo.addEventListener("loeschen", (e) => {
        const index = todos.indexOf(e.target);
        todos.splice(index, 1);
        updateToDoListOnScreen();
      });
      todos.push(todo);
    }
  }

  updateToDoListOnScreen();

  const neuesToDoElement = document.getElementById("neuesToDo");
  neuesToDoElement.addEventListener("keydown", (event) => {
    if (
      event.code === "Enter" &&
      neuesToDoElement.value.replace(/\s/g, "") !== ""
    ) {
      const todo = new ToDo(neuesToDoElement.value, false);
      todos.push(todo);
      todo.addEventListener("erledigt", (e) => {
        const index = todos.indexOf(e.target);
        todos[index].erledigt = !todos[index].erledigt;
        updateToDoListOnScreen();
      });

      neuesToDoElement.value = "";

      todo.addEventListener("loeschen", (e) => {
        const index = todos.indexOf(e.target);
        todos.splice(index, 1);
        updateToDoListOnScreen();
      });

      document
        .getElementById("aufraeumen")
        .addEventListener("click", (event) => {
          todos = todos.filter((obj) => !obj.erledigt);
          updateToDoListOnScreen();
        });

      updateToDoListOnScreen();
    }
  });
});
