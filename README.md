# 10分で作る（大嘘）Todoアプリ

これは[`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)で作られた[Next.js](https://nextjs.org/)のプロジェクトです。



## 目次



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
listsはフォーム下に表示されるTodo一覧を表示するために使っている。
todoはフォームに入力した文字をフォーム内に反映するために使っている。
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





## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
