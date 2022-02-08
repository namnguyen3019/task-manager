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
    console.log("Edit");
    setEditMode(!editMode);
  };
  const handleDelete = (id: number) => {
    console.log("Delete this id", id);
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
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <button onClick={() => setEditMode(false)}>Cancel</button>
              <button type="submit">Done</button>
            </>
          ) : todo.isDone ? (
            <s>{todo.todo}</s>
          ) : (
            <>
              <span>
                {index + 1}.{todo.todo}
              </span>
              <span onClick={() => handleEdit(todo.id)}>
                <AiFillEdit />
              </span>
              <span onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </span>
              <span onClick={() => handleDone(todo.id)}>
                <MdDoneOutline />
              </span>
            </>
          )}
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
