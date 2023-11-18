import React from 'react'
import {BsDatabase} from 'react-icons/bs'
import { FaChartSimple } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className=' h-screen w-[64px] bg-white z-30 fixed mt-[-60px]'>
        <div className='flex flex-col p-4'>
            <div className='flex flex-col items-center gap-y-6 text-[22px] text-[#1b2024] py-48'>
              {/* Data manager icon route */}
                <button 
                className='text-[#1b2024]'
                onClick={() => navigate('/data-manager')}
                >
                  <BsDatabase/>
                </button>
                <button 
                className='text-[#1b2024]'
                onClick={() => navigate('/reports')}
                >
                  <FaChartSimple/>
                </button>
                <button 
                className='text-[#1b2024]'
                onClick={() => navigate('/metrics')}
                >
                  <RxDashboard/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar