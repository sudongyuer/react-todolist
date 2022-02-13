import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

import Input from "./Input";
import Button from "./Button";

function InputRow({ addTodoItem }) {
  const [input, setInput] = useState("");

  function addTodo() {
    addTodoItem(input);
    setInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        autoFocus
        onKeyPress={handleKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={addTodo} color="primary" variant="outlined">
        Add Item
      </Button>
    </form>
  );
}

export function TodoList() {
  const [todos, setTodos] = useState([
    { titile: "Improve JS skills 💪", isDone: true },
    { titile: "Pet dog 🐶", isDone: false },
  ]);
  const hasDoneListLength = todos.filter((todo) => todo.isDone).length;
  const todoLength = todos.length;
  const [isAllDone, setIsAllDone] = useState(false);
  function addTodoItem(todo) {
    todo.length && setTodos([...todos, { titile: todo, isDone: false }]);
  }

  function removeTodoItem(i) {
    todos.splice(i, 1);
    setTodos([...todos]);
  }
  function removeAll() {
    const newTodos = todos.filter((todo) => !todo.isDone);
    setTodos([...newTodos]);
  }

  function handlerChange(e, index) {
    todos[index].isDone = e.target.checked;
    setTodos([...todos]);
  }

  function handlerAllCheck(e) {
    todos.forEach((todo) => (todo.isDone = e.target.checked));
    setTodos([...todos]);
  }

  useEffect(() => {
    setIsAllDone(hasDoneListLength === todoLength);
  });

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <h1>Powered by 速冻鱼 🐟</h1>
      <div style={{ display: "flex" }}>
        <InputRow addTodoItem={addTodoItem} />
        <Button onClick={removeAll} color="secondary" variant="outlined">
          REMOVE ALL
        </Button>
      </div>
      <List>
        {todos.map((todo, i) => (
          <ListItem
            key={`${todo}-${i}`}
            style={{
              textDecoration: `${todo.isDone ? "line-through" : "none"}`,
            }}
          >
            <input
              type={"checkbox"}
              checked={todo.isDone}
              onChange={(e) => {
                handlerChange(e, i);
              }}
            ></input>
            <ListItemText>{todo.titile}</ListItemText>
            <Button color="secondary" onClick={() => removeTodoItem(i)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      {todoLength ? (
        <div style={{ display: "flex" }}>
          <input
            type={"checkbox"}
            checked={isAllDone}
            onChange={(e) => {
              handlerAllCheck(e);
            }}
          />
          <span style={{ color: "pink" }}>
            全选<span> {`${hasDoneListLength}/${todoLength}`}</span>
          </span>
        </div>
      ) : (
        <h1>任务已完成👍</h1>
      )}
    </div>
  );
}
