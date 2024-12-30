import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DownCounter, Square,Triangle,UpCounter} from "./Button";
import {CounterApp} from "./Counter";
import {Rate} from "./Rate";
import {FormTest3} from "./ActionState";

function App() {
    return (
        <div className="App">
        {/* <Square /> */}
        {/*  <Triangle /> */}
        {/* <UpCounter /> */}
        {/* <DownCounter /> */}
 <CounterApp />
      <Rate />
      <FormTest3 />
    </div>
  );
}

export default App;
