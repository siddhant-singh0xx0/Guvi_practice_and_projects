import React from "react";
import BookForm from "../components/BookForm";

function AddBook() {
  return (
    <div>
      <h2>Add Books</h2>
      <BookForm isEdit={false} />
    </div>
  );
}

export default AddBook;
