import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickLeague.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import MfDP from './mfDP'
import uuid from 'react-uuid'

const socket = io.connect("http://localhost:3500");

export default function PickLeague(){
    const [league,setLeague] = useState(null);
    const [pos,setPos] = useState("");
    const [categories,setCategories] = useState(null);
    const [dataPoints,setDataPoints] = useState(15);
    const [hvp,setHvp] = useState(0);
    const [da,setDa] = useState(0);
    const [ca,setCa] = useState(0);
    const [gs,setGs] = useState(0);
    const [br,setBr] = useState(0);
    function updateHvp(){
        setHvp(hvp + 1);
        setDataPoints(dataPoints - 1);
        console.log("Pressed");
    }
    function updateDa(){
        setDa(da + 1);
        setDataPoints(dataPoints - 1);
        console.log("Pressed");
    }
    function updateCa(){
        setCa(ca + 1);
        setDataPoints(dataPoints - 1);
        console.log("Pressed");
    }
    function updateGs(){
        setGs(gs + 1);
        setDataPoints(dataPoints - 1);
        console.log("Pressed");
    }
    function updateBr(){
        setBr(br + 1);
        setDataPoints(dataPoints - 1);
        console.log("Pressed");
    }
    function sendData(){

    }

    function addCategory(){
        if(pos == "mf"){
            setCategories(<>  <div className="container-data-points">
            <div className="data-points" onClick={updateHvp}>High Volume passing :{hvp}</div>
            <div className="data-points" onClick={updateDa}>Defensive Ability :{da}</div>
            <div className="data-points" onClick={updateCa}>Creative Ability: {ca}</div>
            <div className="data-points" onClick={updateGs}>Goal Scoring: {gs}</div>
            <div className="data-points" onClick={updateBr}>Ball Retention: {br}</div>
            <div className="data-points">{dataPoints}</div>
                <div className="data-points" 
                onClick={sendData}
                >Generate Player!
                </div>
        </div>
    </>)
        }
    }
    

    function setPosDf(){
        setPos("df");
    }
    function setPosMf(){
        setPos("mf");
    }
    function setPosFw(){
        setPos("fw");
    }
    function setLeaguePrem(){
        setLeague(1);
    }
    function setLeagueBundesliga(){
        setLeague(2);
    }
    function setLeagueligue1(){
        setLeague(3);
    }
    function setLeagueSerieA(){
        setLeague(4);
    }
    function setLeagueLaLiga(){
        setLeague(5);
    }

    useEffect(() => {
        console.log(league);
    },[league])

    useEffect(() => {
        console.log(pos);
    },[pos])



    return (
        <> 
        <div className='league-container'>
                <div className='league' id='prem' onClick={setLeaguePrem}>
                    Premier League
                </div>
                <div className='league' id='bundesliga' onClick={setLeagueBundesliga}>
                    Bundesliga
                </div> 
                <div className='league' id='ligue1' onClick={setLeagueligue1}>
                    Ligue 1
                </div> 
                <div className='league' id='serieA' onClick={setLeagueSerieA}>
                    serie A
                </div> 
                <div className='league' id='laLiga' onClick={setLeagueLaLiga}>
                    Laliga
                </div>
                <div className="link">
                        <div className='next-btn' onClick={addCategory}>Next!</div>
                </div> 
        </div>
        <div className="container-position">
            <div className="position" onClick={setPosDf}>df</div>
            <div className="position" onClick={setPosMf}>mf</div>
            <div className="position" onClick={setPosFw}>fw</div>
        </div>
        <div className='data-points'>
            <MfDP hvp={hvp} ca={ca} br={br} da={da} gs={gs} updateBr={updateBr}  updateCa={updateCa} updateDa={updateDa} updateHvp={updateHvp} updateGs={updateGs} dataPoints={dataPoints} pos={pos} key={uuid}/>
        </div>
        </>
        
            )
}