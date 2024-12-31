import React from "react";
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

// Main component
export function CounterApp() {
  // Using the custom hooks for increment and decrement
  const { stateInc, formAction: incrementAction } = useIncrementState();
  const { stateDec, formAction: decrementAction } = useDecrementState();

  // Calculating the total state
  const totalState = stateInc + stateDec;

  return (
    <div>
      <div>Total State: {totalState}</div>

      <form method="post" action={incrementAction}>
        {/* Displaying and using increment state */}
        <div>Increment State: {stateInc}</div>
        <button type="submit">Increment</button>
      </form>

      <form method="post" action={decrementAction}>
        {/* Displaying and using decrement state */}
        <div>Decrement State: {stateDec}</div>
        <button type="submit">Decrement</button>
      </form>
    </div>
  );
}
