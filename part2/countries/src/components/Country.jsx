import axios from "axios";
import { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_SOME_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, []);
  console.log(weather);
  if (!weather) {
    return null;
  }
  const weatherImg = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <h1>{country.name.official}</h1>
      <p>
        {country.capital}
        <br />
        {country.area}
      </p>
      <h2>Languages:</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Logo" />
      <h2>Weather in {country.capital}</h2>
      <p>
        Temperature is {Number((weather.main.temp - 273.15).toFixed(2))} Celcius
      </p>
      <img src={weatherImg} alt="WeatherImg" />
      <p>Wind {weather.wind.speed}m/s</p>
    </>
  );
};

export default Country;
