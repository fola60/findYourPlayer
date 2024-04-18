import '../styles/playerRanks.css'
import { useState, useEffect,useContext } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'
import { PlayerData } from '../App'

const socket = io.connect("http://16.170.183.94:8080");

export default function PlayerRank(){
    const {playerList,setPlayerId} = useContext(PlayerData);

    

    function sendId(id){
        setPlayerId(id);
    }

    return (
        <>
            <div className="rank-container">
                <div className="header">
                    <header className='header-title'>Top 50 Players!</header>
                </div>
                <div className="data">
                    <div className="player-ranked-container">
                        {
                            playerList.map((result,id) => {
                                return (
                                    <>
                                        <div className="player-stats" key={uuid} >
                                            <div className="stat number">Rank :{id + 1}</div>
                                            <Link to="player-chart" >
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
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}