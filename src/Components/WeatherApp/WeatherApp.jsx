import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
// import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const WeatherApp = () => {
  let API_KEY = process.env.REACT_APP_API_KEY;
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);
  const [city, setCity] = useState(" - ");
  const [wicon, setWicon] = useState(cloud_icon);
  const [lat, setlat] = useState(0);
  const [lon, setlon] = useState(0);
  const [sea, setsea] = useState(0);
  const [grnd, setgrnd] = useState(0);
  const [windDir, setwindDir] = useState(0);
  const [vis, setvis] = useState(0);
  const [clouds, setclouds] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") return 0;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`;
    let responce = await fetch(URL);

    let data = await responce.json();

    if (data.cod === "404") {
      alert("City Not Found!!");
      return;
    }
    // console.log(data.main.grnd_level);

    setTemp(Math.floor(data.main.temp));
    setHumidity(data.main.humidity);
    setPressure(data.main.pressure);
    setWind(data.wind.speed);
    setCity(element[0].value);

    setlon(data.coord.lon);
    setlat(data.coord.lat);

    setgrnd(data.main.grnd_level);
    setsea(data.main.sea_level);

    setwindDir(data.wind.deg);
    setvis(data.visibility);
    setclouds(data.clouds.all);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
      setWicon(clear_icon);
    else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
      setWicon(cloud_icon);
    else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
      setWicon(drizzle_icon);
    else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
      setWicon(drizzle_icon);
    else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
      setWicon(rain_icon);
    else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
      setWicon(rain_icon);
    else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
      setWicon(snow_icon);
    else setWicon(clear_icon);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search Your Location "
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="$" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="icon" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>

      <div className="more">
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          onClick={handleOpen}
        >
          more
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ border: 0 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              maxWidth:"70%",
              maxHeight:"50%",
              bgcolor: "rgba(240,240,240)",
              borderRadius: "20px",
              boxShadow: 24,
              p: 4,
              overflow:"scroll"
            }}
          >
            <div className="weather-image1">
              <img src={wicon} alt="icon" />
            </div>
            <div className="weather-temp" style={{color:"black",fontSize:"55px"}}>{temp}°C</div>
            <div className="weather-location" style={{color:"black",marginBottom:"50px"}}>{city}</div>

            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
            <div className="data1">
              <div className="humidity-percent">{pressure} Pa</div>
              <div className="text1">pressure</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{lat}'</div>
              <div className="text1">latitude</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{lon}'</div>
              <div className="text1">Longitude</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text1">Humidity</div>
            </div>

            <div className="data1">
              <div className="humidity-percent">{wind} Km/h</div>
              <div className="text1">Wind Speed</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{sea} Hpa</div>
              <div className="text1">Sea level</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{grnd} Hpa</div>
              <div className="text1">Ground level</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{windDir}°</div>
              <div className="text1">Wind direction</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{vis / 1000} km</div>
              <div className="text1">Visibility</div>
            </div>
            <div className="data1">
              <div className="humidity-percent">{clouds} %</div>
              <div className="text1">Cloudiness</div>
            </div>
            </div>
            
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WeatherApp;
