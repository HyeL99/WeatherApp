import React from "react";

const WeatherBox = ({weather}) => {
    const tempC = weather&&weather.main? weather.main.temp.toFixed(2):"";
    const tempF = tempC !== "" ? (tempC*1.8+32).toFixed(2):"";
    //log(weather?.main.temp)
    let weatherText = ""
    //weatherText = weather&&weather.weather[0]?weather.weather[0].description:"";
  return (
      <div className="weather-box">
        <h3 className="title"><b>{weather?.name}</b></h3>
        <h1 className="mt-3 mb-5 temp">{`${tempC}°C / ${tempF}°F`}</h1>
        <h3 className="description">{weather&&weather.weather[0]?.description}</h3>
      </div>
  );
};

export default WeatherBox;
