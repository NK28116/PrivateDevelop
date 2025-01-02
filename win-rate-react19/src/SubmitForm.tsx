import { useOptimistic, useState, useRef, FormEvent } from "react";

// deliverName関数の引数と戻り値の型を定義
export async function deliverName(name: string): Promise<string> {
  console.log(typeof name);
  await new Promise((res) => setTimeout(res, 1000));
  return name;
}

// Threadコンポーネントのpropsに型を追加
interface NameItem {
  text: string;
  sending: boolean;
  key?: number; // key はReact が自動的に生成するので、必須ではない
}

interface ThreadProps {
  names: NameItem[];
  sendName: (formData: FormData) => Promise<void>;
}

function Thread({ names, sendName }: ThreadProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  // formActionの引数の型をFormDataに設定
  async function formAction(formData: FormData): Promise<void> {
    console.log(typeof formData);
    addOptimisticName(formData.get("name") as string); // 名前を文字列として扱う
    formRef.current?.reset();
    await sendName(formData);
  }

  // optimisticNamesとaddOptimisticNameに型を付ける
  const [optimisticNames, addOptimisticName] = useOptimistic<NameItem[], string>(
    names,
    (state, newName) => [
      ...state,
      {
        text: newName,
        sending: true,
      },
    ]
  );

  return (
    <>
      {optimisticNames.map((name, index) => (
        <div key={index}>
          {name.text}
          {!!name.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="name" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

// AppコンポーネントのstateとsendName関数の型を追加
export  function SubmitForm() {
  const [names, setNames] = useState<NameItem[]>([
    { text: "Hello there!", sending: false, key: 1 },
  ]);

  async function sendName(formData: FormData): Promise<void> {
    const sentName = await deliverName(formData.get("name") as string);
    setNames((names) => [...names, { text: sentName, sending: false }]);
  }

  return <Thread names={names} sendName={sendName} />;
}
