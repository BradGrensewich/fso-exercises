import axios from 'axios';

const getWeather = (city) => {
  return axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${city}&aqi=no`,
    )
    .then((res) => {
      return {
        temperature: res.data.current.temp_c,
        windSpeed: res.data.current.wind_kph,
      };
    });
};

export default { getWeather };
