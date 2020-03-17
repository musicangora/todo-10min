const Todo = () => {
  const todos = ['todo1', 'todo2', 'todo3'];

  return (
    <div>
      <input />
      <button>追加</button>
      {todos.map(todo => (
        <h1>{ todo }</h1>
      ))}
    </div>
  );
}

export default Todo;
