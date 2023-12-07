import React, {useState, useContext} from "react";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { HiRefresh } from "react-icons/hi";
import Context from "../stateContext/Context";

const TableList = ({count, xeroUrl, isLoggedIn}) => {
  const {userInfo} = useContext(Context)
  const authTimeInSeconds = userInfo?.authTime
  const authTimeinMilliseconds = authTimeInSeconds * 1000
  const authDate = new Date(authTimeinMilliseconds);
  const formattedDate = authDate.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
 
  console.log('are you loggedIn? ', isLoggedIn)
  console.log('USER INFO:: ', userInfo)

  return (
    <>
    {userInfo && userInfo.name && isLoggedIn ? (
      <>
      <div className=" bg-[#F9FAFA] rounded-t-[5px] overflow-hidden h-[45px]">
        <div className="bg-[#F9FAFA] w-full h-full flex flex-row text-[#8e929b] items-center px-5">
          <div className="w-[27%] ">Title</div>
          <div className="w-[15%] ">Connected</div>
          <div className="w-[14%] ">Permisions</div>
          <div className="w-[20%] ">Status</div>
          <div className=" w-[24%]">Available Metrics</div>
          <div className=" w-[10%]"></div>
        </div>
      </div>
      <div className="h-[110px] bg-white hover:drop-shadow-lg">
        <div className="w-full h-full flex flex-row  items-center">
          {/* Title */}
          <div className="w-[27%] px-4">
            <div className="flex flex-row items-center">
              <div className="w-[30%]">
                <img
                  src="https://cdn1.databox.com/images/apps/s/Xero.png"
                  className="rounded-[50%] w-[45px] h-[45px]"
                />
              </div>
              <div className="w-[70%] flex flex-col">
                <h2 className="font-medium text-lg">{userInfo?.orgName}</h2>
                <span className="text-[#8e929b] text-sm">Xero</span>
              </div>
            </div>
          </div>
          {/* Connected */}
          <div className="w-[15%] flex-row  flex items-center text-[#8e929b] justify-start px-2">
            <div className="flex flex-col">
            <div>
                <span>{formattedDate}</span>
            </div>
            <div>
                <span>by {userInfo.name}</span>
            </div>
            </div>
          </div>
          <div className="w-[14%] flex-row  flex items-center text-[#8e929b] justify-start px-1">
            <span>All users</span>
          </div>
          <div className="w-[20%] flex-row  flex items-center text-[#8e929b] justify-start ">
            <span>Updated hourly</span>
          </div>
          <div className="w-[24%] flex-row  flex items-center text-[#8e929b] justify-start">
            <span>{count}</span>
          </div>
          <div className="w-[10%] flex-row flex items-center text-[#8e929b] justify-start relative">
     

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-700 focus:outline-none">
          <button className="bg-white text-sm font-medium text-sky-600 border border-sky-600 px-8  rounded-md ml-[-20px] py-1 hover:opacity-95 hover:text-white hover:bg-sky-600 transition-all ease-in-out duration-200">Details</button>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex flex-row items-center gap-x-3 px-4 py-2 text-sm w-full text-left`}
                  href={xeroUrl}
                >
                   <HiRefresh className="text-lg"/> Reauthorize
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
        </div>
      </div>
      </>
    ) : (
          <div className=" bg-[#F9FAFA] rounded-t-[5px] overflow-hidden h-[100px] shadow-lg">
          <div className="bg-[#F9FAFA] w-full h-full flex flex-row text-[#8e929b] items-center px-5">
            <span className="text-red-400">You are not connected to any data source. Please connect to a data source.</span>
            </div>
            </div>
    ) }

      
    </>
  );
};

export default TableList;
