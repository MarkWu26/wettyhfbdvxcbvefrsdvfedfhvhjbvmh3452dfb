import React from 'react'
import RadarChart from '../components/charts/RadarChart';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Reports = () => {
  return (
    <div className="w-screen h-screen overflow-hidden overflow-y-hidden">
      <Sidebar title={"Reports"}/>
      <Navbar title={"Cashflow Visualization Monitor"}/>
      {/* Body */}
      <div className="mt-[30px] ml-[150px] py-16 px-12 w-[85%] h-[100%] flex items-center justify-center">
        <div className='w-full h-full bg-white pb-7 rounded-2xl shadow-xl flex items-center justify-center'>
        <RadarChart/>
        </div>
       
      </div>
    </div>
  )
}

export default Reports