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
  const [userData, setUserData] = useState(null)
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  console.log('the search is: ', search)
  const {userInfo, setUserInfo} = useContext(Context);
  console.log('userinfoo: ', userInfo)



  useEffect(()=>{
    const fetchXeroUrl = async () =>{
      try{
        const response = await axios.get('/')
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

    const getAuth = async () => {
      const auth = await axios.get(
        "http://localhost:5000/getAuth",
        {
          withCredentials: true,
        }
      );
   
      const userInfo = auth.data.userInfo
      const {name, email, auth_time} = JSON.parse(userInfo)
      const newUserInfo = {
        name: name,
        email:email,
        authTime: auth_time
      }
      console.log(JSON.parse(auth.data.userInfo))
      setUserInfo(newUserInfo)
      if(name, email, auth_time){
        setIsLoggedIn(true)
      }

      const organization = await axios.get('http://localhost:5000/getOrganisation',  {
        withCredentials: true,
      })
      const org = JSON.parse(organization.data.body)
      const orgName = org.Organisations[0].Name

      const organizationName = {
        orgName: orgName
      }
     
      setUserInfo({...newUserInfo, ...organizationName})
     
    }


    fetchXeroUrl();
    fetchMetrics();
    getAuth()
   
  }, [])


  const { isDataSource } = useContext(Context);
 


  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Sidebar title={"Data Manager"} userInfo={userData} isLoggedIn={isLoggedIn}/>
      <Navbar url={xeroUrl}/>
      {/* Body */}
      <div className="mt-[30px] ml-[70px] py-16 px-12">
        {/* Search */}
        <div className= {`mb-5 flex flex-row items-center  ${isDataSource ? 'justify-end' : 'justify-between'}`}>
          {!isDataSource && (
          <Searchbar setSearch={setSearch} search={search} />
          ) }
        
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
            <TableList count={count} xeroUrl={xeroUrl} userInfo={userData} isLoggedIn={isLoggedIn} />
          </div>
        ): (
            <div>
                <Integrations xeroUrl={xeroUrl} search={search}/>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataManager;
