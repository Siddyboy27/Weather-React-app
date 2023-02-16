import React from 'react'
import '../styles/Topnav.css'
function TopNav({setCity}) {



    const cities=[
        {
            id:1,
            name:'Tokyo'
        },
        {
            id:2,
            name:'Rome'
        },
        {
            id:3,
            name:'Delhi'
        },
        {
            id:4,
            name:'Madrid'
        },
        {
            id:5,
            name:'Washington'
        },
    ]
  return (
    <div className='topnav'>
        {cities.map((city)=>{
            return <button key={city.id} className='opt' onClick={()=>setCity({q:city.name})}>{city.name}</button>
        })}
    </div>
  )
}

export default TopNav