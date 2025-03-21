import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/NavBar'
import Footer from './components/common/Footer';
import { Route, Routes } from 'react-router-dom'
import BatchReport from './pages/BatchReport'
import { fetchFromDB } from './utils/fetchFromDB/fetchDB'
import StudentReport from './pages/StudentReport'
import CompetitiveReport from './pages/CompetitiveReport'

function App() {

  const [batchData, setBatchData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFromDB(setBatchData)
      setIsFetched(true);
    };
    fetchData();
  }, [])


  return (
    <>

      <div className='w-screen min-h-screen flex flex-col'>
        <Navbar/>
        
        <Routes>
          <Route path='/batch-report' element={<BatchReport batchData={batchData} isFetched={isFetched}/>}></Route>
          <Route path='/student-report' element={<StudentReport batchData={batchData}/>}></Route>
        </Routes>


        {/* <Footer/> */}
      </div>

      

    </>
  )
}

export default App
