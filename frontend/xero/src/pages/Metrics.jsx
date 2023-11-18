import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Menu, Transition } from "@headlessui/react";
import CalculateMetrics from "../components/CalculateMetrics";
import { BsInfoCircleFill } from "react-icons/bs";
import Modal from "../components/Modal";
import { BiSolidTrash } from "react-icons/bi";

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


  const definition = [
    {
      name: 'Expenses',
      description: "The Expenses metric in Xero tracks the money spent by a business on various costs such as office supplies, rent, utilities, and employee salaries. It helps in analyzing the company's financial health by providing insights into where the money is being spent and how it can be optimized."
    },
    {
      name: 'Income',
      description: 'The income metric reflects the total revenue genrated by a business during a specific period, including sales, services, and other sources of income'
    },
    {
      name: 'Debtors',
      description: "The Debtors metric in Xero measures the total amount of money owed to a company by its customers, indicating the level of outstanding debts and the company's ability to collect payment."
    },
    {
      name: 'Creditors',
      description: "The Creditors metric in Xero tracks the amount of money a business owes to its suppliers or vendors for goods or services received but not yet paid. It helps monitor the company's financial liability and cash flow management."
    },
    {
      name: 'Gross profit margin',
      description: "Gross Profit is a financial metric that shows the profit earned by a business after deducting the cost of goods sold from its revenue. It represents the amount of money left after accounting for the direct expenses associated with producing and selling a particular product or service."
    },
    {
      name: 'Average debtors days',
      description: "Average Debtors Days is a financial metric that measures how quickly a company can collect its accounts receivable. It is calculated by dividing the total amount of accounts receivable by the average daily sales, and the result represents the number of days it takes for a company to collect its outstanding debts."
    },
    {
      name: 'Average creditors days',
      description: "The Average Creditors Days metric is a measure of how long it takes a business to pay its suppliers. It is calculated by dividing accounts payables by the average daily cost of goods sold and is a key indicator of a company's cash flow management and supplier relationships."
    },
    {
      name: 'Net assets',
      description: "Net Assets is the total value of an organization's assets minus its liabilities. It reflects the overall financial health of the business and is used to determine the company's ability to pay off long-term debt and generate future profits."
    },

  ]

  
  

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
        /*   setUserSaved(userMetrics.data.metrics) */
        
        console.log('HOOIII: ', userMetrics.data)
        const reports = JSON.parse(response.data.body).Reports[0];
        console.log(reports);

        const extractCellValues = async () => {
          const cellValuesArray =
            reports?.Rows?.flatMap((section) =>
              section?.Rows?.map((row) => {
                const nameCell = row?.Cells?.[0];
                const valueCell = row?.Cells?.[1];
                const value2Cell = row?.Cells?.[2];
                const metric_name = nameCell?.Value

                const metricDefinition = definition.find((def) => def.name === metric_name);


                return {
                  metric_name: nameCell?.Value,
                  description: metricDefinition?.description || 'No description available',
                  value: valueCell?.Value,
                  value2: value2Cell?.Value,
                };
              })
            ) || [];

            console.log('api result', cellValuesArray)
            setOrigData(cellValuesArray)

            if(!savedMetric){
         
              let categoriesToInclude = [
                "Debtors",
                "Creditors",
                "Average debtors days",
                "Average creditors days",
                "Income",
                "Expenses",
                "Gross profit margin",
                "Net assets",
              ];
        
          /*     const newData = cellValuesArray.filter((item) =>
                categoriesToInclude.includes(item?.metric_name)
              ); */
              const testdata = userMetrics.data.metrics;
              const newsaved = testdata.map((item) => item);

              const newSavedWithDescriptions = newsaved.map((item) => {
                const metricDefinition = definition.find((def) => def.name === item.metric_name);
              
                return {
                  ...item,
                  description: metricDefinition?.description || 'No description available',
                };
              });
       

              setUserSaved(newSavedWithDescriptions)
              console.log('HOHO', newSavedWithDescriptions)

           /*    const combine = [...data, newData]
              const latestData = [data, ...userMetrics.data.metrics]
              console.log('LATEST DATA: ', latestData)

              setData(...cellValuesArray, ...latestData);
              console.log('THE NEW DATA IS: ', [...data, latestData]) */
              
            
              setData(newSavedWithDescriptions)
            }else{

              const newSavedWithDescriptions = userSaved.map((item) => {
                const metricDefinition = definition.find((def) => def.name === item.metric_name);
              
                return {
                  ...item,
                  description: metricDefinition?.description || 'No description available',
                };
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

      const newSaved = userSaved.concat(response.data)
      const newSavedWithDescriptions = newSaved.map((item) => {
        const metricDefinition = definition.find((def) => def.name === item.metric_name);
      
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
    <>
    {console.log('WUUT: ', userSaved)}
      <Navbar title={"Metrics"} />
      <Sidebar />
      <button 
      className="bg-[#f3f4f5] text-secondary px-5 py-1 rounded-[5px] absolute top-0 mt-4 left-0 ml-60"
      onClick={()=>setIsCustom(!isCustom)}
      >Custom Metrics</button>
      {!isCustom ? (
        <>
        <Menu as="div">
        <Menu.Button className="bg-[#25a767] text-white px-5 py-1 rounded-[5px] absolute top-0 mt-4 right-0 mr-6">
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
            
                <Menu.Item key={item?.metric_name} className="z-10">
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-[#f3f4f5]" : ""
                      }  px-4 py-2 text-sm text-gray-700 cursor-pointer w-full flex items-center justify-between`}
                      onClick={()=>addMetric(item?.metric_name, item.value, item.value2)}
                    >
                      {item?.metric_name} <BsInfoCircleFill className="text-blue-500"/>
                    </button>
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
              className="bg-white max-w-[310px] h-[282px] p-4 flex justify-start rounded-xl shadow-lg flex-col"
            >
               <Modal isOpen={isOpen} title={selectedMetric?.metric_name} description={selectedMetric.description} setIsOpen={setIsOpen}/>
              
              <Menu
                as="div"
                className="relative flex items-center justify-between gap-x-8 text-left mb-8"
              >
                 
                <div>
                  <Menu.Button className="text-secondary text-xs hover:bg-[#f3f4f5] rounded-md px-3 py-1">
                    {selectedCategories[item.metric_name] ||
                    selectedCategories[item.metric_name] === undefined
                      ? "Current Month"
                      : "Previous Month"}
                  </Menu.Button>
                </div>
                {/* View */}
                <div className="flex items-end gap-x-3">
                <button
                onClick={()=>{setIsOpen(!isOpen); setSelectedMetric(item)}}
                >
                  <BsInfoCircleFill className="text-blue-500"/>
                </button>
                <button
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
                  <span className="mr-1">$</span>

                  {item.metric_name === "Gross profit margin"
                    ? item.value // Display the raw value without conversion
                    : selectedCategories[item.metric_name] ||
                      selectedCategories[item.metric_name] === undefined
                    ? Number(item.value).toFixed(2)
                    : Number(item.value2).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        <div className="bg-white  max-w-[310px] bg-opacity-0 h-[282px] p-4 flex  rounded-xl flex-col  border-2 border-dotted border-green-600 items-center justify-center text-green-600 hover:cursor-pointer hover:bg-green-200 hover:bg-opacity-50 ease-in-out transition duration-300">
          Add metric
        </div>
      </div>
        </>
      ) : <>
      <CalculateMetrics data={origData}/>
      </>}
      
    </>
  );
};

export default Metrics;
