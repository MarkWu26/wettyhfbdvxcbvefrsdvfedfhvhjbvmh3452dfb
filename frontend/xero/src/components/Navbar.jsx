import React, { useContext, Fragment, useEffect, useState } from 'react'
import Context from '../stateContext/Context'
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';

const Navbar = ({title = 'Data Manager', url}) => {
  const {isDataSource, setIsDataSource} = useContext(Context);
  const [metricNames, setMetricNames] = useState([])

  useEffect(()=>{
    const fetchMetricNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/metrics/metricNames');
        console.log('metric names: ', response.data)
        setMetricNames(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMetricNames();
    
  }, [])

  return (
    <div className='bg-white w-full h-[60px] top-0 ml-[64px] pr-[60px] overflow-hidden shadow-lg'>
    <div className='flex justify-between px-[52px] items-center h-full' >
        <div className='flex flex-row gap-x-8 items-center'>
            <h2 className='text-xl font-[500]'>{title}</h2>
            <h4 className='text-sm'>{title !== 'Data Manager' ? '' : 'DATA SOURCE CONNECTIONS 2'}</h4>
            <button className='text-sm text-[#8e929b]'
            onClick={()=>setIsDataSource(!isDataSource)}
            >{title !== 'Data Manager' ? '' : 'AVAILABLE INTEGRATIONS' }</button>
        </div>
        <div>
          {title === 'Data Manager' && (
  <a className='bg-[#25a767] text-white px-5 py-2 rounded-[5px]'
  href={url}
  >New Connection</a>
          )}
          {/* {title === 'Metrics' && (
            <Menu as="div">
             <Menu.Button className='bg-[#25a767] text-white px-5 py-1 rounded-[5px]'>
              Add Metric
             </Menu.Button>
             <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute mt-2 origin-top-right right-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-[400px] z-10">
                  <div className="px-1 py-1 w-full ">
                    {metricNames.map((item)=> (
                        <Menu.Item
                        key={item.metric_name}
                        className='z-10'
                        >
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-[#f3f4f5]' : ''
                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
                          >
                            {item.metric_name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            
          )} */}
          
        </div>
    </div>
    
    </div>
  )
}

export default Navbar