import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
import './styles.css';

export const todoList = new TodoList();

console.log(todoList);

todoList.todos.forEach(element => {
    crearTodoHTML(element);
});

