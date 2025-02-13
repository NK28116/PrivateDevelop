import React from 'react';
import './App.css';
import {SubmitForm} from "./SubmitForm";
import {WinRate} from "./WinRate/WinRate";
import WinRateList from "./WinRateList";

function App() {
    console.log(WinRate)
    return (
        <div className="App">
            <h3>React 19の勉強のための 勝率計算</h3>
            <WinRate />
            {/*
            <CaluculateRateAndWLBotton />
            <UseOptimisticDemo />
            <CounterApp />
            <FormTest3 />
            <SubmitButton />
            <SubmitInput />
            */}
            <SubmitForm />
            <WinRateList />
        </div>
    );
}

export default App;
