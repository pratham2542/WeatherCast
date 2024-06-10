import "./App.css";
import WeatherApp from "./Components/WeatherApp/WeatherApp";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="main"></div>
      <div
        className="card"
        style={{ zIndex: 2, width: "25%", minWidth: "450px" }}
      >
        <WeatherApp />
      </div>
    </div>
  );
}

export default App;
