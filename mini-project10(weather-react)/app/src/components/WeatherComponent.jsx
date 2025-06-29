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
    <Col xs={6} md={3} className="text-center mb-3">
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={WeatherInfoIcons[name]}
          className="w-16 h-16 mx-auto mt-3"
        />
        <Card.Body>
          <Card.Title>{value}</Card.Title>
          <Card.Text className="capitalize">{name}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

function WeatherComponent(props) {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    return `${date.getHours().toString().padStart(2, "0")} : ${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container className="text-center">
      <Card className="p-4 shadow-lg rounded-xl mb-4">
        <Row className="justify-content-md-center align-items-center mb-4">
          <Col md="auto" className="text-center">
            <h2 className="display-4 font-weight-bold">
              {`${Math.floor(weather?.main?.temp - 273.15)}°C | ${
                weather?.weather[0].description
              }`}
            </h2>
            <h3 className="h4 text-muted">
              {`${weather?.name}, ${weather?.sys?.country}`}
            </h3>
          </Col>
          <Col md="auto">
            <img
              src={WeatherIcons[weather?.weather[0].icon]}
              alt="weather-icon"
              style={{ width: "120px", height: "120px" }}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Card>

      <Card className="p-4 shadow-lg rounded-xl">
        <h4 className="mb-4 text-start">Weather Info</h4>
        <Row className="justify-content-md-center">
          <WeatherInfoComponent
            name={isDay ? "sunset" : "sunrise"}
            value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
          />
          <WeatherInfoComponent
            name="humidity"
            value={`${weather?.main?.humidity}%`}
          />
          <WeatherInfoComponent
            name="wind"
            value={`${Math.floor(weather?.wind?.speed)}m/s`}
          />
          <WeatherInfoComponent
            name="pressure"
            value={`${weather?.main?.pressure}hPa`}
          />
        </Row>
      </Card>
    </Container>
  );
}

export default WeatherComponent;
