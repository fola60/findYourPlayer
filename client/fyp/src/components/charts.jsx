import '../styles/charts.css'
import { useState,useEffect } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
import { Radar,PolarArea } from 'react-chartjs-2'
import logo from '../img/logo-fyp.png'
import { Link } from 'react-router-dom'


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement,
    Filler
)
export default function Charts(props){
    const [data,setData] = useState(props.data);
    const [update,setUpdate] = useState(null);
    const [loaded,setLoaded] = useState(0);
    const [name,setName] = useState("Player 1");
    const [charts,setCharts] = useState(<></>);
    
    const [paChartData,setPaChartData] = useState({
        labels: ['Completed passes ', 'Short Completed pass ', 'Medium Completed pass  ', 'Long Completed pass ', 'Passes Received', 'Progressive Passes Received', 'Key Passes'],
        datasets: [
            {
                label: 'Passing Stats',
                //data: [data.cmp_90per,data.sho_cmppctper,data.med_cmppctper,data.lon_cmppctper,data.p_rec90per,data.prg_prec90per,data.kp90per],
                data: [0,0,0,0,0,0,0],
                backgroundColor:[
                    'blue',
                    'green',
                    'red',
                    'black',
                    'orange',
                    'grey',
                    'pink'
                ],
                borderWidth: 1,
            }
        ]
    });
    
    const [playerData,setPlayerData] = useState({
        labels:['Passing','Shooting','Defending','Press Resistance', 'dribbling'],
        datasets: [
            {
                label: 'player1',
                data: [0,0,0,0,0],
                backgroundColor: 'blue',
                borderColor: 'red',
                borderWidth:'1'
            },
        ],
    })
    const options = {
        type: 'radar',
        plugins:{
            legend: {
                labels: {
                    color:'black',
                    font: {
                        size:30,
                    }
                }
            }
        },
        scales: {
            r:{
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }
     const optionsPolar = {
        options: {
            responsive:true,
            plugins: {
                legend:{
                    display:false,
                },
                title: {
                    display:false,
                }
            }
        },
        
        scales: {
            r:{
                suggestedMin: 0,
                suggestedMax: 100,
                grid: {
                    circular:true,
                    color:"#000"
                },
                angleLines:{
                    display:true,
                    color:"#000",
                    lineWidth:1,
                },
                pointLabels:{
                    display:true,
                    font:{
                        size:15
                    },
                    padding:0,
                    centerPointLabels:true,
                },
                ticks:{
                    display:false,
                }
            }
        }
        
     }
    useEffect(() => {
        setData(props.data)
        setUpdate(Math.random())
        console.log('data changed')
        setLoaded(loaded+1)
        console.log(loaded)
    },[props.data]);


 
    
    useEffect(() => {
        if (loaded > 1){
            setName(data.player)
            if(data.pos == 'MF' || data.pos == 'MF,DF' || data.pos == 'DF,MF' || data.pos == 'MF,FW'){
                setPlayerData({
                    labels:['High Volume Passing','Ball retention','Defensive Ability','Creative Ability', 'Goal Scoring'],
                    datasets: [
                        {
                            label: data.player,
                            data: [data.mf_hvp,data.mf_br,data.mf_da,data.mf_ca,data.mf_gs],
                            backgroundColor: 'blue',
                            borderColor: 'red',
                            borderWidth:'1'
                        },
                    ],
                })
            }
            else if (data.pos == 'DF' || data.pos == 'DF,MF' || data.pos == 'DF,FW'){
                setPlayerData({
                    labels:['Ball playing ability','Press resistance','Agression','Passiveness','Defensive Ability','Attacking Ability'],
                    datasets: [
                        {
                            label: data.player,
                            data: [data.df_bpa,data.df_pr,data.df_aggr,data.df_passv,data.df_da,data.df_aa],
                            backgroundColor: 'blue',
                            borderColor: 'red',
                            borderWidth:'1'
                        },
                    ],
                })
            }
            else if(data.pos == 'FW' || data.pos == 'FW,MF' || data.pos == 'FW,DF'){
                setPlayerData({
                    labels:['Dribbling','Poaching','Finishing','Pressing','Passing'],
                    datasets: [
                        {
                            label: data.player,
                            data: [data.fw_dr,data.fw_cm,data.fw_fin,data.fw_pr,data.fw_pass],
                            backgroundColor: 'blue',
                            borderColor: 'red',
                            borderWidth:'1'
                        },
                    ],
                })
            }
            setPaChartData({
                labels: ['Completed passes ', 'Short Completed pass ', 'Medium Completed pass  ', 'Long Completed pass ', 'Passes Received', 'Progressive Passes Received', 'Key Passes'],
                datasets: [
                    {
                        label: 'Passing Stats',
                        data: [data.cmp90per,data.sho_cmppctper,data.med_cmppctper,data.lon_cmppctper,data.p_rec90per,data.prg_prec90per,data.kp90per],
                        //data: [0,0,0,0,0,0,0],
                        backgroundColor:[
                            'blue',
                            'green',
                            'red',
                            'black',
                            'orange',
                            'grey',
                            'pink'
                        ],
                        borderWidth: 1,
                    }
                ]
            })
            
        }
    },[update])
    

    return (
        <>  
            <div className="chart-container">
                <div className="header-chart">
                    <Link to="/" >
                        <div className='logo-fyp'>
                                <img src={logo} className='logo'/>
                        </div>
                    </Link>
                </div>
                <div className='radar-container'>
                    <Radar 
                    data={playerData}
                    options= {options}
                    />
                </div>
                <div className="charts-container">
                    <div className="chart">
                        {data ? <PolarArea data={paChartData} options={optionsPolar}/> : ""}
                    </div>
                    <div className="chart"></div>
                    <div className="chart"></div>
                    <div className="chart"></div>
                    <div className="chart"></div>
                    <div className="chart"></div>
                </div>
            </div>
        </>
    )
}