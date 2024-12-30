import { useActionState } from "react";


async function increment(previousState:number): Promise<number> {
  return previousState + 1;
}

async function decrement(previousState:number): Promise<number> {
  return previousState - 1;
}

function ObjectName() {
    return<label>相手キャラ: <input type="text" placeholder="これがプレースホルダー"/></label>
}

function CountRate({ rate }: { rate: number }) {
    return <div>WinRate: {rate.toFixed(2)}</div>;
}
export function CounterApp() {
  const [stateWin, formAction] = useActionState(increment, 0);
  const [stateLose, formAction2] = useActionState(decrement, 0);

  return (

    <form>
    <ObjectName/>
      {stateWin}
      <button formAction={formAction}>statewinIncrement</button>
      {stateLose}
      <button formAction={formAction2}>stateloseDecrement</button>
    </form>
  )
}