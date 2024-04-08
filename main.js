#!  /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
async function addToDoList() {
    let condition = true;
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: 'todo',
                type: 'input',
                message: "What do you want to add to your todo list?"
            },
            {
                name: 'addMore',
                type: 'confirm',
                message: "Do you want to add more tasks?",
                default: false
            }
        ]);
        todos.push({ task: addTask.todo, completed: false });
        console.log("Todo List:");
        displayTodoList();
        condition = addTask.addMore;
    }
    console.log("Your final todo list:");
    displayTodoList();
}
function displayTodoList() {
    todos.forEach((todo, index) => {
        const status = todo.completed ? "[x]" : "[ ]";
        console.log(`${index + 1}. ${status} ${todo.task}`);
    });
}
async function manageTodoList() {
    while (true) {
        const action = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What do you want to do?',
            choices: ['Mark task as completed', 'Remove task', 'Exit']
        });
        switch (action.action) {
            case 'Mark task as completed':
                await markTaskAsCompleted();
                break;
            case 'Remove task':
                await removeTask();
                break;
            case 'Exit':
                return;
        }
    }
}
async function markTaskAsCompleted() {
    const todoIndex = await selectTodo();
    todos[todoIndex].completed = true;
    console.log("Task marked as completed.");
}
async function removeTask() {
    const todoIndex = await selectTodo();
    todos.splice(todoIndex, 1);
    console.log("Task removed from the list.");
}
async function selectTodo() {
    const { todoIndex } = await inquirer.prompt({
        name: 'todoIndex',
        type: 'list',
        message: 'Select a task:',
        choices: todos.map((todo, index) => ({ name: todo.task, value: index }))
    });
    return todoIndex;
}
async function startApp() {
    await addToDoList();
    await manageTodoList();
}
startApp();
