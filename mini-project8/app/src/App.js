import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
