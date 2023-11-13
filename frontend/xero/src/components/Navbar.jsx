import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white w-screen h-[60px] absolute top-0 ml-[60px] overflow-hidden'>
    <div className='flex justify-between px-[52px] items-center h-full' >
        <div className='flex flex-row gap-x-8 items-center'>
            <h2 className='text-xl font-[500]'>Data Manager</h2>
            <h4 className='text-sm'>DATA SOURCE CONNECTIONS 2</h4>
            <h4 className='text-sm'>AVAILABLE INTEGRATIONS</h4>
        </div>
        <div>
            <button className='bg-[#25a767] text-white px-5 py-1 rounded-[5px]'>New Connection</button>
        </div>
    </div>
    
    </div>
  )
}

export default Navbar