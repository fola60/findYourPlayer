import { useEffect, useState,useContext } from 'react'
import '../styles/landingPage.css'
import SearchBar from './searchBar'
import logo from '../img/logo-fyp.png'
import { Link } from 'react-router-dom'
import {FaSearch} from "react-icons/fa"
import starBackround from '../img/starBackround.png'
import leao from '../img/leao.png'
import rashford from '../img/rashford.png'
import bellingham from '../img/bellingham.png'
import vanDijk from '../img/vanDijk.png'
import { PlayerData } from '../App'
import ParticlesComponent from './particles'

export default function LandingPage(){
    const {playerId,setPlayerId} = useContext(PlayerData);

    
    
        return (
            <>  
                <ParticlesComponent id="particles" />
                <div className='container-landing'>
                    <div className="landing-container">
                        <div className="header-landing">
                            <SearchBar className='search-bar-container' />
                        </div>
                        
                        <div className="landing-body">
                           
                            <div className='league-link'>
                                <Link to='player-league' className='Link'>
                                    <div className="logo-div">
                                        <div className="top-logo text-logo">Click to start..</div>
                                        <div className="bottom-logo">
                                            <FaSearch className="search-icon"/>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </>
        )   
}