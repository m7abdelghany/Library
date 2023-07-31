import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import BookList from '../BooksList/BookList';
import {Helmet} from 'react-helmet'
export default function FavouriteBooks() {
  let {cateName} = useParams();
  const { data, isLoading, error } = useFetch("https://localhost:7241/api/Home/Cataegory?cataegoryName=",cateName );
  console.log(data)

  return (
    <>

    {isLoading ? (<>
      <div>Loading...</div>
      </>
    ) : (<>
      <Helmet>
<title>your books</title>
      </Helmet>
      <BookList books={data}  />
 </>   )}
  </>
  );
}