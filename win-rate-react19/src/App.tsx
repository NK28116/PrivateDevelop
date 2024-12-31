import React from 'react';
import useRef from 'react';
import logo from './logo.svg';
import './App.css';
import {DownCounter, Square,Triangle,UpCounter} from "./Button";
import {CounterApp} from "./Counter";
import {Rate} from "./Rate";
import {FormTest3} from "./ActionState";
import {UseOptimisticDemo} from "./UseOpticalDemo";
import {SubmitButton,SubmitInput} from "./SubmitForm";

function App() {
    return (
        <div className="App">
        {/* <Square /> */}
        {/*  <Triangle /> */}
        {/* <UpCounter /> */}
        {/* <DownCounter /> <Rate /> */}
    <CounterApp />
    <br/>
    <SubmitButton />
    <SubmitInput />

    <FormTest3 />
    <br/>
    <UseOptimisticDemo />
    </div>
  );
}

export default App;
