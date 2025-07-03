import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { BookContext } from "../context/BookContext";
import { REMOVE_BOOK } from "../context/BookAction";

const BookList = () => {
  const { books, dispatch } = useContext(BookContext);

  const handleDelete = (id) => {
    dispatch({ type: REMOVE_BOOK, payload: id });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>B no.</th>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <Button variant="info" as={Link} to={`/view/${book.id}`}>
                View
              </Button>{" "}
              <Button variant="warning" as={Link} to={`/edit/${book.id}`}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(book.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookList;
