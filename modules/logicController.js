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
          toDos.push(hydratedToDo);
        } else if (todoDatas[i].group == group) {
          const hydratedToDo = hydrateToDo(todoDatas[i]);
          toDos.push(hydratedToDo);
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

    if (currentGroups) {
      newGroups = currentGroups;

      newGroups.push(newGroup);
    } else {
      newGroups = [newGroup];
    }

    localStorage.setItem("groups", JSON.stringify(newGroups));
  }

  //TODO: add an updateStatus method to update a todo's status using its id

  //TODO add methods to update all fields of a todo base on id

  return { getToDos, setToDo, getGroups, setGroup };
}
