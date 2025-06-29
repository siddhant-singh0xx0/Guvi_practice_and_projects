import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { WeatherIcons } from "../WeatherIcons";

export const WeatherInfoIcons = {
  sunset: "/icons/temp.svg",
  sunrise: "/icons/temp.svg",
  humidity: "/icons/humidity.svg",
  wind: "/icons/wind.svg",
  pressure: "/icons/pressure.svg",
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <Col md="auto" className="text-center">
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={WeatherInfoIcons[name]}></Card.Img>
        <Card.Body>
          <Card.Title>{value}</Card.Title>
          <Card.Text>{name}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

function WeatherComponent(props) {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 100).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <Container className="text-center">
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <h2>{`${Math.floor(weather?.main?.temp / 10)}°C | ${
            weather?.weather[0].description
          }`}</h2>
        </Col>
        <Col md="auto">
          <img
            src={WeatherIcons[weather?.weather[0].icon]}
            alt="weather-icon"
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <h3>{`${weather?.name}, ${weather?.sys?.country}`}</h3>
        </Col>
      </Row>
      <h4>Weather Info</h4>
      <Row className="justify-content-md-center">
        <WeatherInfoComponent
          name={isDay ? "sunset" : "sunrise"}
          value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
        />
        <WeatherInfoComponent
          name="humidity"
          value={`${weather?.main?.humidity}%`}
        />
        <WeatherInfoComponent name="wind" value={`${weather?.main?.wind}m/s`} />
        <WeatherInfoComponent
          name="pressure"
          value={`${weather?.main?.pressure}hPa`}
        />
      </Row>
    </Container>
  );
}

export default WeatherComponent;
