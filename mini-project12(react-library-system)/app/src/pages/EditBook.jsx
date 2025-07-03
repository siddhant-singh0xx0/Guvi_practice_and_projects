import React from "react";
import BookForm from "../components/BookForm";

function EditBook() {
  return (
    <div>
      <h2>Edit Books</h2>
      <BookForm isEdit={true} />
    </div>
  );
}

export default EditBook;
