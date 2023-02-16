import React from 'react'
import { getIcon } from '../API_Services/Weather'

function Forecast({title,data,SI}) {
    
  return (
    <div >
        <div className='flex items-center justify-center my-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'/>

        <div className='flex flex-row items-center justify-between text-white'>
            {data.map((d,i)=>{
               return (
                <div key={i} className='flex flex-col items-center justify-center'>

                    <p className='font-light text-sm'>{d.title}</p>
                    <img src={getIcon(d.icon)} alt="" className='w-12 my-1'/>
                    <p className='font-medium'>{d.temp.toFixed()}°{SI}</p>
                </div>
                )
            })}   
        </div>
    </div>
  )
}

export default Forecast