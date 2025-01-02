import React ,{useState}from "react";
import { useActionState } from "react"; // Assuming useActionState is a custom hook

// Increment function
async function increment(previousState: number): Promise<number> {
  return previousState + 1;
}

// Decrement function
async function decrement(previousState: number): Promise<number> {
  return previousState - 1;
}

// Custom hook for incrementing state
function useIncrementState() {
  const [stateInc, formAction] = useActionState(increment, 0);
  return { stateInc, formAction };
}

// Custom hook for decrementing state
function useDecrementState() {
  const [stateDec, formAction] = useActionState(decrement, 0);
  return { stateDec, formAction };
}


export function WinIncDecButton({setTotalWinState,}: {  setTotalWinState: React.Dispatch<React.SetStateAction<number>>;}){
    const { stateInc, formAction: incrementAction } = useIncrementState();
    const { stateDec, formAction: decrementAction } = useDecrementState();
    const totalWinState = stateInc + stateDec;
    setTotalWinState(totalWinState);
    return (

        <div>

        <h3>~勝利数:{totalWinState}~</h3>

        <form method="post" action={incrementAction}>
            {/* Displaying and using increment state
            <div>Increment State: {stateInc}</div> */}
            <button type="submit">+</button>
        </form>

        <form method="post" action={decrementAction}>
            {/* Displaying and using decrement state
            <div>Decrement State: {stateDec}</div> */}
            <button type="submit">-</button>
        </form>
        </div>
    );
}

export  function LoseIncDecButton({setTotalLoseState,}: {  setTotalLoseState: React.Dispatch<React.SetStateAction<number>>;  }){
    const { stateInc, formAction: incrementAction } = useIncrementState();
    const { stateDec, formAction: decrementAction } = useDecrementState();
    const totalLoseState =  stateInc + stateDec;
    setTotalLoseState(totalLoseState);

    return (
        <div>
        <h3>~敗北数:{totalLoseState}~</h3>
        <form method="post" action={incrementAction}>
            {/* Displaying and using increment state
            <div>Increment State: {stateInc}</div>*/}
            <button type="submit">+</button>
        </form>

        <form method="post" action={decrementAction}>
            {/* Displaying and using decrement state
            <div>Decrement State: {stateDec}</div>*/}
            <button type="submit">-</button>
        </form>
        </div>
    );
}


