import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'

import {template} from './components/forecastTemplate'



const api = {
  key: "7934aaf4cb7c2ed0177c8549dd784243",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('')
        console.log(result)
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 0) ? 'app cold': 'app'): 'app'}>
      <div className="bg">
      <div id="search-box" className="ui input"><input onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} className="search-bar" type="text" placeholder="Search..."/></div>
        {(typeof weather.main != "undefined") ? (
          <div> 
          <div className="location">
            <div className="city">{weather.name}, {weather.sys.country}</div>
            {/* <div className="date">{dateBuilder(new Date())}</div> */}
          </div>
          <div className="weather-container">
            <div className="temp">
              {Math.round(weather.main.temp)}{"°C"}
            </div>
        <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      ): ('')}
      
      </div>
   </div>
  );
}


export default App;
