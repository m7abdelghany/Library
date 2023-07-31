import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {Helmet} from 'react-helmet'
export default function Authors() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useFetch("https://localhost:7241/api/Home/AllAuthors","" );
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
<>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        <Helmet>
        <title>All Authors</title>
              </Helmet>
        <div className="container py-5">
          <div className="row ">
            <div className="p-3">
            <input type="text" name="search" className=" px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter the book name" onChange={handleSearchInputChange} />

            </div>
            {data.filter((aut) =>
              aut.authorName.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((aut) => (
              <div className="col-4 mb-4 position-relative" key={aut.authorName}>

                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 m-3 rounded-full shadow-lg" src={aut.authorIMG} alt={aut.authorName}/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{aut.authorName}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400"></span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <Link to={`/authors/${aut.authorName}`} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Books</Link>
        </div>
    </div>
</div>

              </div>
            ))}
          </div>
        </div>
        </>

      )}
    </>
  );
}