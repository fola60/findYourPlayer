import React, { useState, useEffect, createContext } from 'react';
import './components/landingPage.jsx';
import LandingPage from './components/landingPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerDataPage from './components/playerDataPage.jsx';
import PosPick from './components/posPick.jsx';
import DfStats from './components/dfStats.jsx';
import MfStats from './components/mfStats.jsx';
import FwStats from './components/fwStats.jsx';
import PlayerRanks from './components/playerRanks.jsx';
import PickStats from './components/pickStats.jsx';
import ParticlesComponent from './components/particles.jsx';

export const PlayerData = createContext(1);

export const DataProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(1);
  const [playerList, setPlayerList] = useState([{}]);

  useEffect(() => {
    console.log("YIPPEEE!!");
  }, [playerId]);

  return (
    <PlayerData.Provider value={{ playerId, setPlayerId, playerList, setPlayerList }}>
      {children}
    </PlayerData.Provider>
  );
};

export default function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/player-chart" element={<PlayerDataPage />} />
          <Route path="/player-league" element={<PickStats />} />
          <Route path="/player-position" element={<PosPick />} />
          <Route path="/player-position-df" element={<DfStats />} />
          <Route path="/player-position-mf" element={<MfStats />} />
          <Route path="/player-position-fw" element={<FwStats />} />
          <Route path="/player-rank" element={<PlayerRanks />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
