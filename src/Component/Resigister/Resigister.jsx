import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import libraryImg from '../../imgs/ranurte-a-CnhYgTenY-unsplash.jpg'
import {  Link } from 'react-router-dom'
export default function Resigister() {
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  let Navigate =useNavigate()
  let [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword:"",
    age: 0,
    gender:"",
    phone:"",
    email: ""
  })
  // function getDataUser(e) {
  //   if (e.target.name === "imgUrl") {
  //     const file = e.target.files[0];
  //     const extension = file.name.split(".").pop(); 
  //     // const imgUrl = URL.createObjectURL(file);
  //     setUser(prevState => ({ ...prevState, imgUrl: `${extension}` }));
  //   } else {
  //     setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  //   }
  // }
  function getDataUser(e) {
    console.log(e.target.name);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }
  async function register(e) {
    e.preventDefault();
    if (vaildation()) {
      setisLoading(true)
      let { data } = await axios.post(`https://localhost:7241/api/Account/register`, user);
      console.log(data);  
if(data == "account created"){
  setisLoading(false);
setapiError(null);
Navigate("/");
}else{
  setapiError(data.response.data.description)
  setisLoading(false)
}}}
  function vaildation() {
    let schema = Joi.object({
      userName: Joi.string().required().min(2).max(10),
      password: Joi.string().required().min(2),
      confirmPassword: Joi.string().required().equal(Joi.ref('password')),
      age: Joi.number().required().min(18).max(80),
      email: Joi .string() .email({ minDomainSegments:2, tlds:{ allow: false } }),
      phone: Joi .string() .required(),
      gender: Joi .string() .required(),
    });
    let res = schema.validate(user, { abortEarly: false });
    console.log(res);
    if(res.error){
      setvalidationError(res.error.details)
      return false
    }else{
      return true
    } 
  };
  
  return (
    <>
      <div className="container-fluid ">
        <div className="row div-content">
          <div className="col-6 libraryImg-register">
          </div>
          <div className="col-6 bg-color">

            <div className="form-content ">
            <h2 className='text-left'>
                Sign <span className='up'>Up</span>
              </h2>
              {apiError && <div className='alert alert-danger'>{apiError}</div>}
              <form className=' mt-4' onSubmit={register}> 
  <div className="form-group mb-1">
    <label htmlFor="exampleInputEmail1">UserName</label>
    <input type="text" className="form-control" 
    onChange={(e) => getDataUser(e)}
    name='userName'
    id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="userName")[0]?"alert alert-danger" :""}>
  {validationError.filter(ele =>ele.context.label=="userName")[0]?.message}
   </div>
  <div className="form-group mb-1">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" 
     onChange={(e) => getDataUser(e)}
     name='password' />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="password")[0]?"alert alert-danger" :""}>
  {validationError.filter(ele =>ele.context.label=="password")[0]?.message}
   </div>
  <div className="form-group mb-1">
    <label htmlFor="exampleInputPassword1">confirm Password</label>
    <input type="password" className="form-control" 
    onChange={(e) => getDataUser(e)}
    name='confirmPassword'/>
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="confirmPassword")[0]?"alert alert-danger" :""}>
   {validationError.filter(ele =>ele.context.label=="confirmPassword")[0]?.message}
  </div>
  <div className="form-group mb-1">
    <label htmlFor="age">Age</label>
    <input type="number" className="form-control"   
    name='age'
    onChange={(e) => getDataUser(e)} 
    />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="age")[0]?"alert alert-danger" :""}>
   {validationError.filter(ele =>ele.context.label=="age")[0]?.message}
  </div>
  <div className="form-group mb-1">
    <label htmlFor="exampleInputEmail1">Gender</label>
    <input type="text" className="form-control"
    onChange={(e) => getDataUser(e)}
    name='gender' />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="gender")[0]?"alert alert-danger" :""}>
   {validationError.filter(ele =>ele.context.label=="gender")[0]?.message}
  </div>
  <div className="form-group mb-1">
    <label htmlFor="exampleInputEmail1">Email</label>
    <input type="email" className="form-control"
    name='email'
    onChange={(e) => getDataUser(e)}
    id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="email")[0]?"alert alert-danger" :""}>
   {validationError.filter(ele =>ele.context.label=="email")[0]?.message}
  </div> 
  <div className="form-group mb-1">
    <label htmlFor="exampleInputEmail1">PhoneNumber</label>
    <input type="text" className="form-control"
    name='phone'
    onChange={(e) => getDataUser(e)} />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="phone")[0]?"alert alert-danger" :""}>
   {validationError.filter(ele =>ele.context.label=="phone")[0]?.message}
  </div> 

  <div className='w-100 d-flex justify-content-center'>
  <button type="submit" className="btn w-50 p-2 m-auto mt-3 bg-blue-300 hover:bg-blue-400">     
   {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Create account"}
</button>
<p>
              <Link to="../login">

     </Link>

              </p>
</div>
</form>
</div>
    </div>
    </div>
    </div>

    </>
  )
}
