// WinRateList.tsx
import React, { useState, useEffect } from 'react';
import { SubmitForm } from './SubmitForm';
import { WinRate } from './WinRate/WinRate';

type PlayerState = {
  Name: string;
  WinRate: {
    Winrate: number;  // 勝率（%）
    Allgame: number;  // 総対戦数
    WinGame: number;  // 勝利数
    LoseGame: number; // 敗北数
  }
}

const WinRateList = () => {
  const [players, setPlayers] = useState<PlayerState[]>([]);
const [winRate, setWinRate] = useState<{ [key: string]: {
  Winrate: number;
  Allgame: number;
  WinGame: number;
  LoseGame: number;
} }>({});
  useEffect(() => {
    // Assuming you have a function to fetch player data
    const fetchPlayers = async () => {
      const playersData = await fetch('/api/players');
      const playersJson = await playersData.json();
      setPlayers(playersJson);
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    // Assuming you have a function to calculate win rate
    const calculateWinRate = (players: PlayerState[]) => {
      const winRate = players.reduce((acc:{[key: string]: {Winrate: number, Allgame: number, WinGame: number, LoseGame: number}}, player) => {
        acc[player.Name] = {
          Winrate: (player.WinRate.WinGame / player.WinRate.Allgame) * 100,
          Allgame: player.WinRate.Allgame,
          WinGame: player.WinRate.WinGame,
          LoseGame: player.WinRate.LoseGame,
        };
        return acc;
      }, {});
      setWinRate(winRate);
    };
    calculateWinRate(players);
  }, [players]);

  return (
    <div>
      <h1>Win Rate List</h1>
      <ul>
        {players.map((player) => (
          <li key={player.Name}>
            <span>{player.Name}</span>
            <span>Win Rate: {winRate[player.Name].Winrate}%</span>
            <span>Total Games: {winRate[player.Name].Allgame}</span>
            <span>Win Games: {winRate[player.Name].WinGame}</span>
            <span>Lose Games: {winRate[player.Name].LoseGame}</span>
          </li>
        ))}
      </ul>
      <SubmitForm />
      <WinRate />
    </div>
  );
};

export default WinRateList;