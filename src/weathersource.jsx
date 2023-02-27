const weatherAPi = import.meta.env.VITE_API_KEY;

const makeIconURL = (iconId) =>
  `http://openweathermap.org/img/wn/${iconId}.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPi}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    description,
    iconURL: makeIconURL(icon),
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };
