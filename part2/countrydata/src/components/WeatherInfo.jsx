import { useState, useEffect } from 'react'
import WeatherService from '../services/weather'


const WeatherInfo = ({city}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        WeatherService.getWeather(city).then(w => setWeather(w)).catch(() => {
            console.log("Error fetching weather")
        })        
    }, [city])

    if (!weather) {
        return null
    } 

    return (
        <div>
            <h1>Current Weather in {city}:</h1>
            <p>Temperature: {weather.temperature} degrees celsius</p>
            <p>Wind Speed: {weather.windSpeed} km/h</p>
        </div>
    )
    

    
}

export default WeatherInfo