import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/NavBar'
import Footer from './components/common/Footer'
import StudentReport from './components/common/StudentReport'
import CompetitiveReport from './components/common/CompetitiveReport'

function App() {


  return (
    <>

      <div className='w-screen min-h-screen flex flex-col'>
        <Navbar/>
        <CompetitiveReport/>



        {/* <Footer/> */}
      </div>

      

    </>
  )
}

export default App
