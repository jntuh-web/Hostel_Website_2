import React from 'react'
import logo from "../../images/logo.jpg";
import "./LoginStudents.css";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
function LoginStudents() {
  
 
  let navigate=useNavigate();
  let {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm();
  console.log(errors)
  let submitForm=(data)=>{
    console.log(data);
    navigate(`/student/${data.username}`)
  }
  return (
    <div className="mt-5 login-form-container">
      <form className="form-container" onSubmit={handleSubmit(submitForm)}>
        <div className=" heading m-auto">
          <img src={logo} width="50px" alt="" className='rounded-circle'/>
          <h3 className="text-center">SignIn/Login</h3>
        </div>
        <div className="input-container">
          <div>
            <label className="input-label form-label" htmlFor="username">
              USERNAME :
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username", {
                required: "username is required",
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.username?.type === "required" && (
              <p className="text-danger">*{errors.username.message}</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-danger">*Min length is 1</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="text-danger">*Max length is 10</p>
            )}
          </div>
        </div>
        <div className="input-container">
          <div>
            <label className="input-label form-label" htmlFor="password">
              PASSWORD :
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", {
                required: "password required",
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">*{errors.password.message}</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">*Min length is 2</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-danger">*Max length is 50</p>
            )}
          </div>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      
    </div>
  );
}

export default LoginStudents



