import React, { useContext } from "react";
import { TodosContext } from "../../utils/TodoContext";
import "./todo-results.scss";

export const TodoResults = () => {
  const { todos } = useContext(TodosContext);

  const calculateChecked = () => {
    // Filter completed tasks
    const completedTasks = todos.filter((todo) => todo.checked);

    // Return the count of completed tasks
    return completedTasks?.length;
  };

  return (
    <div className="todo-results">
      <span>Completed Tasks:</span>
      <span>{calculateChecked()}</span>
    </div>
  );
};
