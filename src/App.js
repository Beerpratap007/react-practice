import { useState } from 'react';
import { todosTemplate } from './utils/constant';
import { TodosContext } from './utils/TodoContext';
import { TodoList } from './components/todo-list/TodoList';
import { TodoResults } from './components/todo-result/TodoResults';
import { TodoForm } from './components/todo-form/TodoForm';
import Pagination from './components/pagination';
//Custom hooks import
import { useCount } from './hooks/useCount';
import { useFetch } from './hooks/useFetch';
import useTable from './hooks/useTable';

import { apiUrl } from './utils/constant';

import "./index.scss";
import AuthExample from './components/auth/auth';
import Circle from './components/dart-board/Circle';


function App() {
  const [todos, setTodos] = useState(todosTemplate);
  const {count, isRunning, startCount, stopCount, resetCount} = useCount(1);//Using custome hook
  const { isLoading, data, error } = useFetch(apiUrl); //Custome hook to fetch the data
  const divArr = [1,2,3,4,5];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = data?.slice(startIndex, endIndex);
  //using custome hook
  const { TableHeader, TableRow, sortedData } = useTable(slicedData, [
    "name",
    "email",
  ]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <div className='card'>
        <AuthExample />
      </div>
      <div className='card'>
        <TodosContext.Provider value={{todos, setTodos}}>
          <TodoList />
          <TodoResults />
          <TodoForm />
        </TodosContext.Provider>
      </div>
      <div className='card'>
        <h2>Count: {count}</h2>

        <button className='' onClick={startCount} disabled={isRunning}>Start</button>
        <button className='' onClick={stopCount} disabled={!isRunning}>Stop</button>
        <button className='' onClick={resetCount}>Reset</button>
        <hr />
        {divArr?.map((item, index) => (
          <div className='box' key={index}>
            {item}
            {count === index+1 && <span>{item} =</span>}
          </div>
        ))}
      </div>

      <div className='card'>
        <h2>Crete a Dartboard</h2>
        <hr />
        <Circle depth={12} />
      </div>

      <div className='card full-width'>
        <table>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {sortedData()?.map((item, index) => (
              <TableRow key={item?.id} item={item} />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
