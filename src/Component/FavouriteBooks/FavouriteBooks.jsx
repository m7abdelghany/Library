import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import BookList from '../BooksList/BookList';
import { useDispatch, useSelector } from 'react-redux';
import { getFav } from '../../Redux/FavouriteSlice';
export default function FavouriteBooks() {
  let dispatch = useDispatch();
  let { dataUserfav } = useSelector((state) => state.dataUserfav);
console.log(dataUserfav);
  useEffect(() => {
    dispatch(getFav());
  }, []);
  return (

    
<>
<div className="container py-3 bg-slate-500">
<div className="row ">
{dataUserfav.map((book) => (
<div className="col-5 m-auto card ">
  <div className="row  py-3">
  
    <div className="col-md-4 ">
    <img className="w-100 h-100 rounded-1"
                src={`${book?.img}`}
                alt=""
              />
    </div>
    <div className="col-md-8">
<div className="">
 <h3 className='' >{book?.bookName}</h3>
 <div className='buttons'>
  <div className="flex mt-4 space-x-3 md:mt-6">
  <Link to={`/book/${book.bookName}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Read Now</Link>
<div  className=" inline-flex items-center px-4 py-2 text-xl cursor-pointer font-medium text-center text-red-400 rounded-lg hover:text-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 "><i className="fa-solid fa-heart"></i></div>
        </div>

</div>
 <div>
 </div>


</div>
    </div>
  </div>
  </div>
   ))} 
   </div>
   </div>
 </>   

  );
}