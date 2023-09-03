import { createStore, createEvent } from 'effector';
import { v4 as uuidv4 } from "uuid";

export const addDoneTodo = createEvent();
export const removeDoneTodo = createEvent();
export const completeStatusDoneTodo = createEvent();
export const reorderDoneTodo = createEvent();
export const updateDoneTodo = createEvent();

export const $doneTodos = createStore([]) // Initial state is an empty array

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