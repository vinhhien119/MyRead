import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

const SearchPage = () => {
  const [books, setBooks] = useState([])

  const [query, setQuery] = useState("")

  const checkBook = (res,addedBooks) => {
    addedBooks.forEach(b => {
      res.forEach (r => {
        if (b.id === r.id) {
          r["shelf"] = b.shelf;
        }
      })
    });
  }

  const updateQuery = async (query) => {
    console.log(query);
    setQuery(query);
    if (query !== "") {
      try {
        const res = await BooksAPI.search(query, 10);
        const addedBooks = await BooksAPI.getAll();
        checkBook(res,addedBooks);
        console.log(res)
        setBooks(res || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setBooks([]);
    }
  }

  const clearQuery = () => {
    updateQuery("")
  }

  const changeCategory = (e, b) => {
    var v = e.target.value;
    console.log(v)
    BooksAPI.update(b, v);
    b.shelf = v

  };

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to={'/'}
            onClick={clearQuery}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input 
            type="text" 
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => updateQuery(event.target.value)} />
          </div>
        </div>
      </div>
      <div className="search-books-results">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              (books.length >=1) && (query !== "") && (
                <BookShelf categoriedBoook = {books} onChangeCategory={changeCategory}/>
              )
            }
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
