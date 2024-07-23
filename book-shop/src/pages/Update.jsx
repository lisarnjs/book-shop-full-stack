import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });
  useEffect(() => {
    async function fetchBookId() {
      try {
        const initBookData = await axios.get(
          "http://localhost:8800/books/" + bookId
        );
        console.log(initBookData.data);
        setBook(initBookData.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBookId();
    console.log(bookId);
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Update Book</h1>
      <div>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder="desc"
          value={book.desc}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={book.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cover"
          placeholder="cover"
          value={book.cover}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};
export default Update;
