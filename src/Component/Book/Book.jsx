import axios from 'axios'
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';
import React, { useMemo,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet'
import './book.css'
export default function Book() {
  let [Details,setDetails]=useState(null)
  let [pdfs,setPdfs]=useState(null)
  let {bookName} = useParams();
  async function getBook() {
    try {
      const { data } = await axios.get(`https://localhost:7241/api/Home/book?BookName=${bookName}`);
      setDetails(data);
      setPdfs(data.pdf);
    } catch (err) {
      console.error(err);
    }
  }
  
  function getPdf() {
    try {
      const pdfBlob = new Blob([pdfs], { type: 'application/pdf' });
      saveAs(pdfBlob, `${pdfs}`);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=>{
    getBook()
  },[]
  )
  return (
    <>
          <Helmet>
<title>{bookName}</title>
      </Helmet>
<div className="container">
  <div className="row py-3 dir-rtl">
    <div className="col-md-4 ">
    <img className="w-100 h-100 rounded-1"
                src={`${Details?.image}`}
                alt=""
              />
    </div>
    <div className="col-md-8">
<div className="one-item p-5">
 <h3>{Details?.bookName}</h3>
 <div>
 <p className='mt-1'>{Details?.description}</p>
 </div>
 <table className=" table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <td > التقيم</td>
                      <td>{Details?.rating}z</td>
                    </tr>
                    <tr>
                      <td> نوع الملف</td>
                      <td>pdf</td>
                    </tr>

                  </tbody>
                </table>
<div className='w-100 d-flex justify-content-center'>
  <button className="pdf-btn" >
  <Link to={`${Details?.pdf}`}>
  قراءة
</Link>
  </button>
  <button className="pdf-btn" onClick={getPdf}>
تحميل
  </button>
</div>
</div>
    </div>
  </div>
</div> 
   </>
  )
}
