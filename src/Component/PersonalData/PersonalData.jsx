import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/CounterSlice';
import axios from 'axios';

export default function PersonalData() {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.dataUser);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  useMemo(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  async function handleUpload() {
    try {
      const formData = new FormData();
      formData.append('IMG', selectedFile);
      await axios.post(
        'https://localhost:7241/api/Account/UserImgUpload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Upload successful');
      location.reload();

    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log(selectedFile);

  return (
    <section className="pt-16 bg-blueGray-50 sm:overflow-y-scroll lg:overflow-hidden">
      <div className="w-full lg:w-4/8 px-4 mx-auto">

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">

              <div className="w-full relative flex justify-center ">
                
                  <div className="  align-middle border-none absolute -my-16 layerimg text-center">

 <img
  alt="Profile"
  src={dataUser?.img}
  className=" rounded-full imguser shadow-xl"
/>
<label htmlFor="fileInput">

<div  className=" layerimg group hover:bg-gray-200 top-0 left-0 right-0 bottom-0 opacity-60 rounded-full  absolute flex justify-center items-center cursor-pointer transition duration-500 layerimg">
    <img className="hidden group-hover:block w-12 " src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
  </div>
  </label>
  <input type="file" onChange={handleFileChange}  id="fileInput" className='hidden' accept='image/*' />
  
                  </div>

              </div>


              <div className="w-full  text-center mt-20">
              <div className="text-center ">
              <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-4 mt-4">
              <i className="fas fa-user mr-2 text-lg text-blue-800 text-blueGray-400"></i>
              {dataUser?.username}  
                          </h3>
                          </div>

                <div className="flex justify-center py-2 lg:pt-4 pt-8">


                  {/* <div className=" p-3 text-center">
                    
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Books</span>
                  </div> */}
                  {/* <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Books</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="text-center ">
              <div className=" text-blueGray-600 ">
                <i className="fas fa-phone mr-2 text-lg text-blue-800 text-blueGray-400"></i>
                {dataUser?.phoneNumber}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-message mr-2 text-lg text-blue-800 text-blueGray-400"></i>
                {dataUser?.email}               </div>
            </div>
            <div className="mt-10 py-3 border-t border-blueGray-200 text-center">
              {/* <div className="flex flex-wrap justify-center">
                 <div className="w-full lg:w-9/12 px-4">
                 <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    An artist of considerable range, Jenna the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                    performs and records all of his own music, giving it a
                    warm, intimate feel with a solid groove structure. An
                    artist of considerable range.
                  </p> 
                </div>
              </div> */}
            </div>
          </div>
        </div>

      </div>

      <footer className="relative pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                {/* Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>. */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}