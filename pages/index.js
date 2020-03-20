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
      <h1>Todoリスト</h1>
      <div>
        <div className="wrap">
          <input className="input-box" value={todo} placeholder="Todo" onChange={(e) => setTodo(e.target.value)} />
          <button className="add-button" onClick={() => todo===''?alert('入力してください'):setLists([...lists, todo], setTodo(''))}>追加</button>
        </div>
        <ul>
          {lists.map((n, index) => (
            <li key={ index }>
              { n }
              <button className="delete-button" onClick={() => removeTodo(index)}>削除</button>
            </li>
            ))}
        </ul>
      </div>

      <style>
        {`
        html, body {
          background-color: #3cad7a;
          font-size: 16px;
          letter-spacing: 0.05em;
          line-hight: 1.2;
          color: #fff;
        }

        h1 {
          text-align: center;
          color: #eee;
        }

        .wrap {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }
        
        .input-box {
          width: 300px;
          padding: 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          color: #222;
          outline: none;
        }

        .add-button {
          width: 100px;
          font-weight: 700;
          background-color: #e53935;
          margin-left: 20px;
          border-radius: 5px;
          color: #eee;
          font-size: 16px;
          cursor: pointer;
          outline: none;
          border-style: none;
        }

        .delete-button {
          width: 60px;
          background-color: #eee;
          margin-left: 10px;
          padding: 6px 10px;
          border-radius: 5px;
          color: #222;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          border-style: none;
        }

        ul {
          width: 200px;
          margin: 0 auto;
        }

        li {
          margin: 10px;
        }





        
        `}
      </style>


    </div>
  );
}

export default Todo;
