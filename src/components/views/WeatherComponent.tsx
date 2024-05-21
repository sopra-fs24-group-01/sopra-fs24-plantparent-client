import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../service/weatherService";
import styled from "styled-components";

const StyledWeatherAndLocationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 15px;
`;

const StyledWeatherContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledWeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1rem;
  font-style: italic;
  max-height: 60px;
  position: relative;
  
  img {
    width: 50px;
    height: 50px;
    margin-bottom: -5px
  }
`;

const StyledWeatherTemp = styled.div`
  font-size: 1.5rem;
  max-height: 60px;
  text-align: center;
  align-content: center;
  position: absolute;
  left: 50px;
`;

const StyledWeatherLocation = styled.div`
  font-weight: bold;
`;

export function WeatherComponent({ location }: { location: { latitude: number, longitude: number } }) {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const weatherData = getWeatherData(location);
    weatherData.then((data) => {
      setWeatherData(data)
    });
  }, [location])

  if (!weatherData) {
    return <div>Loading weather data...</div>
  }

  return (
    <StyledWeatherAndLocationContainer>
      <StyledWeatherContainer>
        <StyledWeatherIconContainer>
          <img src={"https://" + weatherData.current.condition.icon} alt="weather icon"/>
          {weatherData.current.condition.text}
          <StyledWeatherTemp title={weatherData.current.temp_f + "°F"}>{weatherData.current.temp_c}°C</StyledWeatherTemp>
        </StyledWeatherIconContainer>
      </StyledWeatherContainer>
      <StyledWeatherLocation>{weatherData.location.name}, {weatherData.location.country}</StyledWeatherLocation>
    </StyledWeatherAndLocationContainer>
  );
}