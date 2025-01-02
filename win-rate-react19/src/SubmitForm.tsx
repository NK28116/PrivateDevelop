import { useOptimistic, useState, useRef } from "react";
import { useFormStatus } from "react-dom";

async function submitForm(query:any) {
    await new Promise((res) => setTimeout(res, 1000));
}

///placeHolder付き
function SubmitNamePlaceHolder() {
    const { pending, data } = useFormStatus();
    return (
        <div>
            <h3>Submit Name: </h3>
            <input type="text" name="username" disabled={pending} />
            <button type="submit" disabled={pending}>
                Submit
            </button>
            <br />
            <p>{data ? `Submitting ${data?.get("username")}...` : ""}</p>
        </div>
    );
}

export  function SubmitInput() {
    const ref = useRef<HTMLFormElement>(null!);
    return (
        <form
            ref={ref}
            action={async (formData) => {
            await submitForm(formData);
            ref.current.reset();
            }}
        >
        <SubmitNamePlaceHolder />
        </form>
    );
}

// deliverName関数の引数と戻り値の型を定義
 async function deliverName(name: string): Promise<string> {
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
        <input type="text" name="name" placeholder="Your Name!" />
        <button type="submit">Submit</button>
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

  return (
      <Thread names={names} sendName={sendName} />

      );
}
