import Typography from "@mui/material/Typography";
import ColumnLayout from "../ColumnLayout";
import {
  $todos,
  addTodo,
  removeTodo,
  completeStatusTodo,
} from "../../store/todo";
import { useStore } from "effector-react";
import { droppableIds } from "../../constants";

export function ToDoColumn() {
  const todos = useStore($todos);

  return (
    <>
      <Typography mb={3}>All todo tasks: {todos.length}</Typography>
      <ColumnLayout
        droppableId={droppableIds[0]}
        labelText="Type 'to do' item"
        completedHandler={completeStatusTodo}
        removeHandler={removeTodo}
        addHandler={addTodo}
        selectorState={todos}
      />
    </>
  );
}
