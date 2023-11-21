import React from 'react'
import {BsDatabase} from 'react-icons/bs'
import { FaChartSimple } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import image from '../assets/image.webp'
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { TbLogout2 } from "react-icons/tb";
import { GiCardboardBox } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { PiLifebuoy } from "react-icons/pi";
import { SiReactos } from "react-icons/si";


const Sidebar = ({title}) => {
  const navigate = useNavigate()
  return (
    <div className=' h-[1200px] w-[64px] bg-white z-30 fixed '>
        <div className='flex flex-col p-4'>
          {/* Logo */}
          <div>
            <SiReactos className="text-3xl"/>
          </div>
            <div className='flex flex-col items-center gap-y-2 text-[22px] text-[#1b2024] py-48'>
              {/* Data manager page icon route */}
                <button 
                className= {`sidebar-btn ${title === 'Data Manager' ? 'rounded-md bg-gray-100 text-sky-500 ' : ''}`}
                onClick={() => navigate('/data-manager')}
                >
                  <BsDatabase className={`${title === 'Data Manager' ? 'rounded-md  text-sky-500 ' : ''}`}/>
                </button>
                  {/* Radar Chart page icon route */}
                <button 
                 className= {`sidebar-btn ${title === 'Reports' ? 'rounded-md bg-gray-100 text-sky-500 ' : ''}`}
                onClick={() => navigate('/reports')}
                >
                  <FaChartSimple className={`${title === 'Reports' ? 'rounded-md  text-sky-500 ' : ''}`}/>
                </button>
                {/* Metrics page Route */}
                <button 
                className={`sidebar-btn ${title === 'Metrics' ? 'rounded-md bg-gray-100 text-sky-500  ' : ''}`}
                onClick={() => navigate('/metrics')}
                >
                  <RxDashboard className={`${title === 'Metrics' ? 'rounded-md  text-sky-500 ' : ''}`}/>
                </button>
            </div>
            <div className="items-end mt-[110px] justify-center flex-col gap-y-2">
              
              <div className='flex items-center justify-center '>
                <PiLifebuoy className='text-5xl mb-3 cursor-pointer rounded-md hover:bg-gray-100 transition-all ease-in-out duration-200 '/>
              </div>

              <Menu as="div">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="focus:outline-none  ">
              <img src='https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users-thumbnail.png'
              className='cursor-pointer '
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
              <Menu.Items static className="origin-bottom-left absolute left-10 bottom-0 mt-2 w-[230px] rounded-md shadow-xl bg-white border-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 ">
                  {/* Add your dropdown menu items here */}
                  <div className='mx-5 py-3 flex '>
                    <div className='flex flex-col'>
                    <span className='text-[12px] text-blue-500'>ROMESH'S COMPANY</span>
                    <span className='text-xl font-semibold'>Romesh</span>
                    <span className='text-base text-secondary'>romesh@gmail.com</span>
                    </div>
                   
                  </div>
                  <hr className='mx-3 py-1'/>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex w-full px-4 py-2 text-md items-center gap-x-3`}
                        /* onClick={()=>navigate('/')} */
                      >
                        <FaUser className='text-lg'/> My Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex w-full px-4 py-2 text-md items-center gap-x-3`}
                       /*  onClick={()=>navigate('/')} */
                      >
                        <GiCardboardBox className='text-lg'/> Billing
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex w-full px-4 py-2 text-md items-center gap-x-3 `}
                        onClick={()=>navigate('/')}
                      >
                        <TbLogout2 className='text-lg'/> Logout
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