import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCountryWeather = (lat, lon) => {
  const response = axios.get(
    `${baseUrl}?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  );
  return response.then((res) => res.data);
};
export default { getCountryWeather };
