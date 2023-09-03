import { combine } from 'effector'
import { $todos } from "./todo";
import { $inProgressTodos } from "./inProgress";
import { $doneTodos } from "./done";
import { droppableIds } from "../constants";

export const $combineStore = combine({ [droppableIds[0]]: $todos, [droppableIds[1]]: $inProgressTodos, [droppableIds[2]]: $doneTodos })
