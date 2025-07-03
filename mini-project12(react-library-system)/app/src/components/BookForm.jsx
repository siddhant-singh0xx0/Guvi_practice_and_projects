import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BookContext } from "../context/BookContext";
import { ADD_BOOK, EDIT_BOOK } from "../context/BookAction";
import { useNavigate } from "react-router-dom";

const BookForm = ({ isEdit }) => {
  const { books, dispatch } = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const bookToEdit = books.find((book) => book.id === parseInt(id));
      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
      }
    }
  }, [id, isEdit, books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch({
        type: EDIT_BOOK,
        payload: { id: parseInt(id), title, author },
      });
    } else {
      dispatch({
        type: ADD_BOOK,
        payload: { id: Date.now(), title, author },
      });
    }
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isEdit ? "Update Book" : "Add Book"}
      </Button>
    </Form>
  );
};

export default BookForm;
