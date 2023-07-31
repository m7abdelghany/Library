// BookList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function BookList({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    function handleSearchInputChange(e) {
        setSearchTerm(e.target.value);
      }
  return (
    <div className="container py-5">
      <div className="row ">
        <div className="p-3">
          <input
            type="text"
            name="search"
            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter the book name"
            onChange={handleSearchInputChange}
          />
        </div>
        {books
          .filter((book) =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => (
            <div className="col-2 mb-4 position-relative" key={book.bookName}>
              <Link to={`/book/${book.bookName}`}>
                <div className="vote p-2 position-absolute">{book.rating}</div>
                <div className="item overflow-hidden">
                  <img className="w-100 h-100" src={book.image} alt={book.bookName} />
                  <div className="overlay p-2">
                    <p>{book.description.split(' ').splice(0, 20).join(' ')}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
