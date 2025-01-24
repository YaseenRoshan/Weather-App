import './Weather.css';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "93b09eed9ed0814cd762f738772ba139"; 

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            if (!response.ok) throw new Error('Failed to fetch weather data');
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (e) => setCity(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) fetchWeather();
    };

    return (
        <div className="weather">
            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                    <label htmlFor="city-input" className="visually-hidden">

                    </label>
                    <input
                        id="city-input"
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="Enter city name..."
                        aria-label="City name"
                    />
                    <button type="submit" aria-label="Search">
                        <img src={search_icon} alt="Search icon" />
                    </button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weatherData && !loading && !error && (
                <div>
                    <div className="weather-summary">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                            className="weather-icon"
                        />
                        <p className="temp">{Math.round(weatherData.main.temp - 273.15)}°C</p>
                        <p className="location">{weatherData.name}</p>
                    </div>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity icon" />
                            <div>
                                <p>{weatherData.main.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind speed icon" />
                            <div>
                                <p>{weatherData.wind.speed} m/s</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
