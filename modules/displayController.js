import { logicController } from "./logicController";
import todoForm from '../components/todoForm.html?raw';
import todoItemTemplate from '../components/todoItem.html?raw';

const logicControl = logicController();

export function displayController () {

    function renderToDo(todo) {
        
        const todoCard = document.createElement('div');
        todoCard.innerHTML = todoItemTemplate;

    
        todoCard.querySelector('#todoTitle').textContent = todo.getTitle();
        todoCard.querySelector('#todoDescription').textContent = todo.getDescription();

    return todoCard;
    }

    function renderToDosList() {
        let todosContainer = document.getElementById('todosContainer')

        if (!todosContainer) {
            todosContainer = document.createElement('div');
            todosContainer.id = 'todosContainer';
            const app = document.getElementById('app')
            app.appendChild(todosContainer)
        }

        todosContainer.innerHTML = '';
        const todos = logicControl.getToDos();
        todos.forEach(todo => {
            const todoCard = renderToDo(todo);
            todosContainer.appendChild(todoCard);
        });
    }

    function renderToDoForm () {
        const renderToDoForm = document.createElement("form");
        renderToDoForm.id = "renderToDoForm";
        renderToDoForm.innerHTML = todoForm;
        renderToDoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                todo: renderToDoForm.todo.value,
                description: renderToDoForm.description.value,
                dueDate: renderToDoForm.dueDate.value,
                priority: renderToDoForm.priority.value
            };
            renderToDoForm.reset();
            logicControl.handleFormSubmit(formData)
            renderToDosList()
            
        })


        return renderToDoForm
    }

    return {renderToDo,renderToDoForm,renderToDosList}
}