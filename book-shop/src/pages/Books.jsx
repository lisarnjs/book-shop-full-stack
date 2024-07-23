import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const res = await axios.delete(`http://localhost:8800/books/` + bookId);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Lisa Book Shop</h1>
      <div className="booksContainer">
        {books.map((book) => (
          <div className="book" key={`book-${book.id}`}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>{book.price}원</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={"/add"}>Add new book</Link>
      </button>
    </div>
  );
};
export default Books;
