import { useState, useEffect } from 'react'
import React from 'react'

function App() {
  const [backEndData, setBackEndData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos').then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        setBackEndData(data)
      }
    )
  }, [])

  return (
    <>
     
    </>
  )
}

export default App
