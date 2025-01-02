import React from 'react';
import './App.css';
import {SubmitForm} from "./SubmitForm";
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
            <SubmitButton /> <SubmitInput />
            */}


            <SubmitForm />
        </div>
    );
}

export default App;
