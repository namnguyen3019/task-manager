import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import { Todo } from "../model";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const InputField = ({ todos, setTodos }: Props) => {
  const [todoText, setTodoText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText) {
      setTodos([{ id: Date.now(), todo: todoText, isDone: false }, ...todos]);
    }
    setTodoText("");
    console.log(todos);
  };
  return (
    <form style={{ textAlign: "center" }} onSubmit={(e) => handleSubmit(e)}>
      <Input
        placeholder="Enter a new task"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <Button variant="contained" size="small" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default InputField;
