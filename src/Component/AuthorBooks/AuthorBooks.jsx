import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import BookList from '../BooksList/BookList';
import {Helmet} from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async';
export default function AuthorsBooks() {
  let {authorName} = useParams();
  const { data, isLoading, error } = useFetch("https://localhost:7241/api/Home/Author?authorName=",authorName );
  console.log(data)

  return (
    <>

    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <>

      <Helmet>
<title>{authorName}</title>
      </Helmet>
      <div className="container-fluid">
        <div className="row height-author ">

          <div className="col-lg-2 col-sm-4  mt-3">
            <div class="w-full h-full max-w-sm ">

<div class="flex flex-col items-center pb-10">
    <img class="w-24 h-24 m-3 rounded-full shadow-lg" />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{authorName}</h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">frontend Designer</span>

</div>
</div>
            </div>
            <div className="col-lg-10 col-sm-8 allAuthors">
            <BookList books={data} className="" />
            </div>


        </div>
        </div>      
      </>
    )}
  </>
  );
}