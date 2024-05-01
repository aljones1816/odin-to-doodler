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
                id: todo.getId(),
                title: todo.getTitle(),
                description: todo.getDescription(),
                dueDate: todo.getDueDate(),
                group: todo.getGroup(),
                status: todo.getStatus()
            }  

        if (currentToDos) {
                newToDos = currentToDos;
                
                newToDos.push(newToDo); 
                
        } else {
            newToDos = [newToDo]
        }
        
        
        
        localStorage.setItem("todos", JSON.stringify(newToDos))
    }

    function hydrateToDo (todoData) {
        return toDo(todoData.id, todoData.title, todoData.description, todoData.dueDate, todoData.group, todoData.status)
    }


    return {getToDos, setToDo}
}