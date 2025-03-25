import React ,{useState}from "react";

export function Square(){
    return        <button>X</button>;
}

export function Triangle(){
    return        <button>A</button>;
}

export function UpCounter(){
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    );
}

export function DownCounter(){
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count - 1);
    }
    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    );
}


