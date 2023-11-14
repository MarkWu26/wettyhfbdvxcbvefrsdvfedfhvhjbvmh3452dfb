import React from "react";

const TableList = () => {
  return (
    <>
      <div className=" bg-[#F9FAFA] rounded-t-[5px] overflow-hidden h-[45px]">
        <div className="bg-[#F9FAFA] w-full h-full flex flex-row text-[#8e929b] items-center px-5">
          <div className="w-[27%] ">Title</div>
          <div className="w-[15%] ">Connected</div>
          <div className="w-[14%] ">Permisions</div>
          <div className="w-[20%] ">Status</div>
          <div className=" w-[24%]">Available Metrics</div>
        </div>
      </div>
      <div className="h-[110px] bg-white hover:drop-shadow-lg">
        <div className="w-full h-full flex flex-row  items-center">
          {/* Title */}
          <div className="w-[27%] px-4">
            <div className="flex flex-row items-center">
              <div className="w-[30%]">
                <img
                  src="https://cdn1.databox.com/images/apps/s/Xero.png"
                  className="rounded-[50%] w-[45px] h-[45px]"
                />
              </div>
              <div className="w-[70%] flex flex-col">
                <h2 className="font-medium text-lg">Demo Company (Global)</h2>
                <span className="text-[#8e929b] text-sm">Xero</span>
              </div>
            </div>
          </div>
          {/* Connected */}
          <div className="w-[15%] flex-row  flex items-center text-[#8e929b] justify-start px-2">
            <div className="flex flex-col">
            <div>
                <span>Nov 13, 2023</span>
            </div>
            <div>
                <span>by Mark Wu</span>
            </div>
            </div>
          </div>
          <div className="w-[14%] flex-row  flex items-center text-[#8e929b] justify-start px-2">
            <span>All users</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableList;
