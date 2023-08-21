import "./App.css";
import { useState, useEffect } from "react";
import * as BookAPI from "../src/BooksAPI";
import SearchPage from "./SearchPage";
import ListBook from "./ListBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(true);

  const [books, setBooks] = useState([])

  const updateApi = (books) =>{
    console.log("here")
    setBooks(books);
  }

  useEffect ( ()  => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      // console.log(res);
      setBooks(res);
    }
    
    getBooks();
  }, [])

  

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <SearchPage books = {books}/>
        </div>
      ) : (
      <ListBook books = {books} onUpdateAPI={updateApi} />    
      )}
    </div> 
  );
}

export default App;
