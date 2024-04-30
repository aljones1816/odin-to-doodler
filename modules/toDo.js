export function toDo (title, description="", dueDate="", priority="", project="") {
    title;
    description;
    dueDate;
    priority;
    project;

    function getTitle () {
        return title;
    }

    function setTitle (newTitle) {
        title = newTitle
    }

    function getDescription () {
        return description;
    }

    function setDescription(newDescription) {
        description = newDescription;
    }

    function getDueDate () {
        return dueDate;
    }

    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }

    function getPriority () {
        return priority;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }

    return {getTitle, 
            getDescription,
            getDueDate,
            getPriority,
            setTitle,
            setDescription,
            setDueDate,
            setPriority
            }
}