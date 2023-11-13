import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TableList from '../components/TableList'
import Searchbar from '../components/Searchbar'

const DataManager = () => {
  return (
    <div className='overflow-hidden overflow-y-hidden'>
    <Sidebar/>
    <Navbar/>
    {/* Body */}
    <div className='mt-[70px] ml-[70px] py-5 px-12'>
        {/* Search */}
        <div className='mb-5 flex flex-row items-center justify-between'>
        <Searchbar/>
        <div className='flex flex-row gap-x-4'>
            <div className='flex-row gap-x-2'>
                <p>Data Source <span>All</span></p>
            </div>
            <div className='flex-row gap-x-2'>
                <p>Created by <span>Everyone</span></p>
            </div>
            <div className='flex-row gap-x-2'>
                <p>Status<span>All</span></p>
            </div>
        </div>
        </div>
        <div>
        <TableList/>
        </div>
   
    </div>
  
    </div>
   
  )
}

export default DataManager