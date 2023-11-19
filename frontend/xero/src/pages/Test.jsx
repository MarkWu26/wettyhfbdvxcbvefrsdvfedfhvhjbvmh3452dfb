import React, { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaDivide } from "react-icons/fa6";
import FirstCalculation from '../components/firstCalculation';
import SecondCalculation from '../components/SecondCalculation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Test = ({data}) => {
  const [total1, setTotal1] = useState(null);
  const [total2, setTotal2] = useState(null);
  const [totalResult, setTotalResult] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const handleCalculateTotal1 = (total) => {
    setTotal1(total);
  };

  const handleCalculateTotal2 = (total) => {
    setTotal2(total);
  };
  console.log('the first result is: ', total1)
  console.log('the second result is: ', total2)

  useEffect(()=>{
    if(total2 !== 0){
      setTotalResult(Number(total1 / total2).toFixed(2))
    }else{
      setTotalResult(Number(total1).toFixed(2))
    }
  }, [total1, total2])

  console.log('THE TOTAL RESULT IS: ', totalResult);

  const addMetric = async () =>{
    try {
      const response = await axios.post('http://localhost:5000/user/addMetric', {
          name: name,
          value: totalResult,
          type: 'custom'
      });

      console.log('THE METRICS ADDED IS: ', response.data)
      window.location.reload()

    /*   const newSaved = userSaved.concat(response.data)
      const newSavedWithDescriptions = newSaved.map((item) => {
        const metricDefinition = definition.find((def) => def.name === item.metric_name);
      
        return {
          ...item,
          description: metricDefinition?.description || 'No description available',
        };
      }); */

    /*   setUserSaved(newSavedWithDescriptions) */

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pb-12'>
    <FirstCalculation data={data} onCalculateTotal={handleCalculateTotal1}/>
    <div className='flex mx-32  h-[15px] w-[full] bg-blue-300 rounded-sm shadow-lg'>
     
    </div>
    <SecondCalculation data={data} onCalculateTotal={handleCalculateTotal2}/>
    <div className='flex flex-col gap-y-3 mt-5 px-32 '>
        {/* add metric name and save */}
        <div className='flex ml-[440px] flex-col justify-center items-center bg-white w-[450px] rounded-lg shadow-lg h-[100px] '>
          <div className='flex flex-row justify-between w-full px-10 h-full items-center'> 
            {/* Input */}
            <div className='flex flex-col gap-y-2'>
              <span className=''>Metric Name</span>
              <input className='border-2 px-4 text-md py-1 rounded-md' placeholder='Enter Metric Name..'
              required
              onChange={(e)=>setName(e.target.value)}
              />
            </div>
            {/* Button */}
            <div>
              <button className='bg-green-600 px-8 py-2 rounded-lg text-white hover:opacity-95 flex items-end mt-7'
              onClick={()=>addMetric()}
              
              >Save</button>
            </div>
          </div>
        </div>
           
      </div>
    </div>
   
    
  )
};

export default Test;
