import React, { useState, ChangeEvent, FormEvent } from 'react';

export  const submitTable: React.FC = () => {
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
