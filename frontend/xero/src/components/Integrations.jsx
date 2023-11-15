import React from 'react'

const Integrations = () => {
  return (
    <div>
        <div className='flex flex-col gap-x-5 w-full'>
            <div className='flex flex-row gap-x-3 '>
                <div className='flex bg-white px-8 w-[33%] rounded-lg h-[84px] shadow-lg'>
                    <div className='flex flex-row items-center gap-x-6'>
                        <div>
                        <img
                            src="https://cdn1.databox.com/images/apps/s/Xero.png"
                            className="rounded-[50%] w-[45px] h-[45px]"
                        />
                        </div>
                        <div>
                        <span>Xero</span>
                        </div>
                    </div>
                   
                </div>
                <div className='flex bg-white w-[33%] rounded-lg shadow-lg'>

                </div>
                <div className='flex bg-white w-[33%] rounded-lg shadow-lg'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Integrations