import React from 'react';
import './App.css';
import {SubmitInput} from "./SubmitForm";
import {WinRate} from "./WinRate/WinRate";

function App() {
    return (
        <div className="App">
            <WinRate />
            {/*
            <CaluculateRateAndWLBotton />
            <UseOptimisticDemo />
            <CounterApp />
            <FormTest3 />
            <SubmitButton />
            */}

            <SubmitInput />
        </div>
    );
}

export default App;
