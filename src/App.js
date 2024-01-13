import { useState } from 'react';
import { todosTemplate } from './utils/constant';
import { TodosContext } from './utils/TodoContext';
import { TodoList } from './components/todo-list/TodoList';
import { TodoResults } from './components/todo-result/TodoResults';
import { TodoForm } from './components/todo-form/TodoForm';

import "./index.scss";


function App() {
  const [todos, setTodos] = useState(todosTemplate);
  
  return (
    <div className="App">
      <TodosContext.Provider value={{todos, setTodos}}>
        <TodoList />
        <TodoResults />
        <TodoForm />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
