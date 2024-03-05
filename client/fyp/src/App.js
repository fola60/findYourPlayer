import React, {useState, useEffect} from 'react'
import './components/landingPage.jsx'
import LandingPage from './components/landingPage.jsx'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlayerDataPage from './components/playerDataPage.jsx'
import PosPick from './components/posPick.jsx'
import DfStats from './components/dfStats.jsx'
import MfStats from './components/mfStats.jsx'
import FwStats from './components/fwStats.jsx'
import PlayerRanks from './components/playerRanks.jsx'
import PickStats from './components/pickStats.jsx'

export default function App() {
  

  
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/player-chart">
            <PlayerDataPage />
          </Route>
          <Route exact path="/player-league">
            <PickStats/>
          </Route>
          <Route exact path="/player-position">
            <PosPick/>
          </Route>
          <Route exact path="/player-position-df">
            <DfStats/>
          </Route>
          <Route exact path="/player-position-mf">
            <MfStats/>
          </Route>
          <Route exact path="/player-position-fw">
            <FwStats/>
          </Route>
          <Route exact path="/player-rank">
            <PlayerRanks/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}
