import { toDo } from "./toDo";
import { group } from "./group";

export function logicController() {
  function getToDos(group = "") {
    const todoDatas = JSON.parse(localStorage.getItem("todos"));

    const toDos = [];
    if (todoDatas) {
      for (let i = 0; i < todoDatas.length; i++) {
        if (!group || group == "All Items") {
          const hydratedToDo = hydrateToDo(todoDatas[i]);
          if (!hydratedToDo.getStatus()) {
            toDos.push(hydratedToDo);
          }
        } else if (group == "Completed") {
          const hydratedToDo = hydrateToDo(todoDatas[i]);
          if (hydratedToDo.getStatus()) {
            toDos.push(hydratedToDo);
          }
        } else if (group == "Due Today") {
          // push todos with due date of today
          const hydratedToDo = hydrateToDo(todoDatas[i]);
          const dueDateString = hydratedToDo.getDueDate();
          const dueDateParts = dueDateString.split("-");
          const year = parseInt(dueDateParts[0], 10);
          const month = parseInt(dueDateParts[1], 10) - 1;
          const day = parseInt(dueDateParts[2], 10);
          const dueDate = new Date(year, month, day);
          dueDate.setHours(0,0,0,0);
          
       
          const today = new Date();
          today.setHours(0,0,0,0);
          
          if (
            dueDate.getTime() == today.getTime()
          ) {
            toDos.push(hydratedToDo);
          }
        } else if (todoDatas[i].group == group) {
          const hydratedToDo = hydrateToDo(todoDatas[i]);
          if (!hydratedToDo.getStatus()) {
            toDos.push(hydratedToDo);
          }
        }
      }
    }

    return toDos;
  }

  function setToDo(todo) {
    const currentToDos = JSON.parse(localStorage.getItem("todos"));
    let newToDos;

    const newToDo = {
      id: todo.getId(),
      title: todo.getTitle(),
      description: todo.getDescription(),
      dueDate: todo.getDueDate(),
      group: todo.getGroup(),
      status: todo.getStatus(),
    };

    if (currentToDos) {
      newToDos = currentToDos;

      newToDos.push(newToDo);
    } else {
      newToDos = [newToDo];
    }

    localStorage.setItem("todos", JSON.stringify(newToDos));
  }

  function hydrateToDo(todoData) {
    return toDo(
      todoData.id,
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.group,
      todoData.status
    );
  }

  function updateToDo(updatedTodo) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex((todo) => todo.id == updatedTodo.getId());
    const updatedTodoData = {
      id: updatedTodo.getId(),
      title: updatedTodo.getTitle(),
      description: updatedTodo.getDescription(),
      dueDate: updatedTodo.getDueDate(),
      group: updatedTodo.getGroup(),
      status: updatedTodo.getStatus(),
    };
    if (index !== -1) {
      todos[index] = updatedTodoData;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  function deleteToDo(id) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex((todo) => todo.id == id);
    if (index !== -1) {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  function getGroups() {
    const groupDatas = JSON.parse(localStorage.getItem("groups"));
    const groups = [];

    if (groupDatas) {
      for (let i = 0; i < groupDatas.length; i++) {
        const hydratedGroup = hydrateGroup(groupDatas[i]);
        groups.push(hydratedGroup);
      }
    }

    return groups;
  }

  function hydrateGroup(groupData) {
    return group(groupData.groupName);
  }

  function setGroup(group) {
    const currentGroups = JSON.parse(localStorage.getItem("groups"));
    let newGroups;

    const newGroup = {
      groupName: group.getGroupName(),
    };

    // if new group already exists or has a value of 'Completed' or 'All Items' do not add it
    if (
      (currentGroups &&
        currentGroups.find((group) => group.groupName == newGroup.groupName)) ||
      newGroup.groupName == "Completed" ||
      newGroup.groupName == "All Items"
    ) {
      return;
    }

    if (currentGroups) {
      newGroups = currentGroups;

      newGroups.push(newGroup);
    } else {
      newGroups = [newGroup];
    }

    localStorage.setItem("groups", JSON.stringify(newGroups));
  }

  function deleteGroup(groupName) {
    const groups = JSON.parse(localStorage.getItem("groups"));
    const index = groups.findIndex((group) => group.groupName == groupName);
    if (index !== -1) {
      groups.splice(index, 1);
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }

  return {
    getToDos,
    setToDo,
    getGroups,
    setGroup,
    updateToDo,
    deleteToDo,
    deleteGroup,
  };
}
