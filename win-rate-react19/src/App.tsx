import React from 'react';
import './App.css';
import {CounterApp} from "./Counter";
import {FormTest3} from "./ActionState";
import {UseOptimisticDemo} from "./UseOpticalDemo";
import {SubmitButton,SubmitInput} from "./SubmitForm";
//import { CaluculateRateAndWLBotton} from "./WinRate/CaluculateRateAndWLBotton";
import {WinRate} from "./WinRate/WinRate";

function App() {
    return (
        <div className="App">
            <WinRate />
            {/*<CaluculateRateAndWLBotton />
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
