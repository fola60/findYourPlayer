import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/fwStats.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect("http://localhost:3500");



export default function FwStats(){

    const [dataPoints,setDataPoints] = useState(15);
    const [hvp,setHvp] = useState(0);
    const [da,setDa] = useState(0);
    const [ca,setCa] = useState(0);
    const [gs,setGs] = useState(0);
    const [br,setBr] = useState(0);

    const [hvpDp,setHvpDp] = useState([]);
    const [daDp,setDaDp] = useState([]);
    const [caDp,setCaDp] = useState([]);
    const [gsDp,setGsDp] = useState([]);
    const [brDp,setBrDp] = useState([]);
    
    const [players,setPlayers] = useState(null);
    const [bar,setBar] = useState([<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,]);


    
    useEffect(() => {
        setBar([]);
        setHvpDp([]);
        setDaDp([]);
        setCaDp([]);
        setGsDp([]);
        setBrDp([]);

        let bars = [];
        for(let i = 0;i < dataPoints;i++){
            bars.push(<div className='bar'></div>)
        }
        setBar(bars);

        let barsHvp = [];
        for(let i = 0;i < hvp;i++){
            barsHvp.push(<div className='bar'></div>)
        }
        setHvpDp(barsHvp);

        let barsDa = [];
        for(let i = 0;i < da;i++){
            barsDa.push(<div className='bar'></div>)
        }
        setDaDp(barsDa);

        let barsCa = [];
        for(let i = 0;i < ca;i++){
            barsCa.push(<div className='bar'></div>)
        }
        setCaDp(barsCa);

        let barsGs = [];
        for(let i = 0;i < gs;i++){
            barsGs.push(<div className='bar'></div>)
        }
        setGsDp(barsGs);

        let barsBr = [];
        for(let i = 0;i < br;i++){
            barsBr.push(<div className='bar'></div>)
        }
        setBrDp(barsBr);
     },[dataPoints]);

    useEffect(() => {
        socket.on("receive_players", (data) => {
            setPlayers(data);
        });
    },[socket]);
    
    useEffect(() =>{
        console.log("socket Triggered data:" + players);
    },[players]);


    function incrementHvp(){
        if(dataPoints > 0){
            setHvp(hvp + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementHvp(){
        if(hvp > 0) {
            setHvp(hvp -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementDa(){
        if(dataPoints > 0){
            setDa(da + 1);
            setDataPoints(dataPoints - 1);
        }
    }

    function decrementDa(){
        if(da > 0) {
            setDa(da -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementCa(){
        if(dataPoints > 0){
            setCa(ca + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementCa(){
        if(ca > 0) {
            setCa(ca -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementGs(){
        if(dataPoints > 0){
            setGs(gs + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementGs(){
        if(gs > 0) {
            setGs(gs -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementBr(){
        if(dataPoints > 0){
            setBr(br + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementBr(){
        if(br > 0) {
            setBr(br -1);
            setDataPoints(dataPoints + 1);
        }
    }


    function sendData(){
        if (dataPoints <= 0){
            socket.emit("send_data_points",{hvp:hvp,da:da,ca:ca,gs:gs,br:br})
        }
        socket.on("receive_players", (data) => {
            setPlayers(data);
        })
        socket.emit("send_player_data",players);

    }

    return (
        <>
            <div className="container-fw">
            <div className="header-fw">Assign Points to Categories You Want Your Player to posses.</div>
            <div className="container-data-points">
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">High Volume passing</div>
                            <div className="bars">{hvpDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementHvp}>+</div>
                            <div className="btn Min" onClick={decrementHvp}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Defensive Ability</div>
                            <div className="bars">{daDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementDa}>+</div>
                            <div className="btn Min" onClick={decrementDa}>-</div>
                        </div>
                    </div>    
                    <div className="category-container">
                        <div className="data-points"  >
                            <div className="info">Creative Ability</div>
                            <div className="bars">{caDp}</div> 
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementCa}>+</div>
                            <div className="btn Min" onClick={decrementCa}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Goal Scoring</div>
                            <div className="bars">{gsDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementGs}>+</div>
                            <div className="btn Min" onClick={decrementGs}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Ball Retention</div>
                            <div className="bars">{brDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementBr}>+</div>
                            <div className="btn Min" onClick={decrementBr}>-</div>
                        </div>
                    </div>
                    <div className="data-count">
                        <div>Points</div>
                        <div className="bars">{bar}</div>
                    </div>
                
            </div>
            <div className="btn-player">
                <Link to="player-rank" className="link">
                    <div className="btn-generate" 
                    onClick={sendData}
                    >Generate Player!</div>
                </Link>
            </div>
        </div>
        </>
    )
}