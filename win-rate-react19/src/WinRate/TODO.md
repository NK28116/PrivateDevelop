```txt
src-App
   |__WinRate:勝率計算を表示する
        |__WinRate.tsx:Appに渡す
            |__Counter.tsx:勝率，勝利数，敗北数，全試合数を表示してボタンで増減
            |__SubmitName.tsx:新規に名前を登録するボタン
```

- スプレッドシートでいいことをreact19の勉強のために作成する
- データアセットとかあればいいよね

```tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

const App: React.FC = () => {
  // 入力されたデータを保存するためのstate
  const [inputData, setInputData] = useState<string>(''); // 入力フィールドの状態
  const [items, setItems] = useState<string[]>([]); // 入力されたアイテムのリスト

  // フォームが送信されたときの処理
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ
    if (inputData.trim()) {
      setItems([...items, inputData]); // 入力されたデータをリストに追加
      setInputData(''); // 入力フィールドをクリア
    }
  };

  // 入力内容の変更を管理するための関数
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  return (
    <div>
      <h1>情報一覧</h1>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="情報を入力してください"
        />
        <button type="submit">追加</button>
      </form>

      {/* 一覧表示 */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```