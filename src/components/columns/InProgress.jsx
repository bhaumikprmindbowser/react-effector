import Typography from "@mui/material/Typography";
import ColumnLayout from "../ColumnLayout";
import {
  $inProgressTodos,
  addInProgressTodo,
  removeInProgressTodo,
  completeStatusInProgressTodo,
} from "../../store/inProgress";
import { useStore } from "effector-react";
import { droppableIds } from "../../constants";

export function InProgressColumn() {
  const inProgressTodos = useStore($inProgressTodos);

  return (
    <>
      <Typography mb={3}>
        All inProgress tasks: {inProgressTodos.length}
      </Typography>
      <ColumnLayout
        droppableId={droppableIds[1]}
        labelText="Type 'in progress' item"
        completedHandler={completeStatusInProgressTodo}
        removeHandler={removeInProgressTodo}
        addHandler={addInProgressTodo}
        selectorState={inProgressTodos}
      />
    </>
  );
}
