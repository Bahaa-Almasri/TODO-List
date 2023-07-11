/*
function RenderToDos(){

    /-Get the list so that we render it when it loads
    localStorage.getItem("toDos")

}

/-All the toDos, not one toDo
localStorage.setItem("toDos", "value")

/- If should use parse in JSON so that it breaks them down into different keys, if we use stringify, it turns it into
/- One string

/- parse: turns JSON into js Objects
/- stringify: turns JS Object into JSON
*/

window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    //If they are empty or have something, empty array
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';
    //If empty string or has a value

    nameInput.value = username;
    //So that the name is saved when we reload the page

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    //.target refers to nameInput
    })
    //If there is a change in username, change it in the localStorage

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        /*The event.preventDefault() method is used within an event listener function to prevent the default behavior associated with an event.
        By calling event.preventDefault(), you can prevent the browser's default action for a particular event from taking place.*/

        const todo = {
            content: e.target.elements.content.value,
            /*
            e: Refers to the event object passed to the event listener function.
            .target: Represents the element that triggered the event.
            .elements: Refers to a collection of all form elements within the target element.
            .content: Refers to the specific form element with the name or ID of "content".
            .value: Retrieves the current value of the form element.
            */
            //content is the name of the input in the form
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
            //This will create a new Date object representing the current date and time, and the getTime() method will return
            //the corresponding timestamp value.
        }
        //the todo is an object

        todos.push(todo);
        //push an item (todo) into an array (todos).
        //adding todo to the todos, todo adds it to the end

        localStorage.setItem('todos', JSON.stringify(todos));
        //This turns the array into a JSON string, then we store the string in the localStorage
        //Local storage only allows us to save strings, numbers, boolean,....
        //updating the todos

        // Reset the form
        e.target.reset();
        /* When a user submits a form, you may want to clear the form inputs to remove any previous values and provide a fresh starting point
        for the next interaction. The .reset() method allows you to easily clear all the form inputs in a single step. */
        //clear them after adding todo
        //only for the newTodoForm

        DisplayTodos()
        //So that all todos are displayed
        //All the functions before this added the content to the local storage, now we want to display them
    })

    DisplayTodos()
    // Call this as soon as the page loaded
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    //Get the todo list section
    todoList.innerHTML = "";
    //clear the content of the element.

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        //create a const for div
        todoItem.classList.add('todo-item');
        //add the class todo-item that creates the div with the input values in the todo list
        //modifying the .className property directly will overwrite any existing class names on the element. If you want to manipulate the
        //class names in a more flexible and convenient manner, consider using the .classList property and its various methods like add(),
        //remove(), toggle(), etc.

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        //change the type of input to checkbox

        input.checked = todo.done;
        //This will tell it if the todo is done
        /*The todo.done property represents the status of a todo item, indicating whether it has been marked as done or not. It is a boolean value that
        can be either true or false. */

        span.classList.add('bubble');
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        /*Add the bubble to the span inside the todoItem div*/

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        /*All in css we know what they are, they are all added to the div todoItem */

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        //here we put input and readonly so it will be like text, but when we edit, we remove readonly, so don't put it as text
        /* refers to this
        const todo = {
            content: e.target.elements.content.value, */
        /* sets the innerHTML property of the content element to a string that represents an HTML input element. The input element has
        its value attribute set to the value of todo.content, and it is marked as readonly, meaning the user cannot edit the input. */
        /*the backtick (`) is used to delimit a template literal string in JavaScript.
        Template literals are a feature introduced in ECMAScript 2015 (ES6) that allows for more convenient string interpolation and
        multi-line strings in JavaScript.  */
        //${todo.content} variable. The use of ${} suggests that you are using some kind of templating or server-side scripting language
        //to dynamically insert the value.

        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        //the text inside the buttons

        label.appendChild(input);
        label.appendChild(span);
        //add span and input to label

        actions.appendChild(edit);
        actions.appendChild(deleteButton);

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        //Add all the items to the div in the html
        //These are the const we did before, the div and other stuff

        if (todo.done) {
            todoItem.classList.add('done');
        }

        //Here e represents the event
/*
The addEventListener method in JavaScript takes two parameters: the event type and the event listener function.

Event Type: The first parameter 'change' specifies the type of event to listen for. In this case, it's the 'change' event, which is triggered
when the value of an input element is changed.

Event Listener Function: The second parameter is a callback function (e) => {...} that will be executed when the specified event occurs.
The function receives an event object as an argument, typically denoted by the (e) parameter. You can name the parameter whatever you like;
e is just a common convention.

Inside the event listener function, you can define the actions to be performed when the specified event occurs. The code block within the
curly braces {...} represents the body of the callback function and contains the instructions you want to execute when the event is triggered.

For example, the code snippet you provided:

input.addEventListener('change', (e) => {
    /- Code to be executed when the 'change' event occurs
});
*/
        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            //it will be true
            localStorage.setItem('todos', JSON.stringify(todos));
            //The localStorage only accepts strings so JSON.stringify

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
            //To add the point inside the bubble

            DisplayTodos()
            //Every time we make a change, we have to display todos

        })

        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            //because the input is being stored in the content

            input.removeAttribute('readonly');
            //so we can edit the value of the input

            input.focus();
            //focus(): It is a method available on input elements. When called on an input element, it brings the focus to that element,
            //making it ready to accept user input.

            input.addEventListener('blur', (e) => {
                //If we click outside the input field, it will stop editing
                //The blur event is fired when the user moves the focus away from an element, typically by clicking outside of the element
                //or by pressing the Tab key to navigate to the next element.

                input.setAttribute('readonly', true);
                //The code input.setAttribute('readonly', true); sets the readonly attribute of an HTML input element to true. The setAttribute() method is a built-in
                //method available on elements in JavaScript, which allows you to set or modify attributes of an element.

                todo.content = e.target.value;
                //Set the todo content to the new value
                // we are changing todo, only its content

                localStorage.setItem('todos', JSON.stringify(todos));
                //set them after changing them

                DisplayTodos();
                //Redisplay our todos

            })
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            /*It is a method available on arrays that creates a new array containing only the elements that pass a specified condition.
            The condition is defined by a callback function, like what we did with e */
            /*t => t != todo: It is the callback function passed to filter(). For each element t in the todos array, it checks if t is not equal
            (!=) to the todo object. If the condition is true, the element is included in the new filtered array. If not, it is deleted */
            /*Note that the t variable name is arbitrary and can be changed to any valid variable name. It is commonly used as a convention to represent
            each element during array iteration. */


            localStorage.setItem('todos', JSON.stringify(todos));
            //set them after changing them

            DisplayTodos()
            //Redisplay our todos
        })

    })
}