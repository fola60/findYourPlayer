import { useEffect, useState } from 'react'
import '../styles/landingPage.css'
import SearchBar from './searchBar'
import logo from '../img/logo-fyp.png'
import { Link } from 'react-router-dom'


export default function LandingPage(props){
  

    
    
        return (
            <>  
                <div className='container'>
                    <SearchBar className='search-bar-container'/>
                    <div className='league-link'>
                        <Link to='player-league' className='Link'>
                            <img className='logo' src={logo}/>
                        </Link>
                    </div>
                </div>
                
            </>
        )   
}