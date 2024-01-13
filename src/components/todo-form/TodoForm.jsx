import { useContext, useState } from 'react';
import { TodosContext } from '../../utils/TodoContext';
import "./todo-form.scss";

export const TodoForm = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [task, setTask] = useState([]);

  const addTodoHandler = () => {
    if(task?.trim(' ').length === 0) return;
    let updatedTodos = [...todos, {checked: false, id: todos.length, label: task}];
    setTodos(updatedTodos);
    setTask('');
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      addTodoHandler();
    }
  };

  return (
    <div className="todo-form">
      <input
      className='todo-form-input'
        placeholder="Enter new task"
        value={task}
        onChange={(e, index) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button 
        className='todo-form-btn'
        disabled={!task?.length}
        type="button" 
        onClick={addTodoHandler}>
        Add task
      </button>
    </div>
  );
};
