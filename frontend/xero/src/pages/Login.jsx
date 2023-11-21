import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../assets/image.webp";
import { SiReactos } from "react-icons/si";

axios.defaults.baseURL = "http://localhost:5000";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [xeroUrl, setXeroUrl] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-row">
      {/* left side */}
      <div className="flex w-[50%] bg-[rgb(234,240,243)]">
        <div className="container w-full flex py-[60px] px-[36px] items-center justify-center flex-row">
          <div className="ml-[250px] w-[355px] flex-col gap-y-32">

            {/* Logo */}
            <div className="max-w-[230px]">
                <SiReactos className="text-[80px]"/>
            </div>

            <div className=" text-[20px] text-[#292929] mt-4 font-[500] flex-col flex mb-4">
              <span className=" mt-4">Don’t just pay it. Clear it.</span>{" "}
              <br className="" />
              <span className=""></span>
              Our Fintech solution empowers small and medium enterprises to save
              time, money and free up working capital by helping them settle
              their B2B invoices with minimal or no cash payments. Our Cashflow
              Moniitor allows SMEs to keep track of their cashflow by monitoring
              8 different metrics and compare against benchmarks.
            </div>
            {/* Button */}
            <div className="mt-12">
              <a
                className="px-[48px] py-2 bg-[#fff] hover:text-[#292929] rounded-[5px] text-[#8e929b] shadow-md"
                href="https://clearitt.com"
                target={"_blank"}
              >
                Read more
              </a>
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
              <input
                type="email"
                className="px-3 py-3 border-[#ccc]  border-[2px] text-[#555555] text-[14px] rounded-[5px]"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label className="font-medium">Password</label>
              <input
                type="password"
                className="px-3 py-3 border-[#ccc]  border-[2px] text-[#555555] text-[14px] rounded-[5px] w-full"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-row justify-between ">
              <div className="flex flex-row gap-x-4 items-center justify-between">
                <input type="checkbox" />
                <p className="font-medium text-[14px]">Keep me signed in</p>
              </div>
              <div className="flex flex-row text-[14px] items-end text-[#8e929b]">
                <a href="#">Forgot your password?</a>
              </div>
            </div>

            <div className="mt-16">
              <button
                className="flex items-center justify-center w-full bg-[#25a767] text-white py-3 rounded-[5px] hover:opacity-90 text-base"
                onClick={() => navigate("/data-manager")}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="fixed bottom-[40px]  items-end text-[#8e929b] ">
            <div className="flex flex-col gap-y-2">
              <a href="#">Login with SSO</a>
              <span>
                Don't have an account yet?{" "}
                <a className="text-[#1d9ad6]">Sign up</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
