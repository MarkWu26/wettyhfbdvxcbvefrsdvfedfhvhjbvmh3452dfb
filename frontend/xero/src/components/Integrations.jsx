import React from 'react'


const integrationList = [
    {
        "name": "Xero",
        "img": "https://cdn1.databox.com/images/apps/s/Xero.png"
    },
    {
        "name": "MYOB",
        "img": "https://upload.wikimedia.org/wikipedia/commons/3/33/MYOB_Logo.png"
    },
    {
        "name": "QuickBooks",
        "img": ""
    },
]

const Integrations = () => {
  return (
    <div>
        <div className='flex flex-col gap-x-5 w-full'>
            <div className='flex flex-row gap-x-5 '>
                {integrationList.map((integration, index)=> (
                    <div key={index} className='flex bg-white px-8 w-[33%] rounded-xl h-[80px] shadow-lg'>
                    <div className='flex flex-row items-center gap-x-6'>
                        <div>
                        <img
                            src={integration.img}
                            className={`${
                                integration.name === "MYOB"
                                  ? 'w-[65px] h-[50px] rounded-[50%]'
                                  : 'w-[45px] h-[45px] rounded-[50%]'
                              }`}
                        />
                        </div>
                        <div>
                        <span>{integration.name}</span>
                        </div>
                    </div>
                    </div>
                ))}
               
              
            </div>
        </div>
    </div>
  )
}

export default Integrations