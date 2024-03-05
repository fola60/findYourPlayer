import { useEffect, useState } from 'react'
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


export default function LandingPage(props){
  

    
    
        return (
            <>  
                <div className='container'>
                    <div className="landing-container">
                        <div className="header-landing">
                            <SearchBar className='search-bar-container'/>
                        </div>
                        
                        <div className="landing-body">
                            <div className="player-photo">
                                <div className="player-1">
                                    <img className='img1 Img-lp' src={vanDijk} />
                                </div>
                                <div className="player-2">
                                    <img className='img2 Img-lp' src={bellingham}  />
                                </div>
                            </div>
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
                            <div className="player-photo">
                                <div className="player-3">
                                    <img className='img1 Img-lp' src={rashford} />
                                </div>
                                <div className="player-4">
                                    <img className='img2 Img-lp' src={leao}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )   
}