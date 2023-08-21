const BookShelf = ({books, onChangeCategory}) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((b) => {
          return (
            <li>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${b.imageLinks.thumbnail})`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={b.shelf}
                      onChange={(e) => onChangeCategory(e, b)}
                    >
                      {/* {console.log(b.shelf)} */}
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{b.title}</div>
                <div className="book-authors">{b.authors}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BookShelf;
