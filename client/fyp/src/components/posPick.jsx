import {React, useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import '../styles/posPick.css'



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
    


    return (
        <>
            <div className="container-position">
                <div className="position" onClick={setPosDf}>df</div>
                <div className="position" onClick={setPosMf}>mf</div>
                <div className="position" onClick={setPosFw}>fw</div>
                <Link to={path}>
                    <div className="position" >Next</div>
                </Link>
            </div>
        </>
    )
}