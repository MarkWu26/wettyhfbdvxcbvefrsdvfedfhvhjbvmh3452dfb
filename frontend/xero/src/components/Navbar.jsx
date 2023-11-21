import React, { useContext, Fragment, useEffect, useState } from "react";
import Context from "../stateContext/Context";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { BsInfoCircleFill } from "react-icons/bs";

const Navbar = ({ title = "Data Manager", url, onCustomMetricsClick, isCustom, origData, addMetric, handleMouseEnter, handleMouseLeave, hoveredItem, setIsCustom}) => {
  const { isDataSource, setIsDataSource } = useContext(Context);
  const [metricNames, setMetricNames] = useState([]);

  useEffect(() => {
    const fetchMetricNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/metrics/metricNames"
        );
        console.log("metric names: ", response.data);
        setMetricNames(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMetricNames();
  }, []);

  return (
    <div className="bg-white w-full h-[60px] top-0 ml-[64px] pr-[60px]  shadow-lg fixed mb-32 z-[10] ">
      <div className="flex justify-between px-[52px] items-center h-full ">
        <div className="flex flex-row gap-x-8 items-center ">
          <h2 className="text-xl font-[500]">{title}</h2>
          {title === "Metrics" && (
            <div className="flex items-center flex-row gap-x-5">
               
              <button
              className= {` text-[14px] font-semibold px-5 py-2 z-[30] fixed rounded-[5px] left-0 ml-60 z-8 ${!isCustom? 'text-sky-600 bg-[#f3f4f5]' : 'text-secondary hover:bg-[#f3f4f5]'} `}
              onClick={()=>setIsCustom(false)}
            >
              MY METRICS
            </button>
            <button 
                className= {` text-[14px] font-semibold px-5 py-2 z-[30] fixed rounded-[5px]  ml-[160px] z-8 ${isCustom? 'text-sky-600 bg-[#f3f4f5]' : 'text-secondary hover:bg-[#f3f4f5]'} `}
                onClick={()=>setIsCustom(true)}
            >
              CUSTOM METRICS
            </button>
           
            </div>
          )}
          {title === 'Data Manager' && (
          <button
          className= {`text-[14px] px-5 font-semibold py-2 rounded-[5px] z-[20] ${isDataSource ? 'text-sky-600 bg-[#f3f4f5]' : 'hover:bg-[#f3f4f5] text-secondary'} text-[14px]  `}
          onClick={() => setIsDataSource(true)}
        >
          {title !== "Data Manager" ? "" : "DATA SOURCE CONNECTIONS"}
        </button>
          )}

          {title === 'Data Manager' && (
          <button
          className= {`text-[14px] px-5 py-2 rounded-[5px] z-[20] ml-[-8] font-semibold text-[#8e929b] ${isDataSource ? 'hover:bg-[#f3f4f5]' : 'text-sky-600 bg-[#f3f4f5] '}`}
          onClick={() => setIsDataSource(false)}
        >
          {title !== "Data Manager" ? "" : "AVAILABLE INTEGRATIONS"}
        </button>
          )}
       


        </div>
        <div>
          {title === "Data Manager" && (
            <a
              className="bg-[#25a767] text-white px-5 py-1 rounded-[5px] hover:opacity-95 items-center flex"
              href={url}
            >
              New Connection
            </a>
          )}
          {
            title === "Metrics" && !isCustom && (  
            <Menu as="div">
            <Menu.Button className="bg-[#25a767] text-white px-5 py-1 rounded-[5px] hover:opacity-95">
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
              <Menu.Items className="absolute mt-2 origin-top-right right-24 bg-white border-2 border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none w-[400px] h-[590px] z-10 overflow-y-auto ">
                <div className="px-1 py-1 w-full ">
                  {
                  origData.map((item) => item && (
                
                    <Menu.Item key={item?.metric_name} >
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-[#f3f4f5]" : ""
                        }  px-4 py-2 text-sm text-gray-700 cursor-pointer w-full flex items-center justify-between`}
                        onClick={() => addMetric(item?.metric_name, item.value, item.value2)}
                      >
                        <button
                         /*  onClick={() => addMetric(item?.metric_name, item.value, item.value2)} */
                        >
                          {item?.metric_name}
                        </button>
                        <div
                          className="relative"
                          onMouseEnter={() => handleMouseEnter(item)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <BsInfoCircleFill className="text-blue-500" />
                          {hoveredItem && hoveredItem.metric_name === item.metric_name && (
                            // Dropdown to display item.description
                            <div className="absolute z-50 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none mt-2 w-[200px] right-0">
                              <div className="px-4 py-2 text-sm text-gray-700">
                                {hoveredItem.description}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  ))}
                 
                </div>
              </Menu.Items>
            </Transition>
          </Menu>) 
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
