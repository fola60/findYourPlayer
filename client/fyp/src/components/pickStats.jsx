import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickStats.css'
import io from 'socket.io-client'
import { useEffect, useState, useRef } from 'react'
import uuid from 'react-uuid'
import prem from '../img/prem.png'
import bundesliga from '../img/bundesliga.png'
import seriea from '../img/seriea.png'
import laliga from '../img/laliga.png'
import ligue1 from '../img/ligue1.png'
import lewandowski from '../img/lewandowski.png'
import kroos from '../img/kroos.png'
import kim from '../img/kimMinJae.png'

const socket = io.connect("https://13.48.124.9:5002");

export default function PickStats(){
    const linkRef = useRef(null);

    const [league,setLeague] = useState(null);
    const [pos,setPos] = useState("");
    const [path,setPath] = useState("player-league");
    const [boolPrem,setBoolPrem] = useState(false);
    const [boolBundesliga,setBoolBundesliga] = useState(false);
    const [boolLigue1,setBoolLigue1] = useState(false);
    const [boolLaliga,setBoolLaliga] = useState(false);
    const [boolSeriea,setBoolSeriea] = useState(false);
    const [boolDf,setBoolDf] = useState(false);
    const [boolMf,setBoolMf] = useState(false);
    const [boolFw,setBoolFw] = useState(false);
    const [get,setGet] = useState(null);

    
  
   
    function sendData(){
        if(pos != "" && league != null){
            console.log("Send data clicked!");
            console.log(`Pos: ${pos} league: ${league}`);
            const sendPlayerData = async () => {
                try {
                    const response = await fetch(`allValue/pos/${pos}/league/${league}`);
                    const result = await response.json();
                    socket.emit("send_players", result);
                    setGet(result)
                    
                } catch (error) {
                    console.error('Error fetching data ' + error);
                }
            }
            sendPlayerData();
        } else {
            alert("Pick a league and position.");
        }

    }
    useEffect(() => {
        console.log(get);
    },[get]);

    
    

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
        setLeague("prem");
    }
    function setLeagueBundesliga(){
        setLeague("bundesliga");
    }
    function setLeagueligue1(){
        setLeague("ligue1");
    }
    function setLeagueSerieA(){
        setLeague("seriea");
    }
    function setLeagueLaLiga(){
        setLeague("laliga");
    }
    function highlightPrem(){
        setBoolPrem(!boolPrem);
        setBoolBundesliga(false);
        setBoolLaliga(false);
        setBoolSeriea(false);
        setBoolLigue1(false);
    }
    function highlightBundesliga(){
        setBoolBundesliga(!boolBundesliga);
        setBoolPrem(false);
        setBoolLaliga(false);
        setBoolSeriea(false);
        setBoolLigue1(false);
    }
    function highlightLaliga(){
        setBoolLaliga(!boolLaliga);
        setBoolBundesliga(false);
        setBoolPrem(false);
        setBoolSeriea(false);
        setBoolLigue1(false);
    }
    function highlightSeriea(){
        setBoolSeriea(!boolSeriea);
        setBoolBundesliga(false);
        setBoolLaliga(false);
        setBoolPrem(false);
        setBoolLigue1(false);
    }
    function highlightLigue1(){
        setBoolLigue1(!boolLigue1);
        setBoolBundesliga(false);
        setBoolLaliga(false);
        setBoolSeriea(false);
        setBoolPrem(false);
    }
    function highlightDf(){
        setBoolDf(!boolDf);
        setBoolMf(false);
        setBoolFw(false);
    }
    function highlightMf(){
        setBoolMf(!boolMf);
        setBoolDf(false);
        setBoolFw(false);
    }
    function highlightFw(){
        setBoolFw(!boolFw);
        setBoolMf(false);
        setBoolDf(false);
    }

    useEffect(() => {
        console.log(league);
    },[league])

    useEffect(() => {
        console.log(pos)
        if(pos == "mf" && league != null){
            setPath("player-position-mf");
        } else if(pos == "fw" && league != null){
            setPath("player-position-fw");
        } else if(pos == "df" && league != null){
            setPath("player-position-df");
        }
    },[pos])
    function scrollLink(){
        if(linkRef.current){
            linkRef.current.scrollIntoView({behavior:'smooth'});
        }
    }


    return (
        <>
        <div className="pick-stats-container">
            <h1 className='h1tag'>Pick a League</h1>
            <div className='league-container' onClick={scrollLink}>
                    <div className='league Img' id='prem' onClick={setLeaguePrem}>
                        <img className={boolPrem ? 'Img-ps highlighted': 'Img-ps'} src={prem} onClick={highlightPrem} />
                    </div>
                    <div className='league ' id='bundesliga' onClick={setLeagueBundesliga}>
                        <img className={boolBundesliga ? 'Img-ps highlighted': 'Img-ps'} src={bundesliga} onClick={highlightBundesliga} />
                    </div> 
                    <div className='league ' id='ligue1' onClick={setLeagueligue1}>
                        <img className={boolLigue1 ? 'Img-ps highlighted': 'Img-ps'} src={ligue1} onClick={highlightLigue1} />
                    </div> 
                    <div className='league ' id='serieA' onClick={setLeagueSerieA}>
                        <img className={boolSeriea ? 'Img-ps highlighted': 'Img-ps'} src={seriea} onClick={highlightSeriea} />
                    </div> 
                    <div className='league ' id='laLiga' onClick={setLeagueLaLiga}>
                        <img className={boolLaliga ? 'Img-ps highlighted': 'Img-ps'} src={laliga} onClick={highlightLaliga} />
                    </div>
                     
            </div>
            <h1 className='h1tag'>Pick a Position</h1>
            <div className="container-position">
                <div className="position" onClick={setPosDf}>
                    <div className="pos-text">Defender</div>
                    <img src={kim} className={boolDf ? 'img-pos highlighted-pos' : 'img-pos'} onClick={highlightDf} />
                </div>
                <div className="position" onClick={setPosMf}>
                    <div className="pos-text">Midfielder</div>
                    <img src={kroos} className={boolMf ? 'img-pos highlighted-pos' : 'img-pos'} onClick={highlightMf} />
                </div>
                <div className="position" onClick={setPosFw} >
                    <div className="pos-text">Forward</div>
                    <img src={lewandowski} className={boolFw ? 'img-pos highlighted-pos' : 'img-pos'} onClick={highlightFw} />
                </div>
            </div>
            <div className="link" ref={linkRef}>
                        <Link to={path} className="Link next-container">
                            <div className='next-btn ' onClick={sendData}>Next!</div>
                        </Link>
            </div>
        </div>
        </>
        
        
            )
}