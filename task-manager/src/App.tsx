import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let item;
    let active = todos;
    let complete = completedTodos;

    //  Source Logic
    if (source.droppableId === "TodoList") {
      item = active[source.index];
      active.splice(source.index, 1);
      if (destination.droppableId === "TodoList") {
        active.splice(destination.index, 0, item);
      } else {
        item.isDone = !item.isDone;
        complete.splice(destination.index, 0, item);
      }
    } else {
      item = complete[source.index];
      complete.splice(source.index, 1);
      if (destination.droppableId === "TodoList") {
        item.isDone = !item.isDone;
        active.splice(destination.index, 0, item);
      } else {
        complete.splice(destination.index, 0, item);
      }
    }

    setTodos(active);
    setCompletedTodos(complete);
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div style={{ alignItems: "center" }}>
          <Typography variant="h3" align="center" gutterBottom marginTop={5}>
            Task Manager
          </Typography>
          <InputField todos={todos} setTodos={setTodos} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </Container>
  );
};

export default App;
