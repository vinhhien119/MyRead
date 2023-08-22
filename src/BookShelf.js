const BookShelf = ({categoriedBoook, onChangeCategory}) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {categoriedBoook.map((b) => {
          return (
            <li key={b.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${
                        b.imageLinks !== undefined
                          ? b.imageLinks.thumbnail
                          : ""
                      }")`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={
                        b.shelf !== undefined
                          ? b.shelf
                          : "none"
                      }
                      onChange={(e) => onChangeCategory(e, b)}
                    >
                      <option value="nne" disabled>
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
                <div className="book-authors">
                {(b.authors && b.authors.join(", ")) || (b.authors !== undefined || null || NaN || "" ? b.authors : "Unknown author")}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BookShelf;
