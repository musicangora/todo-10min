import { useState } from 'react';

const Todo = () => {
  const [lists, setLists] = useState([]);  // リストとして追加されるもの
  const [todo, setTodo] = useState('');  // フォームの入力

  const removeTodo = (index) => {
    // sliceを使うver.
    // const newlists = [...lists.slice(0, index), ...lists.slice(index+1)];

    // filterを使うver.
    const newlists = lists.filter((t, tindex) => index !== tindex);
    setLists(newlists);
  };

  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => todo===''?alert('入力してください'):setLists([...lists, todo], setTodo(''))}>追加</button>
      <ul>
        {lists.map((n, index) => (
          <li key={ index }>
            { n }
            <button onClick={() => removeTodo(index)}>削除</button>
          </li>
          ))}
      </ul>
    </div>
  );
}

export default Todo;
