import { createStore, createEvent, createDomain } from 'effector';
import { v4 as uuidv4 } from "uuid";

const doneTodoDomain = createDomain('doneTodo') // Named domain

export const addDoneTodo = doneTodoDomain.createEvent();
export const removeDoneTodo = doneTodoDomain.createEvent();
export const completeStatusDoneTodo = doneTodoDomain.createEvent();
export const reorderDoneTodo = doneTodoDomain.createEvent();
export const updateDoneTodo = doneTodoDomain.createEvent();


export const $doneTodos = doneTodoDomain.createStore([]) // Initial state is an empty array

$doneTodos
    .on(addDoneTodo, (todos, text) => [...todos, {
        id: uuidv4(),
        text,
        isFinished: false,
        createdAt: new Date().toLocaleString(),
        isTextShowed: false
    }])
    .on(removeDoneTodo, (todos, id) => todos.filter(todo => todo.id !== id))
    .on(completeStatusDoneTodo, (todos, { id, isFinished, updatedAt }) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(({ id: todoId }) => todoId === id);
        newTodos[index].isFinished = isFinished;
        newTodos[index].updatedAt = updatedAt;
        return newTodos;
    })
    .on(reorderDoneTodo, (todos, { source, destination }) => {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);
        return newTodos;
    })
    .on(updateDoneTodo, (todos, { destination, filterState }) => {
        const newTodos = [...todos];
        newTodos.splice(
            destination.index,
            0,
            filterState
        );
        return newTodos
    })