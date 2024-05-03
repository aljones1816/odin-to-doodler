import { logicController } from "./logicController";
import { toDo } from "./toDo";
import { group } from "./group";

const logicControl = logicController();

export function displayController() {
  function renderTodoListItem(todo) {
    const todoListItem = document.createElement("div");
    todoListItem.id = `todo-${todo.getId()}`;
    todoListItem.className = "todo-list__item";

    const todoListCheckbox = document.createElement("input");
    todoListCheckbox.type = "checkbox";
    todoListCheckbox.id = `todo${todo.getId()}`;

    const todoListLabel = document.createElement("label");
    todoListLabel.htmlFor = `todo${todo.getId()}`;
    todoListLabel.appendChild(document.createTextNode(`${todo.getTitle()}`));

    const todoListGroup = document.createElement("span");
    todoListGroup.className = "todo-list__group";
    todoListGroup.appendChild(document.createTextNode(`${todo.getGroup()}`));

    const todoListExpandBtn = document.createElement("button");
    todoListExpandBtn.type = "button";
    todoListExpandBtn.className = "todo-list__expand-btn";
    todoListExpandBtn.textContent = "⮟";
    todoListExpandBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (toDoListDetail.style.display === "none") {
        toDoListDetail.style.display = "";
    } else {
        toDoListDetail.style.display = "none";
    }
      
    });

    const toDoListDetail = document.createElement("div");
    toDoListDetail.className = "todo-list__details";
    toDoListDetail.style.display="none"

    const description = document.createElement("p");
    description.className = "todo-list__description";
    description.textContent = `${todo.getDescription()}`;

    const dueDate = document.createElement("p");
    dueDate.className = "todo-list__due-date";
    dueDate.textContent = `${todo.getDueDate()}`;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "todo-list__edit-btn";
    editButton.textContent = "Edit";

    toDoListDetail.appendChild(description);
    toDoListDetail.appendChild(dueDate);
    toDoListDetail.appendChild(editButton);

    todoListItem.appendChild(todoListCheckbox);
    todoListItem.appendChild(todoListLabel);
    todoListItem.appendChild(todoListGroup);
    todoListItem.appendChild(todoListExpandBtn);
    todoListItem.appendChild(toDoListDetail);
    

    return todoListItem;
  }



  function renderToDosList(group = "") {
    let todosList = document.getElementById("todo-list");

    // clear existing content
    todosList.innerHTML = "";

    // create title element
    const todoListTitle = document.createElement("h2");
    todoListTitle.className = "todo-list__title";
    todoListTitle.appendChild(document.createTextNode(`All Items`));

    todosList.appendChild(todoListTitle);

    // append each todo item
    const todos = logicControl.getToDos(group);
    todos.forEach((todo) => {
      const todoListItem = renderTodoListItem(todo);
      todosList.appendChild(todoListItem);
    });

    // append footer component
    const todoListFooter = document.createElement("div");
    todoListFooter.className = "todo-list__footer";

    const todoListInput = document.createElement("input");
    todoListInput.className = "todo-list__input";
    todoListInput.type = "text";
    todoListInput.placeholder = "Add new todo";

    const todoListButton = document.createElement("button");
    todoListButton.className = "todo-list__button";
    todoListButton.type = "button";
    todoListButton.textContent = "Add";
    todoListButton.addEventListener("click", (e) => {
      e.preventDefault;
      const todoListInputValue = todoListInput.value;
      if (todoListInputValue) {
        const newToDoId = logicControl.getToDos().length;
        const newToDo = toDo(newToDoId, todoListInputValue);

        logicControl.setToDo(newToDo);
        renderToDosList();
      }
    });

    todoListFooter.appendChild(todoListInput);
    todoListFooter.appendChild(todoListButton);

    todosList.appendChild(todoListFooter);
  }

  function renderMenuItem(group) {
    const groupName = group.getGroupName();
    const menuListItem = document.createElement("li");
    menuListItem.className = "menu__item";
    menuListItem.appendChild(document.createTextNode(groupName));
    menuListItem.addEventListener("click", (e) => {
      e.preventDefault();
      renderToDosList(groupName);
    });

    return menuListItem;
  }

  function renderMenu() {
    const allItemsGroup = group("All Items");

    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    const menuList = document.createElement("ul");
    menuList.id = "menu__list";
    menuList.className = "menu__list";

    const allItems = renderMenuItem(allItemsGroup);
    menuList.appendChild(allItems);
    const groups = logicControl.getGroups();
    groups.forEach((group) => {
      const menuListItem = renderMenuItem(group);
      menuList.appendChild(menuListItem);
    });

    menu.appendChild(menuList);

    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.id = "menu__button";
    menuButton.className = "menu__button";
    menuButton.textContent = "New Group";
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      menuButton.insertAdjacentElement("beforebegin", renderAddMenuItemInput());
      menuButton.remove();
    });

    menu.appendChild(menuButton);
  }

  function renderAddMenuItemInput() {
    const addMenuItemContainer = document.createElement("div");
    const addMenuItemInput = document.createElement("input");
    addMenuItemInput.type = "text";
    addMenuItemInput.className = "todo-list__input";
    addMenuItemInput.placeholder = "Add new group";

    const addMenuItemInputBtn = document.createElement("button");
    addMenuItemInputBtn.type = "button";
    addMenuItemInputBtn.className = "todo-list__button";
    addMenuItemInputBtn.innerText = "Add Group";
    addMenuItemInputBtn.addEventListener("click", (e) => {
      const addMenuItemInputValue = addMenuItemInput.value;
      if (addMenuItemInputValue) {
        const newGroup = group(addMenuItemInputValue);
        logicControl.setGroup(newGroup);
        renderMenu();
      } else {
        renderMenu();
      }
    });

    addMenuItemContainer.appendChild(addMenuItemInput);
    addMenuItemContainer.appendChild(addMenuItemInputBtn);

    return addMenuItemContainer;
  }

  //TODO: add a function to render a full todo card when dropdown button is pressed
  // set an eent listening on the button in the renderTodoListItem method

  //TODO: add event listening to checkbox to call updateStatus methods in logicController
  // when a todo's checkbox is clicked

  return { renderToDosList, renderMenu };
}
