import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ViewBook from "./pages/ViewBook";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BookProvider>
      <Router>
        <NavigationBar />
        <div className="container mt-4">
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/add" element={<AddBook />} exact />
              <Route path="/edit/:id" element={<EditBook />} exact />
              <Route path="/view/:id" element={<ViewBook />} exact />
            </Routes>
          </Container>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;
