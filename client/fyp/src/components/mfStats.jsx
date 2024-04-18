import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickStats.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import '../styles/mfStats.css'
import { PlayerData } from '../App'



export default function MfStats(){
    const {playerList,setPlayerList} = useContext(PlayerData);


    const [path,setPath] = useState("player-position-mf")

    const [dataPoints,setDataPoints] = useState(15);
    const [hvp,setHvp] = useState(0);
    const [da,setDa] = useState(0);
    const [ca,setCa] = useState(0);
    const [gs,setGs] = useState(0);
    const [passv,setpassv] = useState(0);
    

    const [hvpDp,setHvpDp] = useState([]);
    const [daDp,setDaDp] = useState([]);
    const [caDp,setCaDp] = useState([]);
    const [gsDp,setGsDp] = useState([]);
    const [passvDp,setpassvDp] = useState([]);
    
    
    const [bar,setBar] = useState([<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,<div className='bar'></div>,]);


    
    useEffect(() => {
        setBar([]);
        setHvpDp([]);
        setDaDp([]);
        setCaDp([]);
        setGsDp([]);
        setpassvDp([]);

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

        let barspassv = [];
        for(let i = 0;i < passv;i++){
            barspassv.push(<div className='bar'></div>)
        }
        setpassvDp(barspassv);

        if(dataPoints == 0){
            setPath("player-rank");
        } else {
            setPath("player-position-mf");
        }

     },[dataPoints]);

    

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
    


    function sendData(){
        if (dataPoints <= 0){
            let playerDataCpy = playerList;
            for (let i = 0;i < playerDataCpy.length; i++){
                playerDataCpy[i].score = (playerDataCpy[i].mf_hvp * hvp) + (playerDataCpy[i].mf_da * da) + (playerDataCpy[i].mf_ca * ca) + (playerDataCpy[i].mf_gs * gs) + (playerDataCpy[i].mf_br  * passv);
            }
            playerDataCpy.sort((a,b) => b.score - a.score);
            setPlayerList(playerDataCpy.slice(0,50));
        } else {
            alert("All data points not used");
        }
        

    }
    

    return (
        <>  
        <div className="container-mf">
            <div className="header-mf">Assign Points to Categories You Want Your Player to posses.</div>
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
                            <div className="bars">{passvDp}</div>
                        </div>
                        <div className="buttons">
                            <div className="btn Plus" onClick={incrementpassv}>+</div>
                            <div className="btn Min" onClick={decrementpassv}>-</div>
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