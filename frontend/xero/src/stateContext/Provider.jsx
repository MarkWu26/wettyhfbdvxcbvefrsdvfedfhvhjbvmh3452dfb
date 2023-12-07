import React, { useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {
    const [isDataSource, setIsDataSource] = useState(true);
    const [userInfo, setUserInfo] = useState(null)
  return (
   <Context.Provider value={{isDataSource, setIsDataSource, userInfo, setUserInfo}}>
    {children}
   </Context.Provider>
  )
}

export default Provider
