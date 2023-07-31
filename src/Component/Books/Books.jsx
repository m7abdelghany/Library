import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import BookList from '../BooksList/BookList';
import {Helmet} from 'react-helmet'
export default function Books() {
  const { data, isLoading, error } = useFetch("https://localhost:7241/api/Home", "");
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
      <Helmet>
<title>All Books</title>
      </Helmet>
        <BookList books={data}  />
        </>
      )}
    </>
  );
}
