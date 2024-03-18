import '../styles/playerRanks.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import uuid from 'react-uuid'

const socket = io.connect("https://13.48.124.9:5002");

export default function PlayerRank(){
    const [playerRanked,setPlayerRanked] = useState([]);
    const [message,setMessage] = useState("No Message");
    


    useEffect(() =>{
        socket.on(`receive_sorted_player`,(data) =>{
            if(data){
                setPlayerRanked(data);
            } else {
                setMessage("Mf Failed!");
            }
        })
        socket.on("receive_sorted_player_fw", (data) =>{
            if(data){
                setPlayerRanked(data);
            } else {
                setMessage("Fw Failed!");
            }
        })
        socket.on("receive_sorted_player_df", (data) =>{
            if(data){
                setPlayerRanked(data);
            } else {
                setMessage("Df Failed!");
            }
        })
    },[socket]);

    useEffect(() => {
        console.log(playerRanked)
    },[playerRanked]);

    useEffect(() => {
        console.log(message)
    },[message]);

    function sendId(id){
        console.log("Ranked id: " + id);
        socket.emit("send_id", {id: (id)})
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
                            playerRanked.map((result,id) => {
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