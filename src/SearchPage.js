import { Link } from "react-router-dom";

const SearchPage = ({ books }) => {
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to={'/'}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title, author, or ISBN" />
          </div>
        </div>
      </div>
      <div className="search-books-results">
        <div className="bookshelf-books">
          <ol className="books-grid">
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
