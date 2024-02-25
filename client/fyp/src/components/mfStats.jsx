import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickLeague.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import '../styles/mfStats.css'

const socket = io.connect("http://localhost:3500");

export default function MfStats(){
    const [dataPoints,setDataPoints] = useState(15);
    const [hvp,setHvp] = useState(0);
    const [da,setDa] = useState(0);
    const [ca,setCa] = useState(0);
    const [gs,setGs] = useState(0);
    const [br,setBr] = useState(0);
    const [getPos,setGetPos] = useState(null);
    const [getLeague,setGetLeague] = useState();
    useEffect(() => {
        socket.on("received_position", (data) =>{
            setGetPos(data.position);
        })
    },[dataPoints]);
    const [league,setLeague] = useState(null);

    useEffect(() => {
        socket.on("received_league", (data) =>{
            setGetLeague(data);
        })
        console.log("League" + getLeague);
    },[dataPoints]);
    useEffect(() => {
        socket.on("received_league",(data) =>{
            setGetLeague(data.league);
        })
    },[dataPoints]);
    


    function updateHvp(){
        setHvp(hvp + 1);
        setDataPoints(dataPoints - 1)
    }
    function updateDa(){
        setDa(da + 1);
        setDataPoints(dataPoints - 1)
    }
    function updateCa(){
        setCa(ca + 1);
        setDataPoints(dataPoints - 1)
    }
    function updateGs(){
        setGs(gs + 1);
        setDataPoints(dataPoints - 1)
    }
    function updateBr(){
        setBr(br + 1);
        setDataPoints(dataPoints - 1)
    }
    function sendData(){
        if (dataPoints <= 0){
            socket.emit("send_data_points",{hvp:hvp,da:da,ca:ca,gs:gs,br:br})
        }
        console.log("Position:" + getPos + "League:" + getLeague);
        const sendPlayerData = async () => {
            try {
                const response = await fetch(`allValue/pos/${getPos}/league/${league}`);
                const result = await response.json();
                socket.emit("send_player_data", result);
               
            } catch (error) {
                console.error('Error fetching data ', error);
            }
        }
        sendPlayerData();
    }
    

    return (
        <>  <div className="container-data-points">
                <div className="data-points" onClick={updateHvp}>High Volume passing :{hvp}</div>
                <div className="data-points" onClick={updateDa}>Defensive Ability :{da}</div>
                <div className="data-points" onClick={updateCa}>Creative Ability: {ca}</div>
                <div className="data-points" onClick={updateGs}>Goal Scoring: {gs}</div>
                <div className="data-points" onClick={updateBr}>Ball Retention: {br}</div>
                <div className="data-points">{dataPoints}</div>
                <Link to="player-rank">
                    <div className="data-points" 
                    onClick={sendData}
                    >Generate Player!</div>
                </Link>
            </div>
        </>
    )
}