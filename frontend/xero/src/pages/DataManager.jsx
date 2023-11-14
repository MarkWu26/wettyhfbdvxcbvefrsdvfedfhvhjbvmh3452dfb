import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TableList from '../components/TableList'
import Searchbar from '../components/Searchbar'
import Context from '../stateContext/Context'

const DataManager = () => {
    const {isDataSource} = useContext(Context);
  return (
    <div className='overflow-hidden overflow-y-hidden'>
    <Sidebar/>
    <Navbar/>
    {/* Body */}
    <div className='mt-[70px] ml-[70px] py-5 px-12'>
        {/* Search */}
        <div className='mb-5 flex flex-row items-center justify-between'>
        <Searchbar/>
        {isDataSource && (
            <div className='flex flex-row gap-x-4'>
            <div className='flex-row'>
                <p className='text-[#8e929b]'>Data Source <span className='text-black ml-2'>All</span></p>
            </div>
            <div className='flex-row gap-x-2'>
                <p className='text-[#8e929b]'>Created by <span className='text-black ml-2'>Everyone</span></p>
            </div>
            <div className='flex-row gap-x-2'>
                <p className='text-[#8e929b]'>Status <span className='text-black ml-2'>All</span></p>
            </div>
            </div>
        )}
       
        </div>
        <div>
        <TableList/>
        </div>
   
    </div>
  
    </div>
   
  )
}

export default DataManager