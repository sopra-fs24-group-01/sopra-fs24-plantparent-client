import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../service/weatherService";


export function WeatherComponent() {
  const [location , setLocation] = useState({ latitude: 47.3769, longitude: 8.5417});
  const [weatherData, setWeatherData] = useState<any>(null);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation();
  }, [])

  useEffect(() => {
    const weatherData = getWeatherData(location);
    weatherData.then((data) => {
      setWeatherData(data)
    });
  }, [location])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      TempC: {weatherData.current.temp_c}
      TempF: {weatherData.current.temp_f}
      Wind: {weatherData.current.wind_kph}
      Condition: {weatherData.current.condition.text}
      Icon: <img src={"https://" + weatherData.current.condition.icon} alt="weather icon"/>
    </div>
  );
}