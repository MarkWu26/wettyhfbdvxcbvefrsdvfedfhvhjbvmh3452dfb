import React, { useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {
    const [isDataSource, setIsDataSource] = useState(true)
  return (
   <Context.Provider value={{isDataSource, setIsDataSource}}>
    {children}
   </Context.Provider>
  )
}

export default Provider
