import { Input, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";
import { Todo } from "../model";

type Props = {
  todo: Todo;
  index: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({
  todo,
  index,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleEdit = (id: number) => {
    setEditMode(!editMode);
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleDone = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompletedTodos([...completedTodos, { ...todo, isDone: !todo.isDone }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEditMode(false);
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <ListItem divider={true}>
          <form
            style={{ backgroundColor: "yellow", margin: "20px" }}
            onSubmit={(e) => handleSubmit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {editMode ? (
              <>
                {" "}
                <Input
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit">
                  Done
                </Button>
              </>
            ) : todo.isDone ? (
              <s style={{ marginLeft: 20 }}>{todo.todo}</s>
            ) : (
              <>
                <span style={{ marginLeft: 20, marginRight: 20 }}>
                  {index + 1}.{todo.todo}
                </span>
                <span style={{ marginInline: 5 }}>
                  <AiFillEdit onClick={() => handleEdit(todo.id)} />
                </span>
                <span style={{ marginInline: 5 }}>
                  <MdDoneOutline onClick={() => handleDone(todo.id)} />
                </span>
                <span style={{ marginInline: 5, color: "#FF0000" }}>
                  <AiFillDelete onClick={() => handleDelete(todo.id)} />
                </span>
              </>
            )}
          </form>
        </ListItem>
      )}
    </Draggable>
  );
};

export default SingleTodo;
