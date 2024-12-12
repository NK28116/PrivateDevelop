import React, { useState } from "react";

export function Rate() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    function RightUp() {
        setCount1(count1 + 1);
    }

    function LeftUp() {
        setCount2(count2 + 1);
    }

    const rate = count1 + count2 > 0 ? count1 / (count1 + count2) : 0;

    return (
        <div>
            <ObjectName />
            <RightUpCounter onRightUp={RightUp} />
            <LeftUpCounter onLeftUp={LeftUp} />
            <CountRate rate={rate} />
            count1: {count1}, count2: {count2}
        </div>
    );
}

function RightUpCounter({ onRightUp }: { onRightUp: () => void }) {
    return (
        <button onClick={onRightUp}>+1</button>

        );
}

function LeftUpCounter({ onLeftUp }: { onLeftUp: () => void }) {
    return <button onClick={onLeftUp}>+1</button>;
}

function CountRate({ rate }: { rate: number }) {
    return <div>Rate: {rate.toFixed(2)}</div>;
}

function ObjectName() {
    return<label>入力欄: <input type="text" placeholder="これがプレースホルダー"/></label>

}