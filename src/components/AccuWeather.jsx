import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccuWeather = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const API_KEY = 'AvGh7tFW3Nf3z6gibvdjhHw2G1DU2zPU';
    const API_URL = `http://dataservice.accuweather.com/currentconditions/v1/123456?apikey=${API_KEY}`;

    axios.get(API_URL)
      .then(response => {
        setWeatherData(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="text-red-600 justify-between absolute z-10 items-end w-80" style={{ marginTop: '-1rem'}}>

      <p>Temperature: {weatherData.Temperature?.Imperial?.Value} F</p>
      <p>Weather: {weatherData.WeatherText}</p>
    </div>
  );
};

export default AccuWeather;
