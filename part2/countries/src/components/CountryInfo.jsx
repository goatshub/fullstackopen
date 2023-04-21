import { useEffect, useState } from "react";
import weatherServices from "../services/weather";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    weatherServices
      .getCountryWeather(
        country.capitalInfo.latlng[0],
        country.capitalInfo.latlng[1]
      )
      .then((res) => setWeather(res));
  }, [country.capitalInfo.latlng]);

  return (
    <div className="countryInfoDiv">
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString("en-US")}</p>
      {country.languages && (
        <div className="languagesDiv">
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language, i) => (
              <li key={i}>{language}</li>
            ))}
          </ul>
        </div>
      )}
      <img src={country.flags.png} alt="Flag of country" />
      {weather && (
        <div className="weatherDiv">
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels like: {weather.main.feels_like} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};
export default CountryInfo;
