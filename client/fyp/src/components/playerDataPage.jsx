import '../styles/playerDataPage.css'
import  './charts.jsx'
import Charts from './charts.jsx'
import { useEffect, useState, createContext,useContext} from 'react';
import io from 'socket.io-client'
import { PlayerData } from '../App';


export default function PlayerDataPage(){
    const {playerId} = useContext(PlayerData);
    const [data,setData] = useState(null)
    
    
    

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