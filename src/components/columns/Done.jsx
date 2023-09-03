import Typography from "@mui/material/Typography";
import ColumnLayout from "../ColumnLayout";
import {
  $doneTodos,
  addDoneTodo,
  removeDoneTodo,
  completeStatusDoneTodo,
} from "../../store/done";
import { useStore } from "effector-react";
import { droppableIds } from "../../constants";

export function DoneColumn() {
  const doneTodos = useStore($doneTodos);

  return (
    <>
      <Typography mb={3}>All done tasks: {doneTodos.length}</Typography>
      <ColumnLayout
        droppableId={droppableIds[2]}
        labelText="Type 'done' item"
        completedHandler={completeStatusDoneTodo}
        removeHandler={removeDoneTodo}
        addHandler={addDoneTodo}
        selectorState={doneTodos}
      />
    </>
  );
}
