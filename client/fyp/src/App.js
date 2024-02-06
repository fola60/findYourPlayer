import React, {useState, useEffect} from 'react'
import './components/landingPage.jsx'
import LandingPage from './components/landingPage.jsx'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PlayerDataPage from './components/playerDataPage.jsx'

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
        </Switch>
      </Router>
    </>
  )
}
