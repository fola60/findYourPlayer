import '../styles/searchBar.css'
import {FaSearch} from "react-icons/fa"
import { useState,useEffect ,useContext} from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import uuid from 'react-uuid'
import logo from '../img/logo-fyp.png'
import { PlayerData } from '../App'





export default function SearchBar(props){
    const {setPlayerId} = useContext(PlayerData);
    const [input,setInput] = useState("");
    const [info,setInfo] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/allValue/search")
                const result = await response.json();
                const filter = result.filter((user) => {
                    return input.toLowerCase() && user && user.player && user.player.toLowerCase().includes(input)
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
                                            console.log(result.id)
                                            setPlayerId(result.id);
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

