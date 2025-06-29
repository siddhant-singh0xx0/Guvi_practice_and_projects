import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
  Modal,
  Navbar, // Import Navbar for placing the switch
  Nav, // Import Nav for Navbar items
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import your custom CSS file

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for theme

  const apiKey = "10b07713";

  // useEffect to apply/remove dark-mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setError(null);
      } else {
        setMovies([]);
        setError(response.data.Error || "No movies found.");
        setShowModal(true);
      }
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
      setShowModal(true);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      );
      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setSelectedMovie(null);
        setError(response.data.Error || "Failed to fetch movie details.");
        setShowModal(true);
      }
    } catch (error) {
      setError("Failed to fetch movie details. Please try again later.");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setError(null);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      {apiKey === "" && (
        <Container>
          <h1 className="my-4">
            Please visit this website and create your API key and paste in this
            app.js file:{" "}
            <a
              href="https://www.omdbapi.com/apikey.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </h1>
        </Container>
      )}
      {apiKey !== "" && (
        <Container>
          <Navbar
            bg={isDarkMode ? "dark" : "light"}
            variant={isDarkMode ? "dark" : "light"}
            expand="lg"
            className="mb-4"
          >
            <Container>
              <Navbar.Brand
                href="#home"
                className={isDarkMode ? "text-light" : "text-dark"}
              >
                Webflix
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {" "}
                  {/* Use ms-auto to push items to the right */}
                  <Button
                    variant={isDarkMode ? "outline-light" : "outline-dark"}
                    onClick={toggleDarkMode}
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Moved the Webflix title inside Navbar.Brand for better integration, 
              but keeping it here as per your original structure if you prefer.
              If you want it only in Navbar, remove the h1 below. */}
          {/* <h1 className="my-4 text-center">Webflix</h1> */}

          <Form className="mb-4">
            <Row className="align-items-center">
              <Col xs={12} md={9} lg={10} className="mb-3 mb-md-0">
                <FormControl
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for movies"
                />
              </Col>
              <Col xs={12} md={3} lg={2}>
                <Button
                  variant="primary"
                  onClick={searchMovies}
                  className="w-100"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          <hr />
          {selectedMovie && (
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>
                <Card className="mt-4">
                  <Card.Img
                    variant="top"
                    style={{
                      maxHeight: "400px",
                      objectFit: "contain",
                      margin: "auto",
                      display: "block",
                    }}
                    src={
                      selectedMovie.Poster !== "N/A"
                        ? selectedMovie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{selectedMovie.Title}</Card.Title>
                    <Card.Text>
                      <strong>Year:</strong> {selectedMovie.Year}
                    </Card.Text>
                    <Card.Text>
                      <strong>Plot:</strong> {selectedMovie.Plot}
                    </Card.Text>
                    <Card.Text>
                      <strong>Director:</strong> {selectedMovie.Director}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cast:</strong> {selectedMovie.Actors}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <hr />
          <Row>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Col
                  key={movie.imdbID}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card
                    onClick={() => getMovieDetails(movie.imdbID)}
                    style={{ cursor: "pointer", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        width: "auto",
                        height: "250px",
                        objectFit: "contain",
                        margin: "auto",
                        display: "block",
                      }}
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/200x300?text=No+Poster"
                      }
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                      <Card.Text>{movie.imdbID}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No movies found. Start searching!</p>
              </Col>
            )}
          </Row>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
}

export default App;
