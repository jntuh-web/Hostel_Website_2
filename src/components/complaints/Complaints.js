import React, { useState } from "react";
import { useForm } from "react-hook-form";
function Complaints() {
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  let [state,setState]=useState({});
  
  const typeList = ["Electricity", "Plumbing", "Room Related", "Others"];
  let [activeType,setActiveType]=useState("Electricity");
  let onChangeType = (event) => {
    setActiveType(event.target.value)
  };
  let submitForm = (data) => {
    setState(data)
    console.log(state)
    console.log(data)
    let temp={
      username:"",
      rollno:"",
      roomno:"",
      hostelName:"",
      description:""
    }
    reset(temp)
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Post a Complaint
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form width="100" onSubmit={handleSubmit(submitForm)}>
                <div className="input-container">
                  <div>
                    <label
                      htmlFor="username"
                      className="input-label form-label"
                    >
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
                    <label className="input-label form-label" htmlFor="rollno">
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
                  <div>
                    <label
                      className="input-label form-label"
                      htmlFor="hostelName"
                    >
                      Hostel Name :
                    </label>
                    <input
                      type="text"
                      id="hostelName"
                      className="form-control"
                      {...register("hostelName", {
                        required: "password required",
                        minLength: 2,
                        maxLength: 50,
                      })}
                      
                    />
                    {errors.hostelName?.type === "required" && (
                      <p className="text-danger">
                        *{errors.hostelName.message}
                      </p>
                    )}
                    {errors.hostelName?.type === "minLength" && (
                      <p className="text-danger">*Min length is 2</p>
                    )}
                    {errors.hostelName?.type === "maxLength" && (
                      <p className="text-danger">*Max length is 50</p>
                    )}
                  </div>
                </div>
                <div className="input-container">
                  <div>
                    <label className="input-label form-label" htmlFor="roomno">
                      Room No :
                    </label>
                    <input
                      type="text"
                      id="roomno"
                      className="form-control"
                      {...register("roomno", {
                        required: "password required",
                        minLength: 2,
                        maxLength: 50,
                      })}
                      
                    />
                    {errors.roomno?.type === "required" && (
                      <p className="text-danger">*{errors.roomno.message}</p>
                    )}
                    {errors.roomno?.type === "minLength" && (
                      <p className="text-danger">*Min length is 2</p>
                    )}
                    {errors.roomno?.type === "maxLength" && (
                      <p className="text-danger">*Max length is 50</p>
                    )}
                  </div>
                </div>
                <select
                  onChange={onChangeType}
                  value={activeType}
                  className="form-select form-select-lg mb-3 mt-3"
                >
                  {typeList.map((each) => (
                    <option key={each} value={each}>
                      {each}
                    </option>
                  ))}
                </select>
                <div className="input-container">
                  <label className="input-label form-label" htmlFor="desc">
                    Write Your Complaint Here...
                  </label>
                  <textarea
                    id="desc"
                    placeholder="ex:room lock is not working properly.."
                    className="form-control"
                    {...register("description", {
                      required: "description required",
                      minLength: 2,
                      maxLength: 500,
                    })}
                    
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="login-button"
                  data-bs-dismiss="modal"
                >
                  Post Complaint
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
