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

## ステップ3: ブラウザ上でTodoを追加できるようにする



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
