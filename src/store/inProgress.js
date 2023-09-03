import { createStore, createEvent } from 'effector';
import { v4 as uuidv4 } from "uuid";
import { fetchTodosFx } from './todo';

export const addInProgressTodo = createEvent();
export const removeInProgressTodo = createEvent();
export const completeStatusInProgressTodo = createEvent();
export const reorderInProgressTodo = createEvent();
export const updateInProgressTodo = createEvent();

export const $inProgressTodos = createStore([]) // Initial state is an empty array

$inProgressTodos
    .on(fetchTodosFx.done, (todos, { result = [] }) => {
        const todoSlice = result.slice(20, 25).map(todo => ({ ...todo, id: uuidv4(), text: todo.title, isFinished: Math.random() >= 0.5, createdAt: new Date().toLocaleString() }))
        return [...todos, ...todoSlice]
    })
    .on(addInProgressTodo, (todos, text) => [...todos, {
        id: uuidv4(),
        text,
        isFinished: false,
        createdAt: new Date().toLocaleString(),
        isTextShowed: false
    }])
    .on(removeInProgressTodo, (todos, id) => todos.filter(todo => todo.id !== id))
    .on(completeStatusInProgressTodo, (todos, { id, isFinished, updatedAt }) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(({ id: todoId }) => todoId === id);
        newTodos[index].isFinished = isFinished;
        newTodos[index].updatedAt = updatedAt;
        return newTodos;
    })
    .on(reorderInProgressTodo, (todos, { source, destination }) => {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);
        return newTodos;
    })
    .on(updateInProgressTodo, (todos, { destination, filterState }) => {
        const newTodos = [...todos];
        newTodos.splice(
            destination.index,
            0,
            filterState
        );
        return newTodos
    })