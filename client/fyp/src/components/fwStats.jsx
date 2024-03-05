import { Link } from 'react-router-dom'
import React from 'react'
import '../styles/pickStats.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect("http://localhost:3500");

export default function FwStats(){
    return (
        <>
            Fw
        </>
    )
}