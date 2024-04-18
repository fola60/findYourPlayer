import '../styles/playerDataPage.css'
import  './charts.jsx'
import Charts from './charts.jsx'
import { useEffect, useState, createContext,useContext} from 'react';
import io from 'socket.io-client'
import { PlayerData } from '../App.js';

const socket = io.connect("http://16.170.183.94:8080");

export default function PlayerDataPage(){
    const {playerId,setPlayerId} = useContext(PlayerData);
    const [data,setData] = useState(null)
    const [id,setId] = useState(1);
    useEffect(() =>{
        
        socket.on("receive_id", (data) => {
            setId(data.id);
            
        })
        
    }, [socket]);
    
    

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`/allValue/id/${playerId}`)
                const result = await response.json()
                setData(result)
                
                
            } catch (error) {
                console.error('Error Fetching Data:', error)
            }
        }
        getData();
        console.log("Id: " + id);
    },[playerId]);
    

    return (
        <>
            <div className='container-data-page'>
                <div className='data-container-page'>
                    <Charts data={data}/> 
                </div>
            </div>
        </>
    )

}