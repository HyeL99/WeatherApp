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
      //console.log("현재위치", lat, lon)
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

//앱이 실행되자마자 현재위치기반의 날씨 정보가 보임
//    표시되는 정보: 현재도시, 섭씨, 화씨, 현재 날씨상태
//5개의 버튼 (현재 위치와 4개의 다른도시) - 선택시 버튼 색깔 바뀜
//    도시 버튼을 클릭할 때 마다 도시별 날씨가 나온다
//현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
//데이터를 들고 오는 동안 로딩 스피너가 돈다.
