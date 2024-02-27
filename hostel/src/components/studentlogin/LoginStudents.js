import React from 'react';
import logo from "../../images/logo.jpg";
import "./LoginStudents.css";
import { useForm } from "react-hook-form";
import axios from 'axios';

function LoginStudents() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data.rollNumber)
      console.log(data.password)
      const response = await axios.post('http://localhost:5000/studentAuth/login', {
        rollNumber: data.rollNumber,
        password: data.password,
      });
      console.log(response)
      if (response.data) {
        // Successful login logic (you can redirect or set user in context, etc.)
        console.log('Login successful');
        // Redirect to the home page after successful login
        window.location.replace(`/student/${response.data._id}`);
      } else {
        console.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="mt-5 login-form-container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="heading m-auto">
          <img src={logo} width="50px" alt="" className='rounded-circle' />
          <h3 className="text-center">SignIn/Login</h3>
        </div>
        <div className="input-container">
          <div>
            <label className="input-label form-label" htmlFor="rollNumber">
              ROLL NUMBER:
            </label>
            <input
              type="text"
              id="rollNumber"
              className="form-control"
              {...register("rollNumber", {
                required: "Roll number is required",
                minLength: 1,
                maxLength: 10,
              })}
            />
            {errors.rollNumber?.type === "required" && (
              <p className="text-danger">*{errors.rollNumber.message}</p>
            )}
            {errors.rollNumber?.type === "minLength" && (
              <p className="text-danger">*Min length is 1</p>
            )}
            {errors.rollNumber?.type === "maxLength" && (
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
                required: "Password is required",
                minLength: 2,
                maxLength: 150,
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

export default LoginStudents;
