import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../../imgs/3e84fe46-07ee-48b5-8e31-4adc09d4ae28.jpg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
export default function Home() {

  return (

    <>
      <Helmet>
        <title>Medo</title>
      </Helmet>

      <div className="container containerHome">
        <div className="row p-5">
          <div className="col-xl-6">
            <div className="d-flex home">
              <h2>Readers are Leaders</h2>
              <p>
                we pride ourselves as one of the top best rated online library platform with over 50,000 collections of books and research documentary, from world best Authors.
              </p>
              <Link to="books" className="btn btn-start mt-2">
                Get Started
              </Link>
            </div>
          </div>
          <div className="col-xl-6 ">
            <img className="rounded-4 height-img w-100" src={homeImg} alt="Home Image" />
          </div>
        </div>
      </div>

    </>
  );
}
