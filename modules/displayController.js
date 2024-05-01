import { logicController } from "./logicController";

const logicControl = logicController();

export function displayController () {

    function renderTodoListItem(todo) {
        
        const todoListItem = document.createElement('div');
        todoListItem.id = `todo-${todo.getId()}`;
        todoListItem.className = "todo-list__item";

        const todoListCheckbox = document.createElement('input');
        todoListCheckbox.type = 'checkbox';
        todoListCheckbox.id = `todo${todo.getId()}`;

        const todoListLabel = document.createElement('label');
        todoListLabel.htmlFor = `todo${todo.getId()}`;
        todoListLabel.appendChild(document.createTextNode(`${todo.getTitle()}`));

        const todoListGroup = document.createElement('span');
        todoListGroup.className = "todo-list__group";
        todoListGroup.appendChild(document.createTextNode(`${todo.getGroup()}`))

        const todoListExpandBtn = document.createElement('button');
        todoListExpandBtn.type = 'button';
        todoListExpandBtn.className = 'todo-list__expand-btn';
        todoListExpandBtn.textContent = '⮟';
        todoListExpandBtn.addEventListener('click', e => {e.stopPropagation()});

        todoListItem.appendChild(todoListCheckbox);
        todoListItem.appendChild(todoListLabel);
        todoListItem.appendChild(todoListGroup);
        todoListItem.appendChild(todoListExpandBtn);
    

    return todoListItem;
    }

    function renderToDosList() {
        let todosList = document.getElementById('todo-list')

        // clear existing content
        todosList.innerHTML = '';

       // create title element
        const todoListTitle = document.createElement('h2');
        todoListTitle.className = 'todo-list__title';
        todoListTitle.appendChild(document.createTextNode(`All Items`));

        todosList.appendChild(todoListTitle);
        
        // append each todo item
        const todos = logicControl.getToDos();
        todos.forEach(todo => {
            const todoListItem = renderTodoListItem(todo);
            todosList.appendChild(todoListItem);
        });

        // append footer component
        const todoListFooter = document.createElement('div');
        todoListFooter.className = 'todo-list__footer';

        const todoListInput = document.createElement('input');
        todoListInput.className = 'todo-list__input'
        todoListInput.type = 'text';
        todoListInput.placeholder = 'Add new todo';

        const todoListButton = document.createElement('button');
        todoListButton.className = 'todo-list__button';
        todoListButton.type = 'button';
        todoListButton.textContent = 'Add';

        todoListFooter.appendChild(todoListInput);
        todoListFooter.appendChild(todoListButton);

        todosList.appendChild(todoListFooter);
    }


    return {renderToDosList}
}