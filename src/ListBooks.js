import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from "../src/BooksAPI";
import BookShelf from "./BookShelf";

const ListBook = () => {
  useEffect ( ()  => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      console.log(res);
      getBooksByCate(res);
    }
    
    getBooks();
  }, [])

  const [currentlyReadingBook, setCurrentlyReadingBook] = useState([]); 
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);



  const getBooksByCate = (books) => {
    setCurrentlyReadingBook(books.filter((b) => b.shelf === "currentlyReading"))
    setWantToRead(books.filter((b) => b.shelf === "wantToRead"))
    setRead(books.filter((b) => b.shelf === "read"))
  }



  const changeCategory = (e, b) => {
    var v = e.target.value;
    BookAPI.update(b, v);
    b.shelf === "currentlyReading" &&
      setCurrentlyReadingBook(
        currentlyReadingBook.filter((book) => book.id !== b.id)
      );
    b.shelf === "wantToRead" &&
      setWantToRead(wantToRead.filter((book) => book.id !== b.id));
    b.shelf === "read" && setRead(read.filter((book) => book.id !== b.id));

    b.shelf = v

    v === "currentlyReading" &&
      setCurrentlyReadingBook(currentlyReadingBook.concat(b));
    v === "wantToRead" && setWantToRead(wantToRead.concat(b));
    v === "read" && setRead(read.concat(b));
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookShelf
              categoriedBoook={currentlyReadingBook}
              onChangeCategory={changeCategory}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf categoriedBoook={wantToRead} onChangeCategory={changeCategory} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf categoriedBoook={read} onChangeCategory={changeCategory} />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default ListBook;
