import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Menu, Transition } from "@headlessui/react";
import { BsInfoCircleFill } from "react-icons/bs";
import Modal from "../components/Modal";
import { BiSolidTrash } from "react-icons/bi";
import Test from "./Test";

const Metrics = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [savedMetric, setSavedMetric] = useState(null);
  const [metricNames, setMetricNames] = useState([]);
  const [origData, setOrigData] = useState([])
  const [isCustom, setIsCustom] = useState(false);
  const [userSaved, setUserSaved] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('')
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMenuClick = (category, isCurrent) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [category]: isCurrent,
    }));
  };

  const fetchUserMetrics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/savedMetrics",
        {
          withCredentials: true,
        }
      );
  
      const testdata = response.data.metrics;
      const newsaved = testdata.map((item) => item);
      if(newsaved.length == 0){
  
        setSavedMetric(null);
      }else{
  
        setSavedMetric(newsaved);
      
      }

      setData([...data, ...newsaved])
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    const fetch = async () =>{
      await fetchUserMetrics();
    }
    fetch();
  }, [])

  

  useEffect(() => {
    const fetchExecutiveReport = async () => {
      try {
       
        const response = await axios.get("http://localhost:5000/reports", {
          withCredentials: true,
        });
        const userMetrics = await axios.get(
          "http://localhost:5000/user/savedMetrics",
          {
            withCredentials: true,
          }
        );
        const fetchBalance = await axios.get('http://localhost:5000/balance', {
          withCredentials: true,
        }) 
           setUserSaved(userMetrics.data.metrics)
         
        const fetchMetrics = await axios.get(
              "http://localhost:5000/metrics/metricNames"
        );
          
        const metrics = fetchMetrics.data;       
        
        const reports = JSON.parse(response.data.body).Reports[0];

        const businessBankAccount = JSON.parse(fetchBalance.data.body).Reports[0].Rows
        .find(section => section.Title === "Bank")
        .Rows.find(row => row.RowType === "SummaryRow").Cells[1].Value;
 

        const equity = JSON.parse(fetchBalance.data.body).Reports[0].Rows
        .find(section => section.Title === "Equity")
        .Rows.find(row => row.RowType === "SummaryRow").Cells[1].Value;
     

        const retainedEarnings = JSON.parse(fetchBalance.data.body).Reports[0].Rows
        .find(section => section.Title === "Equity").Rows[1].Cells[1].Value
       ;

       const yearEarnings = JSON.parse(fetchBalance.data.body).Reports[0].Rows
       .find(section => section.Title === "Equity").Rows[0].Cells[1].Value
      ;

        const extractCellValues = async () => {
          const cellValuesArray =
            reports?.Rows?.flatMap((section) =>
              section?.Rows?.map((row) => {
                const nameCell = row?.Cells?.[0];
                const valueCell = row?.Cells?.[1];
                const value2Cell = row?.Cells?.[2];
                const metric_name = nameCell?.Value

                const metricDefinition = metrics.find((def) => def.metric_name === metric_name);
                
                if(metricDefinition){
                  return {
                    metric_name: metricDefinition?.metric_name,
                    description: metricDefinition?.description || 'No description available',
                    value: valueCell?.Value,
                    value2: value2Cell?.Value,
                  };
                }
                
              })
            ) || [];

            const totalCurrentAssets = JSON.parse(fetchBalance.data.body).Reports[0].Rows
            .find(section => section.Title === "Current Assets")
            .Rows.find(row => row.RowType === "SummaryRow").Cells[1].Value;
        
          const totalCurrentLiabilities = JSON.parse(fetchBalance.data.body).Reports[0].Rows
            .find(section => section.Title === "Current Liabilities")
            .Rows.find(row => row.RowType === "SummaryRow").Cells[1].Value;

            const getDescription = (metricName) => {

                const foundMetric = metrics.find((item)=> item.metric_name === metricName)
                console.log('testtt', foundMetric)
              /*   console.log('found Metric', foundMetric.description); */
                if(foundMetric){
                  return foundMetric.description
                }
                
            }


          // Append Total Current Assets to cellValuesArray
          cellValuesArray.unshift({
            metric_name: 'Current Assets',
            description: getDescription('Current Assets') || 'No description available',
            value: totalCurrentAssets,
            value2: '',
          });
        
          // Append Total Current Liabilities to cellValuesArray
          cellValuesArray.unshift({
            metric_name: 'Current Liabilities',
            description: getDescription('Current Liabilities') || 'No description available',
            value: totalCurrentLiabilities,
            value2: '',
          });

          cellValuesArray.unshift({
            metric_name: 'Bank Balances',
            description: getDescription('Bank Balances') || 'No description available',
            value: businessBankAccount,
            value2: '',
          })
          cellValuesArray.unshift({
            metric_name: 'Equity',
            description: getDescription('Equity') || 'No description available',
            value: equity,
            value2: '',
          })
          cellValuesArray.unshift({
            metric_name: 'Retained Earnings',
            description: getDescription('Retained Earnings') || 'No description available',
            value: retainedEarnings,
            value2: '',
          })
          cellValuesArray.unshift({
            metric_name: 'Year Earnings',
            description:  getDescription('Year Earnings') || 'No description available',
            value: yearEarnings,
            value2: '',
          })


            console.log('api result', cellValuesArray)
         
            
            setOrigData(cellValuesArray)

            if(!savedMetric){
        
              const testdata = userMetrics.data.metrics;
              const newsaved = testdata.map((item) => item);

              const newSavedWithDescriptions = newsaved.map((item) => {
                const metricDefinition = metrics.find((def) => def.metric_name === item.metric_name);
              
                if(metricDefinition){
                  return {
                    ...item,
                    
                    description: metricDefinition?.description == '' ? 'No description available' : metricDefinition?.description,
                  };
                }
             
              });
       
              setUserSaved(newSavedWithDescriptions)
              
            
              setData(newSavedWithDescriptions)
            }else{

              const newSavedWithDescriptions = userSaved.map((item) => {
                const metricDefinition = metrics.find((def) => def.name === item.metric_name);
              
                if(metricDefinition){
                  return {
                    ...item,
                    
                    description: metricDefinition?.description == '' ? 'No description available' : metricDefinition?.description,
                  };
                }
             
              });
              setUserSaved(newSavedWithDescriptions)  
            }
        };
        extractCellValues();
      } catch (error) {
        console.log(error);
      }
    }
    fetchExecutiveReport();
    }, []);

    
    
    useEffect(()=>{
      const fetchMetricNames = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/metrics/metricNames"
          );
        
          setMetricNames(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchMetricNames();
    }, [])
    

  const addMetric = async (name, value, value2) =>{
    try {
      const response = await axios.post('http://localhost:5000/user/addMetric', {
          name: name,
          value:value,
          value2:value2
      });

      console.log('THE METRICS ADDED IS: ', response.data)

      
      const fetchUserMetrics2 = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/user/savedMetrics",
            {
              withCredentials: true,
            }
          );
          const testdata = response.data.metrics;
          const newsaved = testdata.map((item) => item);
         
       
            setSavedMetric(newsaved);
      
      
        } catch (error) {
          console.log(error);
        }
      };

      const fetchMetrics = await axios.get(
        "http://localhost:5000/metrics/metricNames"
      );
    
      const metrics = fetchMetrics.data;

      const newSaved = userSaved.concat(response.data)
      const newSavedWithDescriptions = newSaved.map((item) => {
        const metricDefinition = metrics.find((def) => def.metric_name === item.metric_name);
      
        return {
          ...item,
          description: metricDefinition?.description || 'No description available',
        };
      });

      setUserSaved(newSavedWithDescriptions)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) =>{
    try{
      console.log('id is: ', id)
      const deleteMetric = await axios.delete(`http://localhost:5000/user/deleteMetric/${id}`);
      const newData = userSaved.filter((item)=>item.id !== id)
      setUserSaved(newData)

    }catch(error){
      console.log(error)
    }
   
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden">
       <Sidebar title={"Metrics"}/>
      <Navbar title={"Metrics"} onCustomMetricsClick={() => setIsCustom(!isCustom)} isCustom={isCustom} origData={origData} addMetric={addMetric} setIsCustom={setIsCustom} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
     <div className="py-16">
    
      {!isCustom ? (
        <>
        <Menu as="div">
        <Menu.Button className="bg-[#25a767] text-white px-5 py-1 rounded-[5px] absolute top-0 mt-4 right-0 mr-6 hover:opacity-95">
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
      </Menu>

      <div className="grid grid-cols-4 gap-x-3 gap-y-4 mt-10  ml-[70px] py-5 px-12 ">
       
          {userSaved && userSaved.map((item, index)=> (
              <div
              key={index}
              className="bg-white max-w-[310px] h-[282px] p-4 flex justify-start rounded-xl shadow-lg flex-col relative"
            >
               <Modal isOpen={isOpen} title={selectedMetric?.metric_name} description={selectedMetric.description} setIsOpen={setIsOpen}/>
              
              <Menu
                as="div"
                className="flex relative items-center justify-between gap-x-8 text-left mb-8 "
              >
                 
                <div>
                  <Menu.Button className="relative text-secondary text-xs hover:bg-[#f3f4f5] rounded-md px-3 py-1 ">
                    {selectedCategories[item.metric_name] ||
                    selectedCategories[item.metric_name] === undefined
                      ? "Current Month"
                      : "Previous Month"}
                  </Menu.Button>
                </div>
                {/* View */}
                <div className="flex items-end gap-x-3 relative">
                <button
                onClick={()=>{setIsOpen(!isOpen); setSelectedMetric(item)}}
                >
                  <BsInfoCircleFill className="text-blue-500"/>
                </button>
                <button
                className=""
                onClick={()=>handleDelete(item.id)}
                >
                <BiSolidTrash className="text-red-500"/>
                </button>
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
                  <Menu.Items className="absolute  mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-[#f3f4f5]" : ""
                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                            onClick={() => {
                              handleMenuClick(item.metric_name, true);
                            }}
                          >
                            Current Month
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-[#f3f4f5]" : ""
                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                            onClick={() => {
                              handleMenuClick(item.metric_name, false);
                            }}
                          >
                            Previous Month
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="flex items-center justify-center flex-col gap-y-3">
                <div className="font-medium text-lg"> {item?.metric_name}</div>
                <div className="font-bold text-[40px] tracking-wider">
                <span className="mr-1">
      {metricNames.some(metric => metric.metric_name === item.metric_name && metric.metric_type === 'Amount') ? 'A$' : ''}
    {item.metric_name === "Gross profit margin"
                    ? item.value // Display the raw value without conversion
                    : selectedCategories[item.metric_name] ||
                      selectedCategories[item.metric_name] === undefined
                    ? Number(item.value).toFixed(2)
                    : Number(item.value2).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}

        <Menu as="div" className='relative'>
          <Menu.Button className="relative bg-white  w-[310px] bg-opacity-0 h-[282px] p-4 flex  rounded-xl flex-col  border-2 border-dotted border-green-600 items-center justify-center text-green-600 hover:cursor-pointer hover:bg-green-200 hover:bg-opacity-50 ease-in-out transition duration-300">
          Add metric
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
              <Menu.Items className="absolute mt-2 origin-top-right top-[-15] bottom-[0] left-2 right-12 bg-white border-2 border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl outline-none w-[300px] h-[400px] z-10 overflow-y-auto ">
                <div className="px-1 py-1 w-full ">
                  {
                  origData.map((item) => item && item.metric_name !== null && (
                
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
                          {hoveredItem && hoveredItem.metric_name === item.metric_name && item.metric_name !== '' && (
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
          </Menu> 
        
        <Menu/>

        


      </div>
        </>
      ) : <>
      <Test data={origData}/>
      </>}
      </div>
    </div>
  );
};

export default Metrics;
