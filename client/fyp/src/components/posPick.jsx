import {React, useEffect, useState} from "react"
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import '../styles/posPick.css'

const socket = io.connect("http://13.48.124.9:80");

export default function PosPick(){
    const [pos,setPos] = useState("");
    const [path,setPath] = useState("/");
    useEffect(() =>{
        setPath(`player-position-${pos}`)
    },[pos])
    function setPosDf(){
        setPos("df");
    }
    function setPosMf(){
        setPos("mf");
    }
    function setPosFw(){
        setPos("fw");
    }
    function sendPos(){
        socket.emit("send_position",{position: pos}); 
    }



    return (
        <>
            <div className="container-position">
                <div className="position" onClick={setPosDf}>df</div>
                <div className="position" onClick={setPosMf}>mf</div>
                <div className="position" onClick={setPosFw}>fw</div>
                <Link to={path}>
                    <div className="position" onClick={sendPos}>Next</div>
                </Link>
            </div>
        </>
    )
}