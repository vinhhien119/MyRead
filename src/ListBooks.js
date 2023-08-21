import { useState } from "react";
import * as BooksApi from "../src/BooksAPI";
import BookShelf from "./BookShelf";

const ListBook = ({ books, onUpdateAPI }) => {
  const [currentlyReadingBook, setCurrentlyReadingBook] = useState(
    books.filter((b) => b.shelf === "currentlyReading")
  );

  const [wantToRead, setWantToRead] = useState(
    books.filter((b) => b.shelf === "wantToRead")
  );

  const [read, setRead] = useState(books.filter((b) => b.shelf === "read"));

  const changeCategory = (e, b) => {
    var v = e.target.value;
    BooksApi.update(b, v);
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
    reRenderCategory();
  };

  const reRenderCategory = () => {
    onUpdateAPI(books);
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
              books={currentlyReadingBook}
              onChangeCategory={changeCategory}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf books={wantToRead} onChangeCategory={changeCategory} />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf books={read} onChangeCategory={changeCategory} />
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => {}}>Add a book</a>
      </div>
    </div>
  );
};

export default ListBook;
