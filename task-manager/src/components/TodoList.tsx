import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <List
          sx={{
            bgcolor: "rgba(65, 216, 242, 0.8)",
            margin: "20px 0",
          }}
        >
          <Typography variant="h5" align="center">
            Active Task
          </Typography>
          <Droppable droppableId="TodoList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todos?.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List sx={{ bgcolor: "red", margin: "20px 0" }}>
          <Typography variant="h5" align="center" style={{ color: "white" }}>
            Completed Tasks
          </Typography>
          <Droppable droppableId="completedTods">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {completedTodos?.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </Grid>
    </Grid>
  );
};

export default TodoList;
