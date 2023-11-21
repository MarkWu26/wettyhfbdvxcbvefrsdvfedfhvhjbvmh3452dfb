import React, { useState } from "react";
import quickbooksImg from "../assets/quickbooks.png";
import { VscDebugDisconnect } from "react-icons/vsc";

const integrationList = [
  {
    name: "Xero",
    img: "https://cdn1.databox.com/images/apps/s/Xero.png",
  },
  {
    name: "MYOB",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/MYOB_Logo.png",
  },
  {
    name: "QuickBooks",
    img: quickbooksImg,
  },
];

const Integrations = () => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div>
      <div className="flex flex-col gap-x-5 w-full">
        <div className="flex flex-row gap-x-5 ">
          {integrationList.map((integration, index) => (
            <div
              key={index}
              className={`flex bg-white px-8 w-[33%] rounded-xl h-[80px] shadow-lg cursor-pointer transition-all ease-in-out duration-500 ${
                isHovered === index
                  ? "hover:bg-green-600 hover:text-green-600"
                  : ""
              }`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="flex flex-row items-center gap-x-6 w-full">
                {isHovered == index && (
                    <div className="text-white flex justify-center font-semibold flex-row w-full items-center gap-x-2">
                        <VscDebugDisconnect className="text-xl"/> Connect
                    </div>
                )}
                {isHovered !== index && (
                  <div>
                    <img
                      src={integration.img}
                      className={`${
                        integration.name === "MYOB"
                          ? "w-[65px] h-[50px] rounded-[50%]"
                          : "w-[45px] h-[45px] rounded-[50%]"
                      }`}
                    />
                  </div>
                )}

                <div>
                  <span>{isHovered !== index ? integration.name : ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
