import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/dfStats.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect("http://localhost:3500");



export default function DfStats(){

    const [dataPoints,setDataPoints] = useState(20);
    const [bpa,setbpa] = useState(0);
    const [da,setDa] = useState(0);
    const [pr,setpr] = useState(0);
    const [aggr,setaggr] = useState(0);
    const [br,setBr] = useState(0);
    const [attabb,setattabb] = useState(0);

    const [bpaDp,setbpaDp] = useState([]);
    const [daDp,setDaDp] = useState([]);
    const [prDp,setprDp] = useState([]);
    const [aggrDp,setaggrDp] = useState([]);
    const [brDp,setBrDp] = useState([]);
    const [attabbDp,setattabbDp] = useState([]);
    
    const [players,setPlayers] = useState(null);
    const [bar,setBar] = useState([<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,]);


    
    useEffect(() => {
        setBar([]);
        setbpaDp([]);
        setDaDp([]);
        setprDp([]);
        setaggrDp([]);
        setBrDp([]);

        let bars = [];
        for(let i = 0;i < dataPoints;i++){
            bars.push(<div className='bar'></div>)
        }
        setBar(bars);

        let barsbpa = [];
        for(let i = 0;i < bpa;i++){
            barsbpa.push(<div className='bar'></div>)
        }
        setbpaDp(barsbpa);

        let barsDa = [];
        for(let i = 0;i < da;i++){
            barsDa.push(<div className='bar'></div>)
        }
        setDaDp(barsDa);

        let barspr = [];
        for(let i = 0;i < pr;i++){
            barspr.push(<div className='bar'></div>)
        }
        setprDp(barspr);

        let barsaggr = [];
        for(let i = 0;i < aggr;i++){
            barsaggr.push(<div className='bar'></div>)
        }
        setaggrDp(barsaggr);

        let barsBr = [];
        for(let i = 0;i < br;i++){
            barsBr.push(<div className='bar'></div>)
        }
        setBrDp(barsBr);

        let barsattabb = [];
        for(let i = 0; i < attabb;i++){
            barsattabb.push(<div className='bar'></div>)
        }
        setattabbDp(barsattabb);

     },[dataPoints]);

    useEffect(() => {
        socket.on("receive_players", (data) => {
            setPlayers(data);
        });
    },[socket]);
    
    useEffect(() =>{
        console.log("socket Triggered data:" + players);
    },[players]);


    function incrementbpa(){
        if(dataPoints > 0){
            setbpa(bpa + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementbpa(){
        if(bpa > 0) {
            setbpa(bpa -1);
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

    function incrementpr(){
        if(dataPoints > 0){
            setpr(pr + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementpr(){
        if(pr > 0) {
            setpr(pr -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementaggr(){
        if(dataPoints > 0){
            setaggr(aggr + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementaggr(){
        if(aggr > 0) {
            setaggr(aggr -1);
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

    function incrementattabb(){
        if(dataPoints > 0){
            setattabb(attabb + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementattabb(){
        if(attabb > 0) {
            setattabb(attabb -1);
            setDataPoints(dataPoints + 1);
        }
    }


    function sendData(){
        if (dataPoints <= 0){
            //socket.emit("send_data_points",{bpa:bpa,da:da,pr:pr,aggr:aggr,br:br})
        }
        socket.on("receive_players", (data) => {
            setPlayers(data);
        })
        socket.emit("send_player_data",players);

    }

    return (
        <>
            <div className="container-df">
            <div className="header-df">Assign Points to Categories You Want Your Player to posses.</div>
            <div className="container-data-points">
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Ball Playing Ability</div>
                            <div className="bars">{bpaDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementbpa}>+</div>
                            <div className="btn Min" onClick={decrementbpa}>-</div>
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
                            <div className="info">Press Resitance</div>
                            <div className="bars">{prDp}</div> 
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementpr}>+</div>
                            <div className="btn Min" onClick={decrementpr}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Aggressiveness</div>
                            <div className="bars">{aggrDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementaggr}>+</div>
                            <div className="btn Min" onClick={decrementaggr}>-</div>
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
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Attacking Ability</div>
                            <div className="bars">{attabbDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementattabb}>+</div>
                            <div className="btn Min" onClick={decrementattabb}>-</div>
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