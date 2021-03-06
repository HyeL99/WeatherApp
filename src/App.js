import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";

const cities = ["Paris", "Vienna", "New York", "Singapore", "Seoul"];

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("current");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log("νμ¬μμΉ", lat, lon)
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCity = async () => {
    try{
      console.log("weather?", weather);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b5797a94ba8a11d6528a37ddb247d39`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(error){
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3b5797a94ba8a11d6528a37ddb247d39`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    }catch(error){
      setAPIError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == "current") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : !apiError?(
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            selectedCity={city}
          />
        </div>
      ):apiError}
    </div>
  );
}

export default App;

//μ±μ΄ μ€νλμλ§μ νμ¬μμΉκΈ°λ°μ λ μ¨ μ λ³΄κ° λ³΄μ
//    νμλλ μ λ³΄: νμ¬λμ, μ­μ¨, νμ¨, νμ¬ λ μ¨μν
//5κ°μ λ²νΌ (νμ¬ μμΉμ 4κ°μ λ€λ₯Έλμ) - μ νμ λ²νΌ μκΉ λ°λ
//    λμ λ²νΌμ ν΄λ¦­ν  λ λ§λ€ λμλ³ λ μ¨κ° λμ¨λ€
//νμ¬ μμΉ λ²νΌμ λλ₯΄λ©΄ λ€μ νμ¬ μμΉ κΈ°λ°μ λ μ¨κ° λμ¨λ€
//λ°μ΄ν°λ₯Ό λ€κ³  μ€λ λμ λ‘λ© μ€νΌλκ° λλ€.
