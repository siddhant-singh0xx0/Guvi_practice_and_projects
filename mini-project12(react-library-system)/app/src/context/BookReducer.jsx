import { ADD_BOOK, EDIT_BOOK, REMOVE_BOOK } from "./BookAction";

export const bookReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    default:
      return state;
  }
};
