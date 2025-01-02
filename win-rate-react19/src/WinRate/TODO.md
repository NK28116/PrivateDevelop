```txt
src-App
   |__WinRate:勝率計算を表示する
        |__WinRate.tsx:Appに渡す
            |__Counter.tsx:勝率，勝利数，敗北数，全試合数を表示してボタンで増減
            |__SubmitName.tsx:新規に名前を登録するボタン
```

- スプレッドシートでいいことをreact19の勉強のために作成する
- データアセットとかあればいいよね

### useOptimistic
https://qiita.com/Yasushi-Mo/items/abaddd44b92ba007e0c7
- 登録後の状態を見せることができる
  - hogeを登録したときに登録中であることを示せる
  - この時のスタイルを変えるのにuseFromStatusを使うことができてisPending=trueのときはグレーアウトさせてtrue-> falseになったら元のスタイルにあわせる，みたいなことができる

公式のuseOptimistic
```tsx
import { useOptimistic, useState, useRef } from "react";

async function deliverMessage(message:FormData) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );
  async function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    await sendMessage(formData);
  }
  
  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  
  return <Thread messages={messages} sendMessage={sendMessage} />;
}

```