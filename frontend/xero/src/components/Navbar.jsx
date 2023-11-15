import React, { useContext } from 'react'
import Context from '../stateContext/Context'

const Navbar = () => {
  const {isDataSource, setIsDataSource} = useContext(Context)
  return (
    <div className='bg-white w-full h-[60px] top-0 pl-[60px] overflow-hidden'>
    <div className='flex justify-between px-[52px] items-center h-full' >
        <div className='flex flex-row gap-x-8 items-center'>
            <h2 className='text-xl font-[500]'>Data Manager</h2>
            <h4 className='text-sm'>DATA SOURCE CONNECTIONS 2</h4>
            <button className='text-sm text-[#8e929b]'
            onClick={()=>setIsDataSource(!isDataSource)}
            >AVAILABLE INTEGRATIONS</button>
        </div>
        <div>
            <button className='bg-[#25a767] text-white px-5 py-1 rounded-[5px]'>New Connection</button>
        </div>
    </div>
    
    </div>
  )
}

export default Navbar