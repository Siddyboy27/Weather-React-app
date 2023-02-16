import React from 'react'
import {    UilTemperature,    UilTear,    UilWind,    UilSun,    UilSunset, UilArrowCircleUp,UilArrowCircleDown } from "@iconscout/react-unicons";
import { getIcon } from '../API_Services/Weather';
import { formatTime } from '../API_Services/Weather'
import '../styles/Temperature.css'

function Temperature({weather:{details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone},SI}) {
  
    return (
    <div>
        <div className='details'>
            <p>{details}</p>
        </div>

        <div className='temperature'>


            <div className='box'>
                <img src={getIcon(icon)} alt="" className='w-40' />
                <p className='text-6xl'>{temp.toFixed()}°{SI}</p>
            </div>

            <div className='box'>
            <div className='flex flex-col space-y-2'>
                <div className='properties'>
                    <UilTemperature size={18} className='mr-1'/>
                    Feels Like:
                    <span className='font-medium ml-1'>{feels_like.toFixed()}°{SI}</span>
                </div>
                <div className='properties'>
                    <UilWind size={18} className='mr-1'/>
                    Wind:
                    <span className='font-medium ml-1'>{speed.toFixed()} km/h</span>
                </div>
                <div className='properties'>
                    <UilTear size={18} className='mr-1'/>
                    Humidity:
                    <span className='font-medium ml-1'>{humidity.toFixed()}%</span>
                </div>
            </div>


           
            
                
            </div>
        </div>

        <div className='properties box-h space-x-8 text-white text-sm py-3'>
            <UilSun/>
            <p className='font-light'>
                Rise: <span className='font-medium ml-1'>{formatTime(sunrise,timezone,'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>
            <UilSunset/>
            <p className='font-light'>
                Set: <span className='font-medium ml-1'>{formatTime(sunset,timezone,'hh:mm a')}</span>
            </p>
            <p className='font-light'>|</p>
            <UilArrowCircleUp/>
            <p className='font-light'>
                High: <span className='font-medium ml-1'>{temp_max.toFixed()}°{SI}</span>
            </p>
            <p className='font-light'>|</p>
            <UilArrowCircleDown/>
            <p className='font-light'>
                Low: <span className='font-medium ml-1'>{temp_min.toFixed()}°{SI}</span>
            </p>


        </div>
    </div>
  )
}

export default Temperature