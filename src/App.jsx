import { useEffect, useState } from "react";
import IMAGES from "./assets/index";
import { getFormattedWeatherData } from "./weathersource";
import Description from "./components/Decription";




function App() {
  // this function is used to capitalize weather description
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
  }
  const [bg, setBg] = useState(IMAGES.sunny)
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [location, setLocation] = useState("");


  // useEffect(() => {
  //   // Get current location
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     const { latitude, longitude } = position.coords;

  //     // Call reverse geocoding API to get location name
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     // Extract the location name from the API response
  //     const { results } = data;
  //     if (results.length > 0) {
  //       const { formatted_address } = results[0];
  //       setLocation(formatted_address);
  //       setLocation(JSON.stringify(formatted_address));
  //     }
  //   });
  // }, []);
  const [city, setCity] = useState("Lagos");
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      const threashold = units === "metric"? 27 : 60;

      if(data.temp <= threashold) setBg(IMAGES.haze)

      else setBg(IMAGES.sunny)
      



    };
    fetchWeatherData();
  }, [units, city]);

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur()
    }
  }

  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";

    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  return (
    <div className="App bg-blue-200 min-h-screen w-screen flex flex-col  text-white  font-sans text-center bg-cover bg-center lg:justify-center lg:items-center"
     style={{ backgroundImage: `url(${bg})` }}
    >
      {/* input section */}
      <div className="m-5 lg:w-3/4">
        <div className="flex  bg-darkblue bg-opacity-60 p-5 rounded-xl justify-between ">
          <input
            onKeyDown={enterKeyPressed}
            type="text"
            placeholder="Enter your city..."
            className="border rounded-md p-1 bg-transparent focus:bg-slate-600 focus:bg-opacity-25 "
          />
          <button
            onClick={(e) => handleUnitClick(e)}
            className="bg-white text-black py-1 px-2 rounded-md"
          >
            °F
          </button>
        </div>

      

        {weather && (
          <>
            <div className="p-5 bg-darkblue bg-opacity-60 flex justify-between rounded-xl my-20">
              <div className="flex flex-col space-y-1 text-white">
                <div className="font-bold">
                  {weather.name}, {weather.country}.
                </div>
                <div className="">
                  <img src={weather.iconURL} alt="weaher" className="h-24" />
                </div>
                <p> {capitalizeWords(weather.description)} </p>
              </div>
              <div className="flex text-6xl items-center">
                <p>
                  {`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}
                </p>
              </div>
            </div>
            <div className="flex flex-col  justify-center items-center">
              <Description weather={weather} units={units} />
            </div>
            <div>{location}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
