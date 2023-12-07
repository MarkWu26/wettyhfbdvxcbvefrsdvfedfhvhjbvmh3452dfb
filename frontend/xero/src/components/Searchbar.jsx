import React from 'react'

const Searchbar = ({setSearch, search}) => {
  return (
    <>
        <input type="text" className='w-[300px] px-4 py-2 rounded-[5px] border'placeholder='Search...'
        onChange={(e)=>setSearch(e.target.value)}
        />
    </>
  )
}

export default Searchbar