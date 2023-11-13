
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import DataManager from './pages/dataManager'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route exact path='/data-manager' element={<DataManager/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
