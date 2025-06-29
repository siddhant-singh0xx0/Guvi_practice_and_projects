import React, { useState } from "react";
import Axios from "axios";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";

import CityComponent from "./components/CityComponent.jsx";
import WeatherComponent from "./components/WeatherComponent.jsx";
import ForecastComponent from "./components/ForecastComponent.jsx";

function App() {
  const [city, updateCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    const APIKEY = "18871da74fed48a1df2605ec7c16956b";
    setLoading(true);
    setError("");
    setCurrentWeather(null);
    setForecastWeather(null);

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
        ),
        Axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`
        ),
      ]);
      setCurrentWeather(currentResponse.data);
      setForecastWeather(forecastResponse.data);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError("City not found or API limit reached. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-5">Weather Worldwide Web</h1>

      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-3 h5 text-muted">Loading weather data...</p>
        </div>
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

      {!loading && !currentWeather && !forecastWeather && (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}

      {!loading && currentWeather && forecastWeather && (
        <>
          <WeatherComponent weather={currentWeather} />
          <ForecastComponent forecast={forecastWeather} />
          <Row className="justify-content-md-center mt-4">
            <Col md="auto">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setCurrentWeather(null);
                  setForecastWeather(null);
                  updateCity("");
                  setError("");
                }}
              >
                Search Another City
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
