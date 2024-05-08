export function toDo(
  id,
  title,
  description = "",
  dueDate = "",
  group = "",
  status = false
) {
  id;
  title;
  description;
  dueDate;
  group;
  status;

  function getId() {
    return id;
  }

  function getTitle() {
    return title;
  }

  function setTitle(newTitle) {
    title = newTitle;
  }

  function getDescription() {
    return description;
  }

  function setDescription(newDescription) {
    description = newDescription;
  }

  function getDueDate() {
    return dueDate;
  }

  function setDueDate(newDueDate) {
    dueDate = newDueDate;
  }

  function setGroup(newGroup) {
    group = newGroup;
  }

  function getGroup() {
    return group;
  }

  function getStatus() {
    return status;
  }

  function setStatus() {
    status = !status;
  }

  return {
    getId,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getGroup,
    setGroup,
    getStatus,
    setStatus,
  };
}
