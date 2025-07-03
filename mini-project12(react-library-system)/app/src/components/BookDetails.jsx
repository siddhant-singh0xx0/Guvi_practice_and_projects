import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { BookContext } from "../context/BookContext";

const BookDetails = () => {
  const { books } = useContext(BookContext);
  const { id } = useParams();
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.author}
        </Card.Text>
        <Button variant="primary" as={Link} to="/">
          Back to Home
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
