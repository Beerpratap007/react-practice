function EditTodoList({editTaskValue, setEditTaskValue, saveEditedTask, cancelEditTask, todoItem}) {
  return (
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
  )
}

export default EditTodoList