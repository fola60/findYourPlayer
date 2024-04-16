import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/dfStats.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect("http://13.48.124.9:80");



export default function DfStats(){
    const [path,setPath] = useState("player-position-df")

    const [dataPoints,setDataPoints] = useState(20);
    const [bpa,setbpa] = useState(0);
    const [da,setDa] = useState(0);
    const [pr,setpr] = useState(0);
    const [aggr,setaggr] = useState(0);
    const [passv,setpassv] = useState(0);
    const [attabb,setattabb] = useState(0);

    const [bpaDp,setbpaDp] = useState([]);
    const [daDp,setDaDp] = useState([]);
    const [prDp,setprDp] = useState([]);
    const [aggrDp,setaggrDp] = useState([]);
    const [passvDp,setpassvDp] = useState([]);
    const [attabbDp,setattabbDp] = useState([]);
    
    const [players,setPlayers] = useState(null);
    const [bar,setBar] = useState([<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,<div className='bar-df'></div>,]);


    
    useEffect(() => {
        setBar([]);
        setbpaDp([]);
        setDaDp([]);
        setprDp([]);
        setaggrDp([]);
        setpassvDp([]);

        let bars = [];
        for(let i = 0;i < dataPoints;i++){
            bars.push(<div className='bar-df'></div>)
        }
        setBar(bars);

        let barsbpa = [];
        for(let i = 0;i < bpa;i++){
            barsbpa.push(<div className='bar-df'></div>)
        }
        setbpaDp(barsbpa);

        let barsDa = [];
        for(let i = 0;i < da;i++){
            barsDa.push(<div className='bar-df'></div>)
        }
        setDaDp(barsDa);

        let barspr = [];
        for(let i = 0;i < pr;i++){
            barspr.push(<div className='bar-df'></div>)
        }
        setprDp(barspr);

        let barsaggr = [];
        for(let i = 0;i < aggr;i++){
            barsaggr.push(<div className='bar-df'></div>)
        }
        setaggrDp(barsaggr);

        let barspassv = [];
        for(let i = 0;i < passv;i++){
            barspassv.push(<div className='bar-df'></div>)
        }
        setpassvDp(barspassv);

        let barsattabb = [];
        for(let i = 0; i < attabb;i++){
            barsattabb.push(<div className='bar-df'></div>)
        }
        setattabbDp(barsattabb);
        if(dataPoints == 0){
            setPath("player-rank");
        } else {
            setPath("player-position-df");
        }
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

    function incrementpassv(){
        if(dataPoints > 0){
            setpassv(passv + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementpassv(){
        if(passv > 0) {
            setpassv(passv -1);
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
        if (dataPoints == 0){
            socket.emit("send-data_points_df",{bpa:bpa,da:da,pr:pr,aggr:aggr,passv:passv,aa:attabb});
            socket.on("receive_players", (data) => {
                setPlayers(data);
            })
            socket.emit("send_player_data_df",players);
        } else {
            alert("All data points not used!");
        }
        

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
                            <div className="info">Passiveness</div>
                            <div className="bars">{passvDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementpassv}>+</div>
                            <div className="btn Min" onClick={decrementpassv}>-</div>
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
                <Link to={path} className="link">
                    <div className="btn-generate" 
                    onClick={sendData}
                    >Generate Player!</div>
                </Link>
            </div>
        </div>
        </>
    )
}