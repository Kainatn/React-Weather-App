import React from "react";
import { Card } from 'antd';
import './Section.css'
var moment = require('moment');
const Weather = ({ reading }) => {

    let newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)

    // let d = new Date();
    // let weekday = new Array(7);
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";

    const celsius = Math.floor(reading.main.temp - 273.15);
    return (

        <div className="main">
            <Card title={moment(newDate).format('dddd')} style={{ width: 250 ,background:'#faebd75c'}}>
                <p>{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <img src={`http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`} alt='weather icon' className='icons' />
                <h2>{reading.weather[0].description}</h2>
                <p>{celsius} °C</p>
            </Card>
        </div>
    );
}

export default Weather;
