import React from 'react'
import {BsDatabase} from 'react-icons/bs'
import { FaChartSimple } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import image from '../assets/image.webp'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';


const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className=' h-[1200px] w-[64px] bg-white z-30 fixed '>
        <div className='flex flex-col p-4'>
          <div>
            <img alt="" src={image}/>
          </div>
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
            <div className="items-end mt-[170px]">
              <Menu as="div">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="focus:outline-none">
              <img src='https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users-thumbnail.png'
              className='cursor-pointer'
              />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items static className="origin-bottom-left absolute left-10 bottom-0 mt-2 w-48 rounded-md shadow-lg bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {/* Add your dropdown menu items here */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex w-full px-4 py-2 text-sm`}
                        onClick={()=>navigate('/')}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
            </div>
        </div>
        
    </div>
  )
}

export default Sidebar