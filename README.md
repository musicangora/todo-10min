# 10分で作りたい……Todoアプリ

これは[`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)で作られた[Next.js](https://nextjs.org/)のプロジェクトです。



## 目次



## はじめに

React.jsをちょっと勉強したのでお約束のTodoアプリを作りつつ、これまで学んだ内容をまとめようと思った。

React.jsで作っても良かったけど、「更新がまあまああって」「ユーザにローディングを見せたくない」のでサーバ側でレンダリングしてくれるNext.jsが良いのかな〜〜〜という感じで採用した。

いまいち何を作るときに何を使えばいいかわかっていない。[このサイト](https://watablogtravel.com/cra-create-react-app-next-js-gatsby%E3%80%90-%E3%81%A9%E3%81%86%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%82%8B%E3%81%AE%E3%81%8B%EF%BC%9F%E3%80%91/#Gatsby-2)に書いてあることを信じています。


## ステップ0: セットアップ

create-next-appを使ってNext.jsをセットアップする。プロジェクトを新しく作成するには次のコマンドを実行する。

```bash
$ npm init next-app 
```


指示に従って入力していくと必要なものがすべてインストールされる。インストールが完了したら以下のコマンドでサーバを起動する。

```bash
$ npm run dev 
```


[http://localhost:3000](http://localhost:3000)にアクセスしてページが表示されることを確認する。



## ステップ1: コードの書き方を確認する

とりあえずHello World!してみたいので、`page/index.js`を開いて書いてあるコードをすべて消す。
以下のコードを入力する。

```js
export default () => (
    <h1>Hello World!</h1>
)
```


ブラウザで[http://localhost:3000](http://localhost:3000)にアクセスしてみる。
Hello World!できてれば大丈夫。


### 🤔何してるの？

`export default ○○`で○○をコンポーネントとして出力している。
今回はアロー関数を使って`<h1>`要素を返す関数を出力させている。



## ステップ2: コード内に記述したTodoを表示させる

`page/index.js`を以下のように編集する。

``` jsx
const Todo = () => {
  const todos = ['todo1', 'todo2', 'todo3'];

  return (
    <div>
      {todos.map(todo => (
        <h1>{ todo }</h1>
      ))}
    </div>
  );
}

export default Todo;
```

ブラウザで[http://localhost:3000](http://localhost:3000)にアクセスしてみる。

```
todo1
todo2
todo3
```
が表示されていればOK。



### 🤔何してるの？

Todoを格納するtodos配列を作って、map関数で配列の中身を展開し`<h1>`要素で表示している。JSとhtmlが混在していて初見だと気持ち悪いかもしれないが、JSとhtmlを組み合わせて記述できるJSXという記法を使うので慣れるしかない。

```jsx
<htmlタグ>{ JS <htmlタグ>{ JS }</htmlタグ>}</htmlタグ>
```


こんな感じで使う。波括弧の中はJSが書いてある認識でいいはず。



## ステップ3: ブラウザ上でTodoを入力できるようにする

`page/index.js`を以下のように編集する。

```jsx
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
```


入力フォームと追加ボタンが新たに表示されていればOK
この段階では追加ボタンを押しても何も起きない。


## ステップ4: Hookを使ってブラウザ上でTodoを追加できるようにする
`page/index.js`を以下のように編集する。

```jsx
import { useState } from 'react';

const Todo = () => {
  const [lists, setLists] = useState([]);  // リストとして追加されるもの
  const [todo, setTodo] = useState('');  // フォームの入力

  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => setLists([...lists, todo]), setTodo('')}>追加</button>
      <ul>
        {lists.map(n => (
          <li>{ n }</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
```

処理の内容を分かりやすくするために変数名を`todos -> lists`に、map関数内を`todo -> n`に変更した。
ブラウザ上のフォームに入力したTodoが下に追加されていけばOK


### 🤔何してるの？
1行目`import { useState } from 'react'`で`useState`Hookをインポートしている。
Hookは`const [value, setValue] = useState(initValue)`の形で書けば使える。便利。

`<input value={todo} onChange={(e) => setTodo(e.target.value)} />`でフォームに入力された値(`value={todo}`)を取得し、フォームに変更があったらそれをフォームに反映(`onChange={(e) => setTodo(e.target.value)}`)している。


追加ボタンが押されるとリストの最後に、フォームに入力されたTodoを追加(`onClick={() => setLists([...lists, todo])}`)し、フォームをリセット(`setTodo('')`)している。



### 🥺Hookってなに？ぴえんぴえん

> フック (hook) は React 16.8 で追加された新機能です。state などの React の機能を、クラスを書かずに使えるようになります。
> [Hooks React Docs](https://ja.reactjs.org/docs/hooks-overview.html)

これまでstate(状態)を管理するようなものを実装するにはクラスを使わなければならなかった。


しかし、どうやらクラスを使うと人間もコンピュータも混乱するらしい。


そこで1つの機能を1つの関数として1つの場所に記述することで混乱を減らせるだろうと関数に状態を持てるようにしたのがHookらしい。


Reactからクラスが削除されることはないらしいので、クラスを使い続けていても問題はないらしい。
クラスでしか実装できないものもあるらしい？
Hookへの移行を急ぐ必要はないけれど少しづつ導入していけばいいらしい？
初心者なのでよくわからない……

## ステップ5: 削除ボタンを実装する
`page/index.js`を以下のように編集する。

```jsx
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
        {lists.map(n => (
          <li>
            { n }
            <button onClick={() => removeTodo(n)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
```

ブラウザ上で追加したTodoの横に削除ボタンが表示されて、押すとTodoが消えればOK

このステップまでで一応Todoアプリとして機能するものが完成する


### 🤔何してるの？
`removeTodo`でTodoを削除する処理を記述している。

`lists.filter(t => t !== todo)`でTodoリストの中から、削除したいTodoの文字列と異なるものを取り出してそれらを`setLists`でTodoリストに追加し直している。

## ステップ6: warningを消す

ステップ5の状態でブラウザのconsole.logを見ると__warning__が出ている。

これは「各Todoに個別のIDがついてないよ〜〜」という旨のwarningである。別に無視していても動きはするが、処理が最適になっていない。

Reactでは個別のIDであるkeyを使って、VirtualDOMから実際のDOMに反映するときの更新を最小限にしているらしい。keyがあることによって、keyを頼りに書き換わっているものだけを取り出すことができる。

どうやらkeyはつけたほうがいいらしいので、keyを追加する。

ということで、`page/index.js`を以下のように編集する。

```jsx
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
```

### 🤔何してるの？

`<li>`に`key={ index }`を追加してkeyを設定してあげた。


## ステップ7: 処理を見直す

ステップ6まででTodoアプリとして機能しwarningも消えたが、このままではちょっと困った仕様がある。

Todoリストから削除する際に`filter`を使って消したいTodoと同じ文字列のものを削除している。したがって、全く同じTodoがリストに複数存在する場合、どれかひとつでも削除すると他のTodoもすべて消えてしまう。

これを解消するために削除の処理を見直す。

さらに、このままでは空のTodoも登録できてしまうので空のTodoは登録できないように警告を出す。

ということで、`page/index.js`を以下のように編集する。

```jsx
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
```

### 🤔何してるの？

ステップ6で追加したkeyであるindexは固有のものなので、各Todoを一意に識別できる。これを使って削除してあげる。

これまでと同様に`filter`を使ってkeyが異なるものだけを取り出して新しい配列に格納して、それをもとにリストを更新する。keyが増えたので`filter`に引数が増えてることに注意。

コメントアウトしてるが`slice`で配列のなかからTodoを切り取ってあげてもいい。

また、追加ボタンを`onClick`したときに三項演算子を使って空白なら`alert`を出す処理を追加している。



## ステップ8: CSSを追加して見た目を整える

これで機能も仕様もいい感じになったので、最後にCSSで見た目を整える。

Next.jsではjsファイルの中にCSSを記述することができるので、`page/index.js`にCSSを追加する。

```jsx
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

```

## ㊗️完成！！！！！🎉

完成した！！！おめでとう！！！！


## 感想
まとめながら作ったので恐ろしく時間がかかった。疲れた……。



## もっと知りたい？

Next.jsについてもっと知りたいなら以下のサイトを見てみるといいかも: 

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## ZEIT Nowでデプロイした

```bash
$ now
```
でデプロイが終わる神ツールで[デプロイしました](https://todo-10min-k9d8exxbt.now.sh/)

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 参考
- [Todo app in 10 minute using nextjs](https://youtu.be/yglkCznd7rg)
- [初めてのReact「入門編」導入から基本まで〜TODOアプリを作ってを学ぼう！](https://webkikaku.co.jp/homepage/blog/hpseisaku/javascript/react-start/)
- [CRA (Create React App), Next.JS, Gatsby【 どう使い分けるのか？】](https://watablogtravel.com/cra-create-react-app-next-js-gatsby%E3%80%90-%E3%81%A9%E3%81%86%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%82%8B%E3%81%AE%E3%81%8B%EF%BC%9F%E3%80%91/#Gatsby-2)
- [フックの導入](https://ja.reactjs.org/docs/hooks-intro.html#motivation)
- [最近Reactを始めた人向けのReact Hooks入門](https://sbfl.net/blog/2019/11/12/react-hooks-introduction/)
- [React.jsの地味だけど重要なkeyについて](https://qiita.com/koba04/items/a4d23245d246c53cd49d)


## 追記
よくよく調べたら、全く同じ内容のQiitaが先に存在していたので、ありがたく参考にさせてもらった

[NEXT.jsとReact Hooksを使ってTodoアプリを10分で作る](https://qiita.com/hiraike32/items/71b14755f56208a8a133)
