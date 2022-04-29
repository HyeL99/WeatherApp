import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, selectedCity }) => {
  return (
    <div className="button-box mt-5">
      <Button
        variant={`${selectedCity == "current" ? "outline-primary" : "primary"}`}
        onClick={() => setCity("current")} className="ms-1 me-1 mt-2 me-2"
      >
        <b>Current Location</b>
      </Button>
      {cities.map((city, index) => (
        <Button
          variant={`${selectedCity == city ? "outline-primary" : "primary"}`}
          key={index}
          onClick={() => setCity(city)}
          className="ms-1 me-1 mt-2 me-2"
        >
          <b>{city}</b>
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
