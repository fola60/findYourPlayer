import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/fwStats.css'
import { useEffect, useState ,useContext} from 'react'

import { PlayerData } from '../App'



export default function FwStats(){
    const {playerList,setPlayerList} = useContext(PlayerData);



    const [path,setPath] = useState("player-position-fw");

    const [dataPoints,setDataPoints] = useState(15);
    const [dr,setdr] = useState(0);
    const [cm,setcm] = useState(0);
    const [fin,setfin] = useState(0);
    const [pr,setpr] = useState(0);
    const [pass,setpass] = useState(0);

    const [drDp,setdrDp] = useState([]);
    const [cmDp,setcmDp] = useState([]);
    const [finDp,setfinDp] = useState([]);
    const [prDp,setprDp] = useState([]);
    const [passDp,setpassDp] = useState([]);
    
    const [players,setPlayers] = useState(null);
    const [bar,setBar] = useState([<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,]);


    
    useEffect(() => {
        setBar([]);
        setdrDp([]);
        setcmDp([]);
        setfinDp([]);
        setprDp([]);
        setpassDp([]);

        let bars = [];
        for(let i = 0;i < dataPoints;i++){
            bars.push(<div className='bar'></div>)
        }
        setBar(bars);

        let barsdr = [];
        for(let i = 0;i < dr;i++){
            barsdr.push(<div className='bar'></div>)
        }
        setdrDp(barsdr);

        let barscm = [];
        for(let i = 0;i < cm;i++){
            barscm.push(<div className='bar'></div>)
        }
        setcmDp(barscm);

        let barsfin = [];
        for(let i = 0;i < fin;i++){
            barsfin.push(<div className='bar'></div>)
        }
        setfinDp(barsfin);

        let barspr = [];
        for(let i = 0;i < pr;i++){
            barspr.push(<div className='bar'></div>)
        }
        setprDp(barspr);

        let barspass = [];
        for(let i = 0;i < pass;i++){
            barspass.push(<div className='bar'></div>)
        }
        setpassDp(barspass);
        
        if(dataPoints == 0){
            setPath("player-rank")
        } else {
            setPath("player-position-fw");
        }
     },[dataPoints]);

   


    function incrementdr(){
        if(dataPoints > 0){
            setdr(dr + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementdr(){
        if(dr > 0) {
            setdr(dr -1);
            setDataPoints(dataPoints + 1);
        }
    }

    function incrementcm(){
        if(dataPoints > 0){
            setcm(cm + 1);
            setDataPoints(dataPoints - 1);
        }
        console.log('clicked cm +' + cm);
    }

    function decrementcm(){
        if(cm > 0) {
            setcm(cm - 1);
            setDataPoints(dataPoints - 1);
        }
        console.log('clicked cm -' + cm);
    }

    function incrementfin(){
        if(dataPoints > 0){
            setfin(fin + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementfin(){
        if(fin > 0) {
            setfin(fin -1);
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

    function incrementpass(){
        if(dataPoints > 0){
            setpass(pass + 1);
            setDataPoints(dataPoints - 1);
        }
    }
    function decrementpass(){
        if(pass > 0) {
            setpass(pass -1);
            setDataPoints(dataPoints + 1);
        }
    }


    function sendData(){
        if (dataPoints == 0){
            let playerListCpy = playerList;
            for(let i = 0;i < playerListCpy.length; i++){
                playerListCpy[i].score = (playerListCpy[i].fw_pr * pr) + (playerListCpy[i].fw_fin * fin) + (playerListCpy[i].fw_dr * dr) + (playerListCpy[i].fw_cm * cm) + (playerListCpy[i].fw_pass * pass);
            }
            playerListCpy.sort((a,b) => b.score - a.score);
            setPlayerList(playerListCpy.slice(0,50));
        } else {
            alert("All Data points not used!");
        }
        

    }

    return (
        <>
            <div className="container-fw">
            <div className="header-fw">Assign Points to Categories You Want Your Player to posses.</div>
            <div className="container-data-points">
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Dribbling</div>
                            <div className="bars">{drDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementdr}>+</div>
                            <div className="btn Min" onClick={decrementdr}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Chance Magnet</div>
                            <div className="bars">{cmDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementcm}>+</div>
                            <div className="btn Min" onClick={decrementcm}>-</div>
                        </div>
                    </div>    
                    <div className="category-container">
                        <div className="data-points"  >
                            <div className="info">Finishing</div>
                            <div className="bars">{finDp}</div> 
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementfin}>+</div>
                            <div className="btn Min" onClick={decrementfin}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Pressing</div>
                            <div className="bars">{prDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementpr}>+</div>
                            <div className="btn Min" onClick={decrementpr}>-</div>
                        </div>
                    </div>
                    <div className="category-container">
                        <div className="data-points" >
                            <div className="info">Passing</div>
                            <div className="bars">{passDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementpass}>+</div>
                            <div className="btn Min" onClick={decrementpass}>-</div>
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