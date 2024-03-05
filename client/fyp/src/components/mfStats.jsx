import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickStats.css'
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


    function updateHvp(){
        setHvp(hvp + 1);
        setDataPoints(dataPoints - 1);
        
    }
    function updateDa(){
        setDa(da + 1);
        setDataPoints(dataPoints - 1);
    }
    function updateCa(){
        setCa(ca + 1);
        setDataPoints(dataPoints - 1);
    }
    function updateGs(){
        setGs(gs + 1);
        setDataPoints(dataPoints - 1);
    }
    function updateBr(){
        setBr(br + 1);
        setDataPoints(dataPoints - 1);
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
        <div className="container-mf">
            <div className="header-mf">Assign Points to Categories You Want Your Player to posses.</div>
            <div className="container-data-points">
                    <div className="category-container">
                        <div className="data-points" onClick={updateHvp}>
                            <div className="info">High Volume passing</div>
                            <div className="bars">{hvpDp}</div>
                        </div>
                        <div className="btn Plus"></div>
                        <div className="btn Min"></div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" onClick={updateDa}>
                            <div className="info">Defensive Ability</div>
                            <div className="bars">{daDp}</div>
                        </div>
                        <div className="btn Plus"></div>
                        <div className="btn Min"></div>
                    </div>    
                    <div className="category-container">
                        <div className="data-points" onClick={updateCa} >
                            <div className="info">Creative Ability</div>
                            <div className="bars">{caDp}</div> 
                        </div>
                        <div className="btn Plus"></div>
                        <div className="btn Min"></div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" onClick={updateGs}>
                            <div className="info">Goal Scoring</div>
                            <div className="bars">{gsDp}</div>
                        </div>
                        <div className="btn Plus"></div>
                        <div className="btn Min"></div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" onClick={updateBr}>
                            <div className="info">Ball Retention</div>
                            <div className="bars">{brDp}</div>
                        </div>
                        <div className="btn Plus"></div>
                        <div className="btn Min"></div>
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