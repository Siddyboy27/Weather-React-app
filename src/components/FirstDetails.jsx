import React from 'react'
import { formatTime } from '../API_Services/Weather'

function FirstDetails({weather:{dt,timezone,name,country}}) {
    
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {formatTime(dt,timezone)}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-3xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  )
}

export default FirstDetails