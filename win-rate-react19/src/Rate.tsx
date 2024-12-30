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
            win: {count1}, lose: {count2},all game: {count1 + count2}
        </div>
    );
}
function ObjectName() {
    return<label>相手キャラ: <input type="text" placeholder="これがプレースホルダー"/></label>
}
function RightUpCounter({ onRightUp }: { onRightUp: () => void }) {
    return (
        <button onClick={onRightUp}>win:+1</button>
        );
}

function LeftUpCounter({ onLeftUp }: { onLeftUp: () => void }) {
    return <button onClick={onLeftUp}>lose:+1</button>;
}

function CountRate({ rate }: { rate: number }) {
    return <div>WinRate: {rate.toFixed(2)}</div>;
}