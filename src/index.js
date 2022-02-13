import React from "react";
import { render } from "react-dom";

import { TodoList } from "./components/TodoList";
import "./styles.css";
//
render(
  <div className="App">
    <TodoList />
  </div>,
  document.getElementById("root")
);
