import { ToDo } from "./todo.js";

let todos = [
  new ToDo("Zugticket kaufen", false),
  new ToDo("Wäsche waschen", true),
  new ToDo("Hausaufgaben machen", true),
];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById("todolist");
  const todoListInput = document.getElementById("neuesToDo");
  const loeschenButton = document.getElementsByClassName("loeschen");

  // Liste leeren
  todoListElement.innerHTML = "";

  // ToDo's einfügen
  for (const todo of todos) {
    const toDoListEntry = todo.element();
    todoListElement.appendChild(toDoListEntry);
  }

  // offene ToDo's
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById("anzahl");
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateToDoListOnScreen();
});

document.addEventListener("keypress", (event) => {
  let newTodo = document.getElementById("neuesToDo");
  if (event.key === "Enter" && newTodo.value != "") {
    todos.unshift(new ToDo(newTodo.value, false));
    updateToDoListOnScreen();
    newTodo.value = "";
  }
});

document.getElementById("aufraeumen").addEventListener("click", () => {
  let newTodos = [];
  for (const todo of todos) {
    if (!todo.erledigt) {
      newTodos.push(todo);
    }
  }
  todos = newTodos;
  updateToDoListOnScreen();
});

const list = document.querySelector("todolist");
// Add a click event listener to the list and its children
list.addEventListener("click", (event) => {
  console.log(event.target.type);
});
