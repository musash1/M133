export class ToDo {
  #titel = "";
  #erledigt = "";

  constructor(titel, erledigt) {
    this.#titel = titel;
    this.#erledigt = erledigt;
  }

  get titel() {
    return this.#titel;
  }

  set titel(titel) {
    this.#titel = titel;
  }

  get erledigt() {
    return this.#erledigt;
  }

  set erledigt(erledigt) {
    this.#erledigt = erledigt;
  }

  element() {
    const listElement = document.createElement("li");
    const divElement = document.createElement("div");
    const checkboxElement = document.createElement("input");
    const spanElement = document.createElement("span");
    const buttonElement = document.createElement("button");

    listElement.appendChild(divElement);

    divElement.appendChild(checkboxElement);
    divElement.appendChild(spanElement);
    divElement.appendChild(buttonElement);

    checkboxElement.setAttribute("type", "checkbox");

    buttonElement.className = "loeschen";

    spanElement.innerText = this.#titel;
    buttonElement.innerText = "Löschen";

    if (this.#erledigt) {
      checkboxElement.setAttribute("checked", "checked");
      divElement.className = "erledigt";
    }

    return listElement;
  }
}
