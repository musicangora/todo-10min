import { useState } from 'react';

const Todo = () => {
  const [lists, setLists] = useState([]);  // リストとして追加されるもの
  const [todo, setTodo] = useState('');  // フォームの入力

  const removeTodo = (todo) => {
    setLists(lists.filter(t => t !== todo));
  };

  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => setLists([...lists, todo], setTodo(''))}>追加</button>
      <ul>
        {lists.map((n, index) => (
          <li key={ index }>
            { n }
            <button onClick={() => removeTodo(n)}>削除</button>
          </li>
          ))}
      </ul>
    </div>
  );
}

export default Todo;
