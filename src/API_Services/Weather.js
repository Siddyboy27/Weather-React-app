import { DateTime } from "luxon";

const Key='1bfaf56699a031403ee8b2a73534dcd6';

const base='https://api.openweathermap.org/data/2.5'
const proBase='https://pro.openweathermap.org/data/2.5'

const getData=async(type,params)=>{
    const url=type==='weather'? new URL(base+'/'+type):new URL(proBase+'/'+type);
    url.search=new URLSearchParams({...params,appid:Key});

    
    return fetch(url).then((res)=>res.json())
    .then((data)=>data);
}

const getDetail = (data)=>{
    
    const {
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}

    }=data

    const{main: details,icon}=weather[0];


    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed}
}

const formatDay =(data)=>{
    let {city, list}=data;
    let {timezone}=city;
    
    let daily=list.slice(1,11).map(d=>{
        return {
            title: formatTime(d.dt,timezone,'cccc'),
            temp:d.temp.day,
            icon:d.weather[0].icon
        }
    });
    
    let timez=timezone
    return {timez,daily}
}
const formatHour =(data,timezone)=>{
    let {list}=data;
    
    
    let hourly=list.slice(1,11).map(d=>{
        return {
            title: formatTime(d.dt,timezone,'hh:mm a'),
            temp:d.main.temp,
            icon:d.weather[0].icon
        }
    });
    

    return {timezone,hourly}
}


const formatTime=(secs,zone,format="cccc, dd LLL yyyy' | 'hh:mm a")=>{
    
    
    return DateTime.fromSeconds(secs+zone,{zone:'GMT'}).toFormat(format)

}



const getFormat= async (params)=>{
    const format=await getData('weather',params).then(getDetail);

    const {lat,lon}=format;
    let cnt=11;
    const DailyForecast=await getData('forecast/daily',{
        lat,lon,cnt,

        units:params.units,
    }).then(formatDay);
    
    let {timez}=DailyForecast;
    const HourlyFormat=await getData('forecast/hourly',{
        lat,lon,cnt,

        units:params.units,
    }).then((data)=>formatHour(data,timez));
    return {...format,...DailyForecast,...HourlyFormat};
}



const getIcon= (id)=>`http://openweathermap.org/img/wn/${id}@2x.png`;


export default getFormat;
export {formatTime,getIcon};