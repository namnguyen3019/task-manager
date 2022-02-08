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
    <>
      <List
        sx={{
          bgcolor: "rgba(65, 216, 242, 0.8)",
          margin: "15px 0",
        }}
      >
        <h4
          style={{
            textAlign: "center",
          }}
        >
          Active Tasks
        </h4>
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
      <List sx={{ bgcolor: "red", margin: "20px 0" }}>
        <h4
          style={{
            textAlign: "center",
          }}
        >
          Completed Tasks
        </h4>
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
    </>
  );
};

export default TodoList;
