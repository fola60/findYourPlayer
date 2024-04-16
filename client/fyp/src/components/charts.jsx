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
    const [chartIndex,setChartIndex] = useState(0);
    const [maxIndex,setMaxIndex] = useState(3);
    
    
    const [paChartData,setPaChartData] = useState([{
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
    }]);
    
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
            if(data.pos == 'MF' || data.pos == 'MF,DF' || data.pos == 'DF,MF' || data.pos == 'MF,FW'){
                setPaChartData([{
                    labels: ['Completed passes ', 'Short Completed pass ', 'Medium Completed pass  ', 'Long Completed pass ', 'Passes Received', 'Progressive Passes Received', 'Key Passes'],
                    datasets: [
                        {
                            label: 'Passing Stats',
                            data: [data.cmp90per,data.sho_cmppctper,data.med_cmppctper,data.lon_cmppctper,data.p_rec90per,data.prg_prec90per,data.kp90per],
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
                },
                {
                    labels: ['Goals','Shot on target %' ,'Goals Per Shot ', 'Xg', 'NpXg ', 'NpXg Per Shot'],
                    datasets: [
                        {
                            label: 'Goal Scoring Stats',
                            data: [data.gls90per,data.sotpctper,data.g_sh90per,data.xg90per,data.npxg90per,data.npxg_sh90per],
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
                },
                {
                    labels: ['Tackles Won','Challenges Lost' ,'Blocks', 'Interceptions', 'Clearances', 'Shots Blocked'],
                    datasets: [
                        {
                            label: 'Defensive Stats',
                            data: [data.tkl_w90per,data.chl_lst90per,data.blck90per,data.intc90per,data.clr90per,data.sh_blck90per],
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
                },
                {
                    labels: ['Shot creating actions','Goal Creating Actions' ,'Assists', 'Expected Assits', 'Expected Assisted Goals', 'Key Passes'],
                    datasets: [
                        {
                            label: 'Creative Stats',
                            data: [data.sca_p90per,data.gca_90per,data.ast90per,data.xa90per,data.xag90per,data.kp90per],
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
                }
                
            ]
                )
            } else if(data.pos == 'DF' || data.pos == 'DF,MF' || data.pos == 'DF,FW'){
                setPaChartData([
                    {
                        labels: ['Completed passes ', 'Short Completed pass ', 'Medium Completed pass  ', 'Long Completed pass ', 'Passes Received', 'Progressive Passes Received', 'Key Passes'],
                        datasets: [
                            {
                                label: 'Passing Stats',
                                data: [data.cmp90per,data.sho_cmppctper,data.med_cmppctper,data.lon_cmppctper,data.p_rec90per,data.prg_prec90per,data.kp90per],
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
                    },
                    {
                        labels: ['NpXg ', 'Shot On Target % ', 'Shot Creating Actions ', 'SCA Per Take on ', 'Crosses into penalty area'],
                        datasets: [
                            {
                                label: 'Attacking Stats',
                                data: [data.npxg90per,data.sotpctper,data.sca_p90per,data.sca_to90per,data.crrs_pen90per],
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
                    },
                    {
                        labels: ['Tackles Won','Challenges Lost' ,'Blocks', 'Interceptions', 'Clearances', 'Shots Blocked'],
                        datasets: [
                            {
                                label: 'Defensive Stats',
                                data: [data.tkl_w90per,data.chl_lst90per,data.blck90per,data.intc90per,data.clr90per,data.sh_blck90per],
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
                    },
                    {
                        labels: ['Short Completion','Dispossesions' ,'Miscontrolls', 'Take ons Tackled'],
                        datasets: [
                            {
                                label: 'Defensive Stats',
                                data: [data.sho_cmppctper,data.dis90per,data.mis90per,data.to_tklpctper],
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
                    }

                ])
            } else if (data.pos == 'FW' || data.pos == 'FW,MF' || data.pos == 'FW,DF'){
                setPaChartData([
                    {
                        labels: ['Shot creating actions','Goal Creating Actions' ,'Assists', 'Expected Assits', 'Expected Assisted Goals', 'Key Passes'],
                        datasets: [
                            {
                                label: 'Creative Stats',
                                data: [data.sca_p90per,data.gca_90per,data.ast90per,data.xa90per,data.xag90per,data.kp90per],
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
                    },
                    {
                        labels: ['Shot creating actions Take ons','Goal Creating Actions' ,'Goal Creating Actions Take ons', 'Carries', 'Carries into final 3rdd', 'Take on succes rate'],
                        datasets: [
                            {
                                label: 'Dribbling Stats',
                                data: [data.sca_to90per,data.gca_90per,data.gca_to90per,data.crrs90per,data.crrs_fin3rd90per,data.to_att90],
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
                    },
                    {
                        labels: ['Goals','Shot on target %' ,'Goals Per Shot ', 'Xg', 'NpXg ', 'NpXg Per Shot'],
                        datasets: [
                            {
                                label: 'Goal Scoring Stats',
                                data: [data.gls90per,data.sotpctper,data.g_sh90per,data.xg90per,data.npxg90per,data.npxg_sh90per],
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
                    },
                    {
                        labels: ['Shots from turnovers','interceptions' ,'Tackles Attacking 3rd'],
                        datasets: [
                            {
                                label: 'Goal Scoring Stats',
                                data: [data.sca_def90per,data.intc90per,data.tkl_att3rd90per],
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
                    }

                ])
            }
        }
    },[update])
    

    function forwardChart(){
        if(chartIndex < maxIndex){
            setChartIndex(chartIndex + 1);
        }
    }
    function backChart(){
        if(chartIndex != 0){
            setChartIndex(chartIndex - 1);
        }
    }

    return (
        <>  
            <div className="chart-container">
                <div className="header-chart">
                    <Link to="/" className="link-logo">
                        <div className='logo-fyp'>
                                FindYourPlayer
                        </div>
                    </Link>
                </div>
                <div className='radar-container'>
                    <Radar 
                    data={playerData}
                    options= {options}
                    />
                </div>
                <div className="index-chart">{chartIndex + 1}/4 Click arrows to see next...</div>
                <div className="chart">
                    <div className="btn-chart" onClick={backChart}>{'<'}</div>
                        <div className="polar-chart">
                            <PolarArea data={paChartData[chartIndex]} options={optionsPolar}/>
                        </div>
                    <div className="btn-chart" onClick={forwardChart}> {'>'} </div>
                </div>
            </div>
        </>
    )
}