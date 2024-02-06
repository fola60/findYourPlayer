import '../styles/playerDataPage.css'
import  './charts.jsx'
import Charts from './charts.jsx'
import { useEffect, useState } from 'react';
import io from 'socket.io-client'


const socket = io.connect("http://localhost:3500");

export default function PlayerDataPage(props){
    const [data,setData] = useState(null)
    const [id,setId] = useState(1);
    useEffect(() =>{
        socket.on("receive_id", (data) => {
            setId(data.id);
            console.log('received id')
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
    },[id]);
    

    return (
        <>
            <div className='container'>
                <div className='data-container'>
                    <Charts data={data}/> 
                </div>
            </div>
        </>
    )

}