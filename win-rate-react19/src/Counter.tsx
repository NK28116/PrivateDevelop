import { useActionState,useState } from "react";


async function increment(previousState:number): Promise<number> {
  return previousState + 1;
}

function useIncrmentState({}) {
    const [state, formAction] = useActionState(increment, 0);
    return (

        <form>
       {state}
        <button formAction={formAction}>stateIncrement</button>
        </form>
    )
}

async function decrement(previousState:number): Promise<number> {
  return previousState - 1;
}

function useDecrmentState({}) {
    const [state, formAction] = useActionState(decrement, 0);
    return (
        <form>
        {state}
        <button formAction={formAction}>stateDecrement</button>
        </form>
    )
}


export function CounterApp() {

    return (
        <>
            {useIncrmentState({})}
            {useDecrmentState({})}
        </>
    )
}