import React ,{useState}from "react";
import {LoseIncDecButton, WinIncDecButton} from "./CaluculateRateAndWLBotton";
export function WinRate ()  {
    return (
        <>
            <Counter />
        </>
    )
};
const Counter = () => {

    const[totalWinState, setTotalWinState] = useState(0);
    const[totalLoseState, setTotalLoseState]= useState(0);
    const allGames = totalWinState + totalLoseState;
    const totalWinRate = allGames > 0 ? totalWinState / allGames : 0;
    return (
        <>
        <WinIncDecButton setTotalWinState={setTotalWinState} />
        <LoseIncDecButton setTotalLoseState={setTotalLoseState} />
        <div>WinRate: {totalWinRate.toFixed(2)}</div>
        <div>Games: {allGames}</div>
        </>
    )
};
