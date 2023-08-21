// BookList.js
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFav } from '../../Redux/FavouriteSlice';
import { disLike } from '../../Redux/DislikeSlice';
import { isLike } from '../../Redux/LikeSlice';
export default function BookList({ books }) {
  let dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [Liked, setLiked] = useState([]);
  const navigate = useNavigate();
  let { dataUser } = useSelector((state) => state.dataUser);
  let { dataUserfav } = useSelector((state) => state.dataUserfav);
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value); }
useEffect(() => {
  dispatch(getFav());
}, [dispatch]); 
useEffect(() => {
  if(dataUserfav){
  const newArray = dataUserfav.map((item) => item.bookName);
  setLiked(newArray);
}
}, [dataUserfav]);
let handleLike = (bookName) => {
  if(dataUser){
  dispatch(isLike({ bookName }));
  setLiked(newArray);
}
  else{
    navigate('/login');
  }
};


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
            <div className="col-2 hoverheart mb-5 position-relative" key={book.bookName}>
              {Liked?.includes(book.bookName) ? (
                         <div className=" position-absolute liked" onClick={() => dispatch(disLike(book.bookName))} >
                  <i className="fa-solid fa-heart "></i>
                  </div>
                ) : (
                  <div className=" position-absolute like" onClick={() => handleLike(book.bookName)}   >

                  <i className="fa-solid fa-heart fa-beat "></i>
                  </div>
                )}          
                
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
