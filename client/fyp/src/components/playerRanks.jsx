import '../styles/playerRanks.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'

const socket = io.connect("http://localhost:3500");

export default function PlayerRank(){
    const [playerRanked,setPlayerRanked] = useState([]);

    useEffect(() =>{
        socket.on("receive_sorted_player",(data) =>{
            setPlayerRanked(data);
        })
    },[socket]);

    useEffect(() => {
        console.log(playerRanked)
    },[playerRanked]);

    return (
        <>
            <div className="rank-container">
                <div className="header">
                    <header className='header-title'>Top 50 Players!</header>
                </div>
                <div className="data">
                    <div className="player-ranked-container">
                        {
                            playerRanked.map((result,id) => {
                                return (
                                    <>
                                        <div className="player-stats" key={uuid}>
                                            <div className="number">Rank :{id + 1}</div>
                                            <div className="name"> Name:{result.player}</div>
                                            <div className="age">Date of Birth:{result.age}</div>
                                            <div className="team">Team :{result.team}</div>
                                            <div className="comp">Competition :{result.comp}</div>
                                            <div className="position">Position :{result.pos}</div>    
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