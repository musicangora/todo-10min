const Todo = () => {
  const todos = ['todo1', 'todo2', 'todo3'];

  return (
    <>
      {todos.map(todo => (
        <h1>{ todo }</h1>
      ))}
    </>
  );
}

export default Todo;
