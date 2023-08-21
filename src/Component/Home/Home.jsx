import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeImg from '../../imgs/3e84fe46-07ee-48b5-8e31-4adc09d4ae28.jpg';
import { Helmet, HelmetProvider } from 'react-helmet-async';
export default function Home() {

  return (

    <>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 ">
            <div className="d-flex home lg:p-16 max-sm:p-0 max-sm:text-center max-sm:my-3  max-sm:justify-self-center align-middle h-full max-sm:w-100 ">
              <h2 className='lg:text-7xl max-md:text-6xl  max-sm:text-3xl	' >Readers are Leaders</h2>
              <p className='my-3' >
                we pride ourselves as one of the top best rated online library platform with over 50,000 collections of books and research documentary, from world best Authors.
              </p>
              <div className="d-flex justify-center">
              <Link to="books" className="btn btn-start mt-2 ">
                Get Started
              </Link>
              </div>
            </div>
         
          <div className="p-28 box-content  md:block max-sm:hidden  ">
            <img className="rounded-4 " src={homeImg} alt="Home Image" />
          </div>
        </div>

    </>
  );
}
