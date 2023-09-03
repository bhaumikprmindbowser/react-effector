import { createStore, createEvent } from 'effector';
import { createEffect } from 'effector';
import { v4 as uuidv4 } from "uuid";

export const addTodo = createEvent();
export const removeTodo = createEvent();
export const completeStatusTodo = createEvent();
export const reorderTodo = createEvent();
export const updateTodo = createEvent();

export const fetchTodosFx = createEffect(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
});

export const $todos = createStore([]) // Initial state is an empty array

$todos
    .on(fetchTodosFx.done, (todos, { result = [] }) => {
        const todoSlice = result.slice(0, 7).map(todo => ({ ...todo, id: uuidv4(), text: todo.title, isFinished: Math.random() >= 0.5, createdAt: new Date().toLocaleString(), }))
        return [...todos, ...todoSlice]
    })
    .on(addTodo, (todos, text) => [...todos, {
        id: uuidv4(),
        text,
        isFinished: false,
        createdAt: new Date().toLocaleString(),
    }])
    .on(removeTodo, (todos, id) => todos.filter(todo => todo.id !== id))
    .on(completeStatusTodo, (todos, { id, isFinished, updatedAt }) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(({ id: todoId }) => todoId === id);
        newTodos[index].isFinished = isFinished;
        newTodos[index].updatedAt = updatedAt;
        return newTodos;
    })
    .on(reorderTodo, (todos, { source, destination }) => {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);
        return newTodos;
    })
    .on(updateTodo, (todos, { destination, filterState }) => {
        const newTodos = [...todos];
        newTodos.splice(
            destination.index,
            0,
            filterState
        );
        return newTodos
    })

