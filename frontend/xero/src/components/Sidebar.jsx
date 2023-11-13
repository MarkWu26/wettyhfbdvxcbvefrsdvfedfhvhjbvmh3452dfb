import React from 'react'
import {BsDatabase} from 'react-icons/bs'
import {BsPlayBtn} from 'react-icons/bs'

const Sidebar = () => {
  return (
    <div className='absolute h-screen w-[64px] bg-white z-20 overflow-hidden'>
        <div className='flex flex-col p-4'>
            <div className='flex flex-col items-center gap-y-6 text-[22px] text-[#1b2024] py-12'>
                <a href="#" className='text-[#1b2024]'><BsDatabase/></a>
                <a href="#" className='text-[#1b2024]'><BsPlayBtn/></a>
            </div>
        </div>
    </div>
  )
}

export default Sidebar