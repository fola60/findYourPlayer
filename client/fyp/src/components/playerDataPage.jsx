import '../styles/playerDataPage.css'
import  './charts.jsx'
import Charts from './charts.jsx'
import { useEffect, useState } from 'react';
import io from 'socket.io-client'


const socket = io.connect("https://13.48.124.9:80");

export default function PlayerDataPage(props){
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
                const response = await fetch(`/allValue/id/${id}`)
                const result = await response.json()
                setData(result)
                
                
            } catch (error) {
                console.error('Error Fetching Data:', error)
            }
        }
        getData();
        console.log("Id: " + id);
    },[id]);
    

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