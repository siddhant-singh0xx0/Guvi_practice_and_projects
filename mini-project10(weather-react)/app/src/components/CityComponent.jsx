import React from "react";
import {
  Form,
  Button,
  Image,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";

function CityComponent(props) {
  const { updateCity, fetchWeather } = props;

  return (
    <Row className="justify-content-md-center">
      <Col md={4}></Col>
      <Col md={4}>
        <Card className="shadow-lg rounded-xl">
          <Container style={{ padding: "25px" }}>
            <Row className="justify-content-md-center mb-4">
              <Col md="auto">
                <Image
                  src="/icons/storm.svg"
                  roundedCircle
                  className="w-24 h-24"
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center mb-4">
              <Col md="auto" className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Find the weather of your city
                </h2>
              </Col>
            </Row>
            <Form onSubmit={fetchWeather}>
              <Form.Group controlId="cityInput" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="enter your city name"
                  onChange={(e) => updateCity(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-2 mb-2"
              >
                Search
              </Button>
            </Form>
          </Container>
        </Card>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}

export default CityComponent;
