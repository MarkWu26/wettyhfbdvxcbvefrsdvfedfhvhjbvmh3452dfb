import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Menu, Transition } from "@headlessui/react";
import isEqual from 'lodash.isequal';
import CalculateMetrics from "../components/CalculateMetrics";

const Metrics = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [savedMetric, setSavedMetric] = useState(null);
  const [metricNames, setMetricNames] = useState([]);
  const [origData, setOrigData] = useState([])
  const [isCustom, setIsCustom] = useState(false);
  

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

                return {
                  metric_name: nameCell?.Value,
                  value: valueCell?.Value,
                  value2: value2Cell?.Value,
                };
              })
            ) || [];

            console.log('api result', cellValuesArray)
            setOrigData(cellValuesArray)

       /*      await fetchUserMetrics(); */


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
            /*   const userResponse = userMetrics.data
              categoriesToInclude.push(userResponse.data.map(item => item.metric_name)) */
              const newData = cellValuesArray.filter((item) =>
                categoriesToInclude.includes(item?.metric_name)
              );

              const combine = [...data, newData]
              const latestData = [data, ...userMetrics.data.metrics]
              console.log('LATEST DATA: ', latestData)

              setData(...cellValuesArray, ...latestData);
              console.log('THE NEW DATA IS: ', [...data, latestData])
              
            
              setData(newData)
            }else{

              const combine = [...data, cellValuesArray]
              const latestData = [...combine, userMetrics.data]

              setData(...data, latestData);
              console.log('THE NEW DATA IS: ', [...data, latestData])
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
    
   


/*   let newData = []; */

/*  useEffect(()=>{
  if(data.length>0 && savedMetric.length >0){
    const latestData = data.filter((item) => item);

    const foundData = latestData.filter((dataItem) => {
      return savedMetric?.some(
        (savedMetric) => savedMetric.metric_name === dataItem.name
      );
    });
    console.log("the found data: ", foundData);

    const finalData = data.concat(foundData);
    console.log("FINAL DATA: ", finalData);
    var categoriesToInclude = [
      "Debtors",
      "Creditors",
      "Average debtors days",
      "Average creditors days",
      "Income",
      "Expenses",
      "Gross profit margin",
      "Net assets",
    ];
    const newData = finalData.filter((item) =>
      categoriesToInclude.includes(item?.name)
    );

    setData(newData)

    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      setData(newData);
    } 
  }
}, []) 
 
*/


var categoriesToIncludes = [
  "Debtors",
  "Creditors",
  "Average debtors days",
  "Average creditors days",
  "Income",
  "Expenses",
  "Gross profit margin",
  "Net assets",
];

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
          console.log('newsavedlol: ', newsaved)
         
       
            setSavedMetric(newsaved);
      
      
        } catch (error) {
          console.log(error);
        }
      };

      setData(data.concat(response.data))
     
     
      categoriesToIncludes.push(name)
     


    } catch (error) {
      console.log(error)
    }
  }

 /*  useEffect(()=>{
    console.log('hola');
    console.log(savedMetric)
    const latestData = origData.filter((item) => item);
    const foundData = latestData.filter((dataItem) => {
      const lastSaved = savedMetric.length - 1
     
      return savedMetric[lastSaved].metric_name.includes(dataItem.name) 
      
  });
    console.log("the found data: ", foundData);
    

    const finalData = data.concat(foundData);
    console.log("FINAL DATA: ", finalData);

    
     console.log('new categories: ', categoriesToIncludes)
   
    console.log('the new hahaa: ', finalData)

    setData(finalData)
  }, [savedMetric]) */



  return (
    <>
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
              {console.log('ASDF ', origData)}
              {
              origData.map((item) => (
                <Menu.Item key={item?.metric_name} className="z-10">
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-[#f3f4f5]" : ""
                      } block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full`}
                      onClick={()=>addMetric(item?.metric_name, item.value, item.value2)}
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

      <div className="grid grid-cols-4 gap-x-3 gap-y-4 mt-10  ml-[70px] py-5 px-12 ">
       
        {data &&
          data.map(
            (item, key) =>
              item && (
                <div
                  key={key}
                  className="bg-white max-w-[310px] h-[282px] p-4 flex justify-start rounded-xl shadow-lg flex-col"
                >
                  <Menu
                    as="div"
                    className="relative inline-block text-left mb-8"
                  >
                    <div>
                      <Menu.Button className="text-secondary text-xs hover:bg-[#f3f4f5] rounded-md px-3 py-1">
                        {selectedCategories[item.metric_name] ||
                        selectedCategories[item.metric_name] === undefined
                          ? "Current Month"
                          : "Previous Month"}
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
              )
          )}
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
