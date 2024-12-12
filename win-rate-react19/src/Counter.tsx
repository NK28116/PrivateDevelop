import React, { useState } from "react";

export function CounterApp() {
    const [count, setCount] = useState(0);

    function CountUp() {
        setCount(count + 1);
    }

    function CountDown() {
        setCount(count - 1);
    }

    return (
        <div>
            <GainCounter onCountUp={CountUp} />
            <DropCounter onCountDown={CountDown} />
            <CountNumber count={count} />
        </div>
    );
}

function GainCounter({ onCountUp }: { onCountUp: () => void }) {
    return <button onClick={onCountUp}>+1</button>;
}

function DropCounter({ onCountDown }: { onCountDown: () => void }) {
    return <button onClick={onCountDown}>-1</button>;
}

function CountNumber({ count }: { count: number }) {
    return <div>{count}</div>;
}
