import '../styles/searchBar.css'
import {FaSearch} from "react-icons/fa"
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import uuid from 'react-uuid'
import logo from '../img/logo-fyp.png'

const socket = io.connect("https://13.48.124.9:80");



export default function SearchBar(props){
    
    const [input,setInput] = useState("");
    const [info,setInfo] = useState([])
    function sendId(id){
        socket.emit("send_id", {id: (id)})
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/allValue/search")
                const result = await response.json();
                const filter = result.filter((user) => {
                    return input && user && user.player && user.player.toLowerCase().includes(input)
                })
                setInfo(filter)
                
            } catch (error) {
                console.error('Error Fetching Data:', error)
            }
        };
        fetchData();
    }, [input]);

    const handleChange = (value) => {
        setInput(value)
    } 
    return (
        <>
            <div className={props.className}>
                
                <div className='input-wrapper'>
                    <FaSearch id='search-icon' />
                    <input  
                     placeholder='Search for Europes top 5 league players...'
                     value={input} 
                     onChange={(e) => handleChange(e.target.value)}/>
                </div>
                <div id='search-results'>
                    
                    {
                    info.map((result,id) => {
                        return (
                            <>  
                                <div className='linkTo'>
                                <Link to="player-chart" className="Link">
                                        <span
                                        className="results"  
                                        key={uuid} 
                                        onClick={()=>{
                                            sendId(result.id)
                                            console.log(result.id)
                                            
                                        }}>
                                            {result.player}  - Born:{Math.floor(result.born)} - Position:{result.pos} - league: {result.comp}
                                        </span>
                                </Link>
                                </div>
                            </>
                        )
                    })
                    }
                    
                </div>
            </div>
        </>
    )
}

