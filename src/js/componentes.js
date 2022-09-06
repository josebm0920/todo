//Referencias HTML

import { Todo } from "../classes";
import { todoList } from '../index'

const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const buttonBorrarTodos = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const todoCount = document.querySelector('.todo-count');

export const crearTodoHTML = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    todoCount.firstElementChild.innerText = todoList.devuelveCantPendientes();

    return div.firstElementChild;
}


//Eventos

inputNewTodo.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTodo = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        inputNewTodo.value = '';
    }
});


divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement; // <li></li>
    const todoId = todoElemento.getAttribute('data-id'); // id 

    if (nombreElemento.includes('input')) { // click en el check
        todoList.toggleTodo(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        
    }

    todoCount.firstElementChild.innerText = todoList.devuelveCantPendientes();


});

buttonBorrarTodos.addEventListener('click', () => {
    todoList.eliminarCompletados();
    
    for(let i = divTodoList.children.length - 1; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }

    }
    todoCount.firstElementChild.innerText = todoList.devuelveCantPendientes();


});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro) return;

    anchorFiltros.forEach(element => {
        element.classList.remove('selected');
    });

    event.target.classList.add('selected');

    for(const element of divTodoList.children) {
        
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');
        switch(filtro) {
            case 'Pendientes':  
                if (completado) {
                    element.classList.add('hidden');
                    
                }
            break;
            case 'Completados':  
                if (!completado) {
                    element.classList.add('hidden');
                    
                }
            break;
        }

    }

});