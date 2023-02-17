import getFormat from './API_Services/Weather';

import './App.css';
import FirstDetails from './components/FirstDetails';
import Forecast from './components/Forecast';
import Input from './components/Input';
import Temperature from './components/Temperature';
import TopNav from './components/TopNav';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const[city,setCity]=useState({q:'Delhi'});
  const [unit,setUnits]=useState('metric');
  const [SI,setSI]=useState('C')
  const [weather,setWeather]=useState(null);


  useEffect (()=>{

    const Weather= async ()=>{
      const loc= city.q ? city.q : 'the location';
      toast.info('Fetching weather information for '+loc);
      await getFormat({...city,units:unit}).then((data)=>{
        
        toast.success("Succesfully retrieved data of "+data.name+", "+data.country);
        setWeather(data)
      
      });
      
     }
     Weather();
  },[city,unit]);

  
  const changeBg =() =>{
    

    const ref= unit==="metric" ? 30: 85;
    console.log(weather.temp);
    
    if(weather.temp<=ref)
      return "from-cyan-700 to-blue-700";
    else
      return "from-yellow-700 to-orange-700";
  }
  
  return (
    <div className={`py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${changeBg()}`} >
      <TopNav setCity={setCity}/>
      <Input setCity={setCity} unit={unit} setUnits={setUnits} setSI={setSI}/>
      {weather && (
        <div>
          <FirstDetails weather={weather} />
          <Temperature weather={weather} SI={SI}/>
          <Forecast title={'Forecast for the day'} data={weather.hourly} SI={SI}/>
          <br></br>
          <Forecast title={'Forecast for the week'} data={weather.daily} SI={SI}/>
        </div>
        
      )}
    
      <ToastContainer autoClose={6000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
