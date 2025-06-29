import React, { useState } from "react";
import Axios from "axios";
import { Container, Modal, Button } from "react-bootstrap";
import { WeatherIcons } from "./WeatherIcons"; // Assuming this is used elsewhere or will be
import WeatherComponent from "./components/WeatherComponent";
import CityComponent from "./components/CityComponent";

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [error, setError] = useState(""); // <--- Add this line for the error state

  const fetchWeather = async (e) => {
    e.preventDefault();
    const APIKEY = "18871da74fed48a1df2605ec7c16956b";

    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
      );
      updateWeather(response.data);
      setError(""); // Clear error on successful fetch
    } catch (err) {
      setError("Wrong city Name"); // Set error message
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Weather Worldwide Web</h1>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}

      {error && (
        <Modal show={true} onHide={() => setError("")}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setError("")}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default App;
