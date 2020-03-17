import { useState } from 'react';

const Todo = () => {
  const [lists, setLists] = useState([]);  // リストとして追加されるもの
  const [todo, setTodo] = useState('');  // フォームの入力

  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => setLists([...lists, todo], setTodo(''))}>追加</button>
      <ul>
        {lists.map(n => (
          <li>{ n }</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
