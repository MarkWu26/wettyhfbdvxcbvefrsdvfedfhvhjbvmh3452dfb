import React, { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaDivide } from "react-icons/fa6";

const FirstCalculation = ({data, onCalculateTotal}) => {
  const operations = [
    { name: 'Add', button: <MdOutlineAdd /> },
    { name: 'Minus', button: <FaMinus /> },
    { name: 'Multiply', button: <IoClose /> },
    { name: 'Divide', button: <FaDivide /> },
  ];

  const [isCustom, setIsCustom] = useState(false)

  const calculateTotal = () => {
    if (values.length === 0) {
      // No values, set total to 0
      setTotal(0);
      return 0;
    }
  
    let totalVal = parseFloat(values[0].value) || 0;
  
    for (let i = 1; i < values.length; i++) {
      const currentValue = parseFloat(values[i].value) || 0;
      const currentOperation = values[i - 1].selectedOperation;
  
      switch (currentOperation?.name) {
        case 'Add':
          totalVal += currentValue;
          break;
        case 'Minus':
          totalVal -= currentValue;
          break;
        case 'Multiply':
          totalVal *= currentValue;
          break;
        case 'Divide':
          totalVal /= currentValue;
          break;
        default:
          break;
      }
    }
  
    setTotal(totalVal);
    return totalVal;
  };

  const [values, setValues] = useState([
    { metric: null, value: null, selectedOperation: operations[0] },
    { metric: null, value: null, selectedOperation: operations[0] },
  ]);
  

  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(operations[0]);
  const [total, setTotal] = useState(null)

  const handleAddValue = () => {
    setValues((prevValues) => [
      ...prevValues,
      { metric: null, value: null, selectedOperation: operations[0] },
    ]);
  };

  const handleOperationSelect = (index, operation) => {
    const newValues = [...values];
    newValues[index].selectedOperation = operation;

    setValues(newValues);
  };

  const handleMetricSelect = (index, metric) => {
    const newValues = [...values];
    newValues[index].metric = metric.metric_name;
    newValues[index].value = metric.value; // Assuming metric object has a 'value' property

    setValues(newValues);
  };

  useEffect(() => {
    // Call calculateTotal whenever values change
    const total = calculateTotal();
    onCalculateTotal(total)
    
  }, [values, onCalculateTotal]);

  const finalData = data.filter((item)=>item)
 

  return (
    <div className='flex flex-col gap-y-16 mt-5 px-32 py-16'>

   
    <div className='flex flex-row gap-x-7 '>
      {values.map((value, index) => (
        <div key={index} className='flex flex-row gap-x-4 items-center'>
          <div className='bg-white w-[200px] h-[100px] flex items-center justify-center rounded-lg shadow-lg'>
            <Menu as="div">
              <Menu.Button className="text-secondary text-white px-5 py-1 rounded-[5px]">
                {value.metric ? value.metric : 'Select a Metric'}
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
                <Menu.Items className='absolute origin-bottom-right mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-[300px] h-[400px] overflow-y-auto z-10'>
                  <div className="px-1 py-1 w-full">
               {/*    <Menu.Item  className="z-10">
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#f3f4f5]' : ''
                              } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
                             
                            >
                              add custom value
                            </button>
                          )}
                        </Menu.Item> */}
                    {finalData &&
                      finalData.map((item) => (
                        <Menu.Item key={item?.metric_name} className="z-10">
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-[#f3f4f5]' : ''
                              } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
                              onClick={() => handleMetricSelect(index, item)}
                            >
                              {item?.metric_name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

         

           {/* add a new metric button */}
           {index < values.length - 1 && (
          <div className='relative z-[5] '>
            <Menu as="div">
              <Menu.Button className='bg-indigo-500 h-[40px] px-7 rounded-md text-xl text-white '>
                {value.selectedOperation.button}
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
                <Menu.Items className='absolute mt-1  top-left left-[-4] bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-[75px] z-10 items-center'>
                  <div className='px-1 py-1 w-full flex items-center flex-col '>
                    {operations.map((operation) => (
                      <Menu.Item key={operation.name} className='z-10 flex items-center'>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-[#f3f4f5]' : ''
                            }  px-6 py-2 flex items-center text-lg  text-gray-700 cursor-pointer w-full`}
                            onClick={() => handleOperationSelect(index, operation)}
                          >
                            {operation.button}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
      ))}
      <div className='flex items-center'>
      <button onClick={handleAddValue} className='bg-indigo-500 text-sm h-[40%] px-2 text-white rounded-lg'>Add Metric</button>
      </div>
     
    </div>
   {/*  <div>
      <button
      onClick={()=>calculateTotal()}
      >Calculate</button>
      {total ? total : ''}
    </div> */}
    </div>
  );
};

export default FirstCalculation;
