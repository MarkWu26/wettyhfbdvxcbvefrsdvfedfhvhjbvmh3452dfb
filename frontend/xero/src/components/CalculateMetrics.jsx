import React, {Fragment, useState} from 'react'
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaDivide } from "react-icons/fa6";

const operations = [
    {
        name: 'Add',
        button: <MdOutlineAdd/>
    },
    {
        name: 'Minus',
        button: <FaMinus/>
    },
    {
        name: 'Multiply',
        button: <IoClose/>
    },
    {
        name: 'Divide',
        button: <FaDivide/>
    },
]

const newMetrics = [
  {

  }
]

const CalculateMetrics = ({data}) => {
    const [selectedMetric1, setSelectedMetric1] = useState(null)
    const [selectedMetric2, setSelectedMetric2] = useState(null)
    const [finalValue, setFinalValue] = useState(0);
    const [operation, setOperation] = useState(operations[0].button)
    const [operationName, setOperationName] = useState(null);
     const [metricsCount, setMetricsCount] = useState([{},{}]) 

   const addMetricCount = () => {
      const newMetricCount = [...metricsCount, {}]
      console.log('new metric count: ', newMetricCount)
      setMetricsCount(newMetricCount)
   }

    const finalData = data.filter((item)=>item)

    const handleClick1 = (name, value) => {
        setSelectedMetric1(`${name} ${value}`)
 
    }
    const handleClick2 = (name, value) => {
        setSelectedMetric2(`${name} ${value}`)
    }

    if(selectedMetric1){
        const string1 = selectedMetric1?.split(' ');
        const value1 = string1[string1.length-1];
        console.log('the value 1 is: ', value1)
    }

    const calculateMetric = () => {
        const string1 = selectedMetric1?.split(' ');
        const value1 = string1[string1.length-1];

        const string2 = selectedMetric2?.split(' ');
        const value2 = string2[string2.length-1];

        if(operationName==="Add"){
            const calculateFormula =  parseFloat(value1) + parseFloat(value2);
            setFinalValue(Number(calculateFormula).toFixed(2))
        }else if (operationName==="Minus"){
            const calculateFormula =  parseFloat(value1) - parseFloat(value2);
            setFinalValue(Number(calculateFormula).toFixed(2))
        } else if (operationName==="Multiply"){
            const calculateFormula =  parseFloat(value1) * parseFloat(value2);
            setFinalValue(Number(calculateFormula).toFixed(2))
        }else if(operationName==="Divide"){
            console.log(`${value1} ${value2}`)
            const calculateFormula =  parseFloat(value1) / parseFloat(value2);
            console.log('calculated: ', calculateFormula)
            setFinalValue(Number(calculateFormula).toFixed(2))
        }

  
    }
   


  return (
    <div className="mt-16  ml-[75px] py-5 px-12 w-full">
        <div className="flex flex-row w-full gap-y-16">
      
      {metricsCount.map((count, index)=>(
        <>
        <div className="flex flex-row gap-x-16 justify-center">
         
        <div key={index}  className="flex  bg-white rounded-lg w-[200px] h-[100px] shadow-lg">
        <Menu as="div">
      <Menu.Button className="text-secondary mt-9 text-white px-5 py-1 rounded-[5px]">
      {selectedMetric1 ? selectedMetric1 : 'Select a Metric'}
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
    <Menu.Items className="origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-[400px] z-10">
      <div className="px-1 py-1 w-full ">
        {finalData && finalData.map((item) => (
          <Menu.Item key={item?.name} className="z-10">
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-[#f3f4f5]" : ""
                } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
               onClick={()=>handleClick1(item?.name, item?.value)}
              >
                {item?.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Transition>
</Menu>           
        </div>
        {/* Operation calculate */}
        <div className='flex items-center '>
        <Menu as="div">
          <Menu.Button className=' bg-indigo-500 h-[40px] px-7 rounded-md text-xl text-white'>
              {operation}
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
    <Menu.Items className="absolute mt-1  top-left ml-[-10] bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-[300px] z-10">
      <div className="px-1 py-1 w-full ">
        {operations.map((item) => (
          <Menu.Item key={item?.name} className="z-10">
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-[#f3f4f5]" : ""
                } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
               onClick={()=>{setOperation(item.button); setOperationName(item.name);}}
              >
                {item?.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Transition>
</Menu>           
       
              
        </div>
        <div className='items-center flex'>
          <button>Add new</button>
        </div>
    </div>
    </>

      ))}
        </div>
          
          {/* Result */}
          <div className="flex mt-10 items-center bg-white rounded-lg w-[40%] h-[100px] ml-[368px] shadow-lg">
            <div className='flex flex-col gap-y-2 '>
            <span className=' px-5'>Metric Name:</span>
            <input type="text" className='bg-white ml-5 w-[250px] border-2 border-gray-600 rounded-md px-4 py-1'/>
                          
            </div>
          
          </div>
      
        <div className='mt-12 flex items-center justify-center mr-32 gap-x-6 '>
            <button className='flex items-center justify-center px-6 py-2 rounded-lg bg-indigo-500 text-white'
        onClick={()=>calculateMetric({})}>
                Calculate
            </button>
        <button className='flex items-center justify-center px-6 py-2 rounded-lg bg-green-600 text-white'
        onClick={()=>calculateMetric()}
        >Save</button>
        </div>
       
        </div>
  )
}

export default CalculateMetrics