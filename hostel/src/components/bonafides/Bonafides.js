import React from 'react'
import { useState,useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useLocation } from 'react-router-dom';
import './Bonafides.css'
import axios from 'axios';
function Bonafides() {
  const location=useLocation();
  const path=location.pathname.split('/')[2];
  const [bonofides, setBonofides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const onSubmit = async (data) => {
    setFormData(data)
    console.log(data)
    try {
      const response = await axios.post('http://localhost:5000/bonofides/applyBonofide', {
        "appliedStudentID":path,
        "reasonForBonofide":data.purpose

      });
      console.log("hi")
      if (response) {
        // Successful login logic (you can redirect or set user in context, etc.)
        console.log('Complained successfully');
        // Redirect to the home page after successful login
        window.location.replace(`/student/${path}/bonofide`);
      } else {
        console.error(response.data.message || 'Invalid ');
      }
    } catch (error) {
      console.error('Error during complain:', error);
    }
  };

  useEffect(() => {
    const fetchData=async()=>{
      
      try{
        const allBonofides=await axios.get(`http://localhost:5000/bonofides/${path}`)
        //setBonofides(allBonofides)
        const data=await allBonofides.data
        console.log(data)
        if (Array.isArray(data)) {
          setBonofides(data);
        } else {
          // If data is not an array, handle it as per your requirements
          console.log(typeof(allBonofides))
          setBonofides([]);
        }

        setLoading(false);
      }catch(e){
        setError(e);
      }
    }
    fetchData();
  }, []); 

  return (
    <div>
      {bonofides.length === 0 ? (
        <p>No bonofides found for this student.</p>
      ) : (
        <ul>
          {bonofides.map(bonofide => (
            <li key={bonofide._id}>
              Reason: {bonofide.reasonForBonofide}   Status: {bonofide.statusOfBonofide} 
            </li>
          ))}
        </ul>
      )}
    <div className='m-auto'>
    <div className='w-75 m-auto'>
      <h2 className='text-center'>Bonafide Certificate Application</h2>
      <form width="100" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
}





export default Bonafides;