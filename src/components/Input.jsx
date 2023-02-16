import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPinAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
import '../styles/Input.css'
function Input({setCity,unit,setUnits,setSI}) {

  const [search,setSearch]=useState('');

  const onSearch = () =>{
    if(search)
      setCity({q:search});
  }


  const onGeoLocate =() =>{
    if(navigator.geolocation) {
      toast.info('Fetching your location!!');
      navigator.geolocation.getCurrentPosition((Pos)=>{

        let lat=Pos.coords.latitude;
        let lon=Pos.coords.longitude;

        setCity({
          lat,lon
        })
      })
    }
  }


  const unitsChange =(e) =>{
    let value=e.currentTarget.name
    
      if(unit!==value)
      {
        setUnits(value);
        if(value==='metric')
          setSI('C');
        else
          setSI('F');
      }
        
  }
  return (
    <div className='Input'>
        <div className='content space-x-4'>
            <input type="text" 
            value={search }
            onChange={(e)=>setSearch(e.currentTarget.value)}
            placeholder='Search for a city'
            className='input-type' />

            <UilSearch size={25} className='Icon hover:scale-125' onClick={onSearch}/>
            <UilLocationPinAlt size={25} className='Icon hover:scale-125' onClick={onGeoLocate}/>

            <div className='Conversion'>
                <button name='metric' className='text-xl text-white font-light hover:scale-125' onClick={unitsChange}>°C</button>
                <p className='text-xl text-white mx-2'>|</p>
                <button name='imperial' className='text-xl text-white font-light hover:scale-125' onClick={unitsChange}>°F</button>
            </div>
        </div>
    </div>
  )
}

export default Input