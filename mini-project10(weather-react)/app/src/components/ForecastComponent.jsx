import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { WeatherIcons } from "../WeatherIcons";

function ForecastComponent(props) {
  const { forecast } = props;

  const dailyForecasts = {};
  forecast?.list?.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    if (!dailyForecasts[day]) {
      dailyForecasts[day] = [];
    }
    dailyForecasts[day].push(item);
  });

  return (
    <Container className="text-center mt-5">
      <Card className="p-4 shadow-lg rounded-xl">
        <h4 className="mb-4 text-start">5-Day Forecast</h4>
        <Row className="justify-content-md-center">
          {Object.entries(dailyForecasts).map(([day, dailyItems]) => {
            const middayItem =
              dailyItems.find(
                (item) =>
                  new Date(item.dt * 1000).getHours() >= 12 &&
                  new Date(item.dt * 1000).getHours() <= 15
              ) || dailyItems[0];
            const avgTemp =
              dailyItems.reduce((sum, item) => sum + item.main.temp, 0) /
              dailyItems.length;
            const weatherDescription =
              middayItem?.weather[0]?.description || "N/A";
            const weatherIcon =
              WeatherIcons[middayItem?.weather[0]?.icon] || WeatherIcons["01d"];

            return (
              <Col key={day} xs={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <Card.Title className="h5">{day}</Card.Title>
                    <Card.Img
                      variant="top"
                      src={weatherIcon}
                      className="w-16 h-16 mb-2"
                    />
                    <Card.Text className="lead font-weight-bold">{`${Math.floor(
                      avgTemp - 273.15
                    )}°C`}</Card.Text>
                    <Card.Text className="text-muted capitalize">
                      {weatherDescription}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </Container>
  );
}

export default ForecastComponent;
