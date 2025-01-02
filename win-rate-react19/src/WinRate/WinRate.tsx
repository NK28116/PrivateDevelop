import React ,{useState}from "react";
import {LoseIncDecButton, WinIncDecButton} from "./CaluculateRateAndWLBotton";
export function WinRate ()  {
    return (
        <>
        <h3>React 19の勉強のための 勝率計算</h3>
            <Counter />
        </>
    )
};
const Counter = () => {

    const[totalWinState, setTotalWinState] = useState(0);
    const[totalLoseState, setTotalLoseState]= useState(0);
    const allGames = totalWinState + totalLoseState;
    const totalWinRate = allGames > 0 ? totalWinState / allGames : 0;
   // const SubComponent ;
    return (
        <>
        <WinIncDecButton setTotalWinState={setTotalWinState} />
        <LoseIncDecButton setTotalLoseState={setTotalLoseState} />
        <div>WinRate: {totalWinRate.toFixed(2)}</div>
        <div>Games: {allGames}</div>
        </>
    )
};
