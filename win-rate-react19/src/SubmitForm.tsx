import { useFormStatus } from "react-dom";
import {useOptimistic, useRef } from "react";
async function submitForm(query:FormData) {
    await new Promise((res) => setTimeout(res, 1000));
    return query;
}

//submitItems-> SubmitUserNameForm内で使う
//pending is true で
function SubmitItems({items,sendFunction}:{items:String,sendFunction:Function}) {
 const formRef = useRef();

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem:FormData) => [
      ...state,newItem?.append("username","")
    ]
  );
  async function formAction(formData: FormData) {
    addOptimisticItem(formData.get("username"));
    formRef.current.reset();
    await sendFunction(formData);
  }

  return (
    <>
      {optimisticItems.map((item, index) => (
        <div key={index}>
          {item.text}
          {!!item.{pending} && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

///placeHolder
function SubmitUserNameForm() {
    const { pending, data } = useFormStatus();

    //placeHolderにinputされたdata の中の"username"を取得
    const viewData=data?.get("username")
    console.log("data",viewData);

      async function sendNames(formData:FormData) {
        const sentName = await submitForm(formData.get("username"));
        setNames((names) => [...names, { text: sentName }]);
      }

    return (
        <div>
            <SubmitItems items={viewData} sendFunction={sendNames} />
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
        <SubmitUserNameForm />
        </form>
    );
}
