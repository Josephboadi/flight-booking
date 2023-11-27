import React from 'react'

const Breadcrump = ({title}) => {
  return (
    <div className='w-full h-[12vh] pt-10 pl-2'>
        <p className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ed8b00] to-[#ffd100] '>{title}</p>
    </div>
  )
}

export default Breadcrump