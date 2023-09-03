import React from 'react'
import { Typography, Grid } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { ToDoColumn } from "../components/columns/ToDo";
import { DoneColumn } from "../components/columns/Done";
import { InProgressColumn } from "../components/columns/InProgress";
import { updateDoneTodo, reorderDoneTodo, removeDoneTodo } from "../store/done";
import { updateInProgressTodo, reorderInProgressTodo,removeInProgressTodo } from "../store/inProgress";
import { updateTodo, reorderTodo,removeTodo } from "../store/todo";
import { droppableIds } from "../constants";
import { useStore } from "effector-react";
import { $combineStore } from "../store";

const onDragActions = {
  [droppableIds[0]]: { reorder: reorderTodo, remove: removeTodo, update: updateTodo },
  [droppableIds[1]]: { reorder: reorderInProgressTodo, remove: removeInProgressTodo, update: updateInProgressTodo },
  [droppableIds[2]]: { reorder: reorderDoneTodo, remove: removeDoneTodo, update: updateDoneTodo },
}

function TodoContainer() {
  const combineStore = useStore($combineStore);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;

    if (destination.droppableId === source.droppableId) {
      onDragActions[destination.droppableId].reorder(result);
    } else {
      const [filterState] = combineStore[source.droppableId].filter(
        ({ id }) => id === draggableId
      );

      onDragActions[source.droppableId].remove(draggableId);

      onDragActions[destination.droppableId].update({ ...result, filterState });
    }
  };

  return (
    <>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        This is a ToDo APP with Effector
      </Typography>{" "}
      <Grid container spacing={3} justifyContent="center">
        <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
          <Grid item md={4}>
            <ToDoColumn />
          </Grid>
          <Grid item md={4}>
            <InProgressColumn />
          </Grid>
          <Grid item md={4}>
            <DoneColumn />
          </Grid>
        </DragDropContext>
      </Grid>
    </>
  );
}

export default TodoContainer