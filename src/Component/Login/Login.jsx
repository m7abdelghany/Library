import React from 'react'
import {  Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  let [user, setUser] = useState({
    userName: "",
    password: ""
  })
  function getDataUser(e) {
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }
  async function Login(e) {
    e.preventDefault();
    if (vaildation()) {
      setisLoading(true)
      let { data } = await axios.post(`https://localhost:7241/api/Account/login`, user);
      console.log(data)
if(data.token){
  setisLoading(false);
setapiError(null);
localStorage.setItem("token", data.token);
navigate("../profile");
}else{
  setapiError(data.message)
  setisLoading(false)
}}}
function vaildation() {
    let schema = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
     
    });
    let res = schema.validate(user, { abortEarly: false });

    if(res.error){
      setvalidationError(res.error.details)
      return false
    }else{
      return true
    } 
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row div-content">
          <div className="col-6 libraryImg-login">
          </div>
          <div className="col-6 bg-color ">
            <div className="form-content ">
              <h2 className='text-center mt-5 text-2xl text-blue-900  font-bold'>
                Welcome Back
              </h2>
              {apiError && <div className='alert alert-danger'>{apiError}</div>}
              <form className=' mt-5' onSubmit={Login}> 
  <div className="form-group mb-4">
    <label htmlFor="exampleInputEmail1">Username</label>
    <input type="text" className="form-control" 
    name='userName'
      onChange={(e) => getDataUser(e)}
    />
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="userName")[0]?"alert alert-danger" :""}>
  {validationError.filter(ele =>ele.context.label=="userName")[0]?.message}
   </div>
  <div className="form-group mb-4">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control"
    name='password'
      onChange={(e) => getDataUser(e)}/>
  </div>
  <div className={validationError.filter(ele =>ele.context.label=="password")[0]?"alert alert-danger" :""}>
  {validationError.filter(ele =>ele.context.label=="password")[0]?.message}
   </div>
  <button type="submit" className="btn w-100 bg-blue-300 hover:bg-blue-400">Login</button>
</form>
            </div>
            <div className="text-center">
            <p className='mb-0'>don't have account yet?</p>

              <p>
              <Link to="../register">
     Crete an account
     </Link>

              </p>
            </div>

          </div>

        </div>
      </div>
   
    </>
  )
}
