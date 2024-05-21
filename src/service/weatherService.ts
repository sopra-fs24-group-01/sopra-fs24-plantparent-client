const weatherAPIBaseURL = "https://api.weatherapi.com/v1/current.json"

const API_key = process.env.REACT_APP_WEATHER_API_KEY

export function getWeatherData({latitude, longitude}: {latitude: number, longitude: number}) {
  return fetch(weatherAPIBaseURL + "?key=" + API_key + "&q=" + latitude + "," + longitude + "&aqi=no")
    .then(response => response.json())
    .catch((error) => {
      console.error(error);
    });
}