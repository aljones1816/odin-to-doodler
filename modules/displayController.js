import { logicController } from "./logicController";
import { toDo } from "./toDo";
import { group } from "./group";

const logicControl = logicController();

export function displayController() {
  function renderTodoListItem(todo, group = "") {
    const todoListItem = document.createElement("div");
    todoListItem.id = `todo-${todo.getId()}`;
    todoListItem.className = "todo-list__item";

    const todoListCheckbox = document.createElement("input");
    todoListCheckbox.type = "checkbox";
    todoListCheckbox.id = `todo${todo.getId()}`;
    todoListCheckbox.checked = todo.getStatus();
    todoListCheckbox.addEventListener("change", (e) => {
      todo.setStatus();
      logicControl.updateToDo(todo);
      if (group !== "Completed") {
        todoListLabel.classList.add("completed");
      }
      setTimeout(() => {
        renderToDosList(group);
      }, 300);
    });

    const todoListLabel = document.createElement("label");
    todoListLabel.htmlFor = `todo${todo.getId()}`;
    todoListLabel.appendChild(document.createTextNode(`${todo.getTitle()}`));

    const todoListGroup = document.createElement("span");
    todoListGroup.className = "todo-list__group";
    todoListGroup.appendChild(document.createTextNode(`${todo.getGroup()}`));

    const todoListExpandBtn = document.createElement("button");
    todoListExpandBtn.type = "button";
    todoListExpandBtn.className = "todo-list__expand-btn";
    todoListExpandBtn.textContent = "↓";
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
    toDoListDetail.style.display = "none";

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
    editButton.addEventListener("click", (e) => {
      e.preventDefault();
      renderEditToDoForm(todo, group);
    });

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

  function renderEditToDoForm(todo, group = "") {
    const todoListItem = document.getElementById(`todo-${todo.getId()}`);
    const todoListDetails = todoListItem.querySelector(".todo-list__details");
    todoListDetails.style.display = "none";

    const editForm = document.createElement("form");
    editForm.className = "todo-list__edit-form";

    const editTitleInput = document.createElement("input");
    editTitleInput.type = "text";
    editTitleInput.className = "todo-list__input";
    editTitleInput.value = todo.getTitle();

    const editDescriptionInput = document.createElement("input");
    editDescriptionInput.type = "text";
    editDescriptionInput.className = "todo-list__input";
    editDescriptionInput.value = todo.getDescription();

    const editDueDateInput = document.createElement("input");
    editDueDateInput.type = "date";
    editDueDateInput.className = "todo-list__input";
    editDueDateInput.value = todo.getDueDate();

    // edit group should be a select element with all the groups
    const editGroupInput = document.createElement("select");
    editGroupInput.className = "todo-list__input";
    const groups = logicControl.getGroups();

    const noGroupOption = document.createElement("option");
    noGroupOption.value = "";
    noGroupOption.text = "No Group";
    editGroupInput.appendChild(noGroupOption);

    groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.getGroupName();
      option.text = group.getGroupName();
      editGroupInput.appendChild(option);
    });

    editGroupInput.value = todo.getGroup();

    const editFormButton = document.createElement("button");
    editFormButton.type = "button";
    editFormButton.className = "todo-list__button";
    editFormButton.textContent = "Save";
    editFormButton.addEventListener("click", (e) => {
      e.preventDefault();
      const updatedToDo = toDo(
        todo.getId(),
        editTitleInput.value,
        editDescriptionInput.value,
        editDueDateInput.value,
        editGroupInput.value
      );
      logicControl.updateToDo(updatedToDo);
      renderToDosList(group);
    });

    // add button to delete todo
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-list__button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      logicControl.deleteToDo(todo.getId());
      renderToDosList(group);
    });

    editForm.appendChild(editTitleInput);
    editForm.appendChild(editDescriptionInput);
    editForm.appendChild(editDueDateInput);
    editForm.appendChild(editGroupInput);
    editForm.appendChild(deleteButton);
    editForm.appendChild(editFormButton);

    todoListItem.appendChild(editForm);
  }

  function renderToDosList(group = "") {
    let todosList = document.getElementById("todo-list");

    // clear existing content
    todosList.innerHTML = "";

    // create title element
    const todoListTitle = document.createElement("h2");
    todoListTitle.className = "todo-list__title";
    todoListTitle.appendChild(document.createTextNode(group || "All Items"));

    todosList.appendChild(todoListTitle);

    // append each todo item
    const todos = logicControl.getToDos(group);
    todos.forEach((todo) => {
      const todoListItem = renderTodoListItem(todo, group);
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
        const newToDo = toDo(
          newToDoId,
          todoListInputValue,
          "",
          "",
          group,
          false
        );

        logicControl.setToDo(newToDo);
        renderToDosList(group);
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

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "menu__delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();

      const todos = logicControl.getToDos(groupName);
      todos.forEach((todo) => {
        const updatedToDo = toDo(
          todo.getId(),
          todo.getTitle(),
          todo.getDescription(),
          todo.getDueDate(),
          "",
          todo.getStatus()
        );
        logicControl.updateToDo(updatedToDo);
      });
      logicControl.deleteGroup(groupName);

      renderMenu();
      renderToDosList();
    });
    menuListItem.appendChild(deleteButton);

    return menuListItem;
  }

  function renderMenu() {
    const allItemsGroup = group("All Items");
    const completedItemsGroup = group("Completed");

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
    const completedItems = renderMenuItem(completedItemsGroup);
    menuList.appendChild(completedItems);

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

  return { renderToDosList, renderMenu };
}
