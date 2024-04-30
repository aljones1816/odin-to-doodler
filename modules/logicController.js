import { toDo } from "./toDo";

export function logicController () {

    function getToDos () {
        const todoDatas = JSON.parse(localStorage.getItem("todos"));
        
        const toDos = []
        if (todoDatas) {for (let i=0; i < todoDatas.length; i++) {
            const hydratedToDo = hydrateToDo(todoDatas[i])
            toDos.push(hydratedToDo)
        }}
        
        return toDos
    }

    function setToDo (todo) {
        const currentToDos = JSON.parse(localStorage.getItem("todos"));
        let newToDos;
        
        const newToDo = {
                title: todo.getTitle(),
                description: todo.getDescription(),
                dueDate: todo.getDueDate(),
                priority: todo.getPriority()
            }  

        if (currentToDos) {
                newToDos = currentToDos;
                console.log(newToDos);
                newToDos.push(newToDo); 
                console.log(newToDos);
        } else {
            newToDos = [newToDo]
        }
        
        
        
        localStorage.setItem("todos", JSON.stringify(newToDos))
    }

    function hydrateToDo (todoData) {
        return toDo(todoData.title, todoData.description, todoData.dueDate, todoData.priority)
    }

    function handleFormSubmit ({todo, description, dueDate, priority}) {
        setToDo(toDo(todo, description, dueDate, priority));
    }

    return {getToDos, setToDo, handleFormSubmit}
}