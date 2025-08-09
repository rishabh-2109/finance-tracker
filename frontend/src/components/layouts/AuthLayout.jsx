import React from 'react'
import CARD_2 from "../../assets/images/card2.png";

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'> FinTrack– Personal Finance Tracker</h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
{/* <div className='w-48 h-48 roundend-[40px] bg-purple-600 absolute -top-7 -left-5'/>
<div className='w-48 h-56 roundend-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-10 '/>
<div className='w-48 h-48 roundend-[40px] bg-violet-500 absolute -bottom-7  -left-5'/> */}

<div className='grid grid-cols-1 z-20'></div>
<img src={CARD_2} 
className='w-64  lg:w-[88%] absolute bottom-0 shadow-lg shadow-blue-400/15' />
        </div>
    </div>
  )
}

export default AuthLayout