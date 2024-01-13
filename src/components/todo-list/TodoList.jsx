import { useContext, useState } from "react";
import { Checkbox } from "../checkbox/CheckBox";
import { TodosContext } from "../../utils/TodoContext";
import "./todo-list.scss";

export const TodoList = () => {
  const {todos, setTodos} = useContext(TodosContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  const editTaskHandler = (id, label) => {
    setEditingTaskId(id);
    setEditTaskValue(label);
  }

  const saveEditedTask = (id) => {
    const updatedTodos = todos.map((item) => 
      item.id === id ? { ...item, label: editTaskValue } : item
    );
    setTodos(updatedTodos);
    setEditingTaskId(null);
    setEditTaskValue("");
  }

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditTaskValue("");
  }
  
  const deleteTaskHandler = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };


  const toggleCheck = (id) => {
    // Toggle the checked property for the todo item with the given id
    const completedTodos = todos.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setTodos(completedTodos);
  };

  const keyUpHandler = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return(
    <div className="todo-list">
      <span className="todo-list-title">Things to do - </span>
      {todos?.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <div key={todoItem.id} className="todo-item">
              {editingTaskId === todoItem.id ? (
                <div className="todo-list-edit">
                  <input 
                    type="text" 
                    value={editTaskValue} 
                    onChange={(e) => setEditTaskValue(e.target.value)} 
                  />
                  <div className="todo-list-btns">
                    <button onClick={() => saveEditedTask(todoItem.id)}>Save</button>
                    <button onClick={() => cancelEditTask()}>Cancel</button>
                  </div>
                </div>
              ) : (
                <Checkbox
                  key={todoItem.id}
                  label={todoItem.label}
                  checked={todoItem.checked}
                  onClick={() => toggleCheck(todoItem.id)}
                  onKeyUp={(e) => keyUpHandler(e, todoItem.id)}
                  onEdit={() => editTaskHandler(todoItem.id, todoItem.label)}
                  onDelete={() => deleteTaskHandler(todoItem.id)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )}
    </div>
  )

  // return (
  //   <div className="todo-list">
  //     <span className="todo-list-title">Things to do - </span>
  //     {todos?.length ? (
  //       <div className="todo-list-content">
  //         {todos.map((todoItem) => (
  //           <Checkbox
  //             key={todoItem.id}
  //             label={todoItem.label}
  //             checked={todoItem.checked}
  //             onClick={() => toggleCheck(todoItem.id)}
  //             onKeyUp={(e) => keyUpHandler(e, todoItem.id)}
  //             onEdit={() => editTaskHandler(todoItem.id. todoItem.label)}
  //             onDelete={() => deleteTaskHandler(todoItem.id)}
  //           />
  //         ))}
  //       </div>
  //     ) : (
  //       <div className="no-todos">
  //         Looks like you&apos;re absolutely free today!
  //       </div>
  //     )}
  //   </div>
  // );
};
