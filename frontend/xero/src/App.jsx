
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import DataManager from './pages/dataManager'
import Reports from './pages/Reports'
import Metrics from './pages/Metrics'
import Test from './pages/Test'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/data-manager' element={<DataManager/>}/>
    <Route exact path='/reports' element={<Reports/>}/>
    <Route exact path='/metrics' element={<Metrics/>}/>
    <Route exact path='/test' element={<Test/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
