import '../styles/playerRanks.css'
import { useState, useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'
import { PlayerData } from '../App'
import ParticlesComponentWhite from './particlesWhite'



export default function PlayerRank(){
    const {playerList,setPlayerId} = useContext(PlayerData);

    

    function sendId(id){
        setPlayerId(id);
    }

    return (
        <>
            <ParticlesComponentWhite id="particles" />
            <div className="rank-container">
                <div className="header">
                    <header className='header-title'>Top 50 Players!</header>
                </div>
                <div className="player-ranked-container">
                    { playerList.length > 1 ?
                        playerList.map((result,id) => {
                            return (
                                <>
                                    <div className="player-stats" key={uuid} >
                                        <div className="stat number">Rank :{id + 1}</div>
                                        <Link to="/player-chart" >
                                            <div className="stat name-player" onClick={() => {
                                                sendId(result.id);
                                            }}> Name:{result.player} </div>
                                        </Link>
                                        <div className="stat age">Age:{result.age} </div>
                                        <div className="stat team">Team :{result.team}   </div>
                                        <div className="stat comp">Competition :{result.comp}    </div>
                                        <div className="stat position">Position :{result.pos}</div>    
                                    </div>                                   
                                </>
                            )
                        }) : 
                            <Link to="/player-league">Error!</Link>
                    }
                </div>
            </div>
        </>
    )
}