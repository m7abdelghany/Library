import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Component/MainLayout/MainLayout";
import Login from "./Component/Login/Login";
import Books from "./Component/Books/Books"
import Home from './Component/Home/Home';
import Resigister from './Component/Resigister/Resigister';
import Book from './Component/Book/Book';
import Profile from './Component/Profile/Profile';
import Categories from './Component/Categories/Categories';
import Authors from './Component/Authors/Authors';
import AuthorsBooks from './Component/AuthorBooks/AuthorBooks';
import FavouriteBooks from './Component/FavouriteBooks/FavouriteBooks';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import PersonalData from './Component/PersonalData/PersonalData';
function App() {
    let routes = createBrowserRouter([
      {
        path: "/",
        element: <MainLayout/>,
        children: [
          { index: true  , element: <Home/> },
          {  path: "books" , element:<Books/> },
          { path: "login"  , element: <Login/> },
          { path: "register"  , element: <Resigister/> },
          { path: "book/:bookName"  , element: <Book/> },
          { path: "category/:cateName"  , element: <Categories/> },
          { path: "profile"  , element: <Profile/>, children:
          [{ index: true  , element: <PersonalData/> },
          { path: "favouriteBooks"  , element: <FavouriteBooks/> }] },
          { path: "authors"  , element: <Authors/> },
          { path: "authors/:authorName"  , element: <AuthorsBooks/> } 
        ],
      }
    ])
    return (
      <div>
        <HelmetProvider>

<Provider store={store}>

<RouterProvider router={routes} />

</Provider>
</HelmetProvider>
      </div>
    );
  }
  
  export default App;
  