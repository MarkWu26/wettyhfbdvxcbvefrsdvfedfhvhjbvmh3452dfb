import React, { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

const Login = () => {

  const [xeroUrl, setXeroUrl] = useState('');

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

    fetchXeroUrl();
  }, [])

  const handleSignIn = () =>{
    console.log('okay');
    window.open(xeroUrl, 'authWindow', 'width=800, height=700')
  }


  return (
    <div className="flex h-screen w-screen flex-row">
      {/* left side */}
      <div className="flex w-[50%] bg-[rgb(234,240,243)]">
        <div className="container w-full flex py-[60px] px-[36px] items-center justify-center flex-row">
          <div className="ml-[250px] w-[355px] flex-col gap-y-32">
          <div className="max-w-[230px]">
            <img src="https://cdnwebsite.databox.com/wp-content/uploads/2023/10/05033210/generative-AI_login.png"/>
          </div>
          <div className="text-[10px] text-[#8e929b] mt-4">
            WHAT'S NEW
          </div>
          <div className=" text-[28px] text-[#292929] mt-4 font-[500]">
          New in Databox: Get Personalized, Actionable Insights With AI-powered Performance Summaries
          </div>
          {/* Button */}
          <div className="mt-4">
            <button className="px-[48px] py-2 bg-[#fff] hover:text-[#292929] rounded-[5px] text-[#8e929b] shadow-md">Read more</button>
          </div>
          </div>
        
        </div>
      </div>
      {/* Right side */}
      <div className="flex w-[50%] rounded-[5px] py-[36px] px-[60px]  ">
        <div className="flex items-center justify-start">
          <div className="flex-col  w-[335px] flex gap-y-5">
            <div className="flex flex-col gap-y-2">
            <label className="font-medium">Email</label>
            <input type="email" className="px-3 py-3 border-[#ccc]  border-[2px] text-[#555555] text-[14px] rounded-[5px]" placeholder="Email"/>
            </div>
            <div className="flex flex-col gap-y-2 "> 
            <label className="font-medium">Password</label>
            <input type="password" className="px-3 py-3 border-[#ccc]  border-[2px] text-[#555555] text-[14px] rounded-[5px] w-full" placeholder="Password"/>
            </div>

            <div className="flex flex-row justify-between ">
              <div className="flex flex-row gap-x-4 items-center justify-between">
              <input type="checkbox"/>
              <p className="font-medium text-[14px]">Keep me signed in</p>
              </div>
              <div className="flex flex-row text-[14px] items-end text-[#8e929b]">
                <a href="#">Forgot your password?</a>
              </div>
             
            </div>

            <div className="mt-16">
              <a className="flex items-center justify-center w-full bg-[#25a767] text-white py-3 rounded-[5px] hover:opacity-90 text-base" 
              href={xeroUrl}
              >Sign In</a>
            </div>

           
          </div>
      
        
      
          <div className="fixed bottom-[40px]  items-end text-[#8e929b] ">
            <div className="flex flex-col gap-y-2">
            <a href="#" >Login with SSO</a>
            <span>Don't have an account yet? <a className="text-[#1d9ad6]">Sign up</a></span>
        
            </div>

           
          </div>
          
       
         
        </div>
       
      </div>
    </div>
  );
};

export default Login;
