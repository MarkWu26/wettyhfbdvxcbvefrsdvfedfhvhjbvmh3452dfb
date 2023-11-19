import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TableList from "../components/TableList";
import Searchbar from "../components/Searchbar";
import Context from "../stateContext/Context";
import Integrations from "../components/Integrations";
import axios from "axios";

const DataManager = () => {
  const [xeroUrl, setXeroUrl] = useState('');
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const fetchXeroUrl = async () =>{
      try{
        const response = await axios.get('/')
        console.log('the url is: ', response.data.xeroUrl);
        setXeroUrl(response.data.xeroUrl);
      }
      catch(error){
        console.log(error)
      }
    }

    const fetchMetrics = async () => {
      try{
        const userMetrics = await axios.get(
          "http://localhost:5000/user/savedMetrics",
          {
            withCredentials: true,
          }
        );
        const metricsResponse = userMetrics.data.metrics;
        console.log('the count of metrics is:', metricsResponse.length)
        setCount(metricsResponse.length)
    
      }catch(error){
        console.log(error)
      }
    

   
    }

    fetchXeroUrl();
    fetchMetrics();
  }, [])


  const { isDataSource } = useContext(Context);


  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Sidebar />
      <Navbar url={xeroUrl}/>
      {/* Body */}
      <div className="mt-[30px] ml-[70px] py-16 px-12">
        {/* Search */}
        <div className="mb-5 flex flex-row items-center justify-between">
          <Searchbar />
          {isDataSource && (
            <div className="flex flex-row gap-x-4">
              <div className="flex-row">
                <p className="text-[#8e929b]">
                  Data Source <span className="text-black ml-2">All</span>
                </p>
              </div>
              <div className="flex-row gap-x-2">
                <p className="text-[#8e929b]">
                  Created by <span className="text-black ml-2">Everyone</span>
                </p>
              </div>
              <div className="flex-row gap-x-2">
                <p className="text-[#8e929b]">
                  Status <span className="text-black ml-2">All</span>
                </p>
              </div>
            </div>
          )}
        </div>
        {isDataSource ? (
          <div>
            <TableList count={count} xeroUrl={xeroUrl} />
          </div>
        ): (
            <div>
                <Integrations/>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataManager;
