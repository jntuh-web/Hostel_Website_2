import React from 'react'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import './Bonafides.css'
function Bonafides() {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    purpose: "",
  });
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submitForm=(e)=>{
    // e.preventDefault();
    
    console.log(e);
    let temp={
      username:"",
      rollno:"",
      course:"",
      purpose:""
    }
    reset(temp);
  }  
  return (
    <div className='m-auto'>
    <div className='w-75 m-auto'>
      <h2 className='text-center'>Bonafide Certificate Application</h2>
      <form width="100" onSubmit={handleSubmit(submitForm)}>
        <div className="input-container">
          <div>
            <label htmlFor="username" className="form-change">
              Name:
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
            <label className="form-change" htmlFor="rollno">
              Roll No :
            </label>
            <input
              type="text"
              id="rollno"
              className="form-control"
              {...register("rollno", {
                required: "password required",
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.rollno?.type === "required" && (
              <p className="text-danger">*{errors.rollno.message}</p>
            )}
            {errors.rollno?.type === "minLength" && (
              <p className="text-danger">*Min length is 2</p>
            )}
            {errors.rollno?.type === "maxLength" && (
              <p className="text-danger">*Max length is 50</p>
            )}
          </div>
        </div>
        <div className="input-container">
          <label className="form-change" htmlFor="course">
            course :
          </label>
          <input
            id="course"
            placeholder="ex: III B.tech (Regular)"
            className="form-control"
            {...register("course", {
              required: "description required",
              minLength: 2,
              maxLength: 500,
            })}
          />
        </div>
        <div className="input-container">
          <label className="form-change" htmlFor="purpose">
            Purpose :
          </label>
          <input
            id="purpose"
            placeholder="For scholarship"
            className="form-control"
            {...register("purpose", {
              required: "description required",
              minLength: 2,
              maxLength: 500,
            })}
          />
        </div>
        <button type="submit" className="login-button">
          Apply For Bonafide
        </button>
      </form>
      </div>
    </div>
  );
}





export default Bonafides;