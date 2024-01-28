import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom'
import axios from 'axios'
function Complaints() {
  const location=useLocation();
  const path=location.pathname.split('/')[2];
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [state,setState]=useState({});
 
  const onSubmit = async (data) => {
    setState(data)
    console.log(data)
    try {
      const response = await axios.post('http://localhost:5000/complaints/complaintRegister', {
        complainedStudentID:path,
        username:data.username,
        rollno:data.rollno,
        roomno:parseInt(data.roomno),
        hostelName:data.hostelName,
        description:data.description,
        category:data.category  
      });
      console.log("hi")
      if (response) {
        // Successful login logic (you can redirect or set user in context, etc.)
        console.log('Complained successfully');
        // Redirect to the home page after successful login
        window.location.replace(`/student/${path}/complaints`);
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
        const allComplaints=await axios.get(`http://localhost:5000/complaints/${path}`)
        //setComplaints(allComplaints)
        const data=await allComplaints.data
        console.log(data)
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          // If data is not an array, handle it as per your requirements
          console.log(typeof(allComplaints))
          setComplaints([]);
        }

        setLoading(false);
      }catch(e){
        setError(e);
      }
    }
    fetchData();
  }, []); 
  
  const typeList = ["Electricity", "Plumbing", "Room Related", "Others"];
  let [activeType,setActiveType]=useState("Electricity");
  let onChangeType = (event) => {
    setActiveType(event.target.value)
  };
  let submitForm = (data) => {
    setState(data)
    // console.log(state)
    console.log(data)
    let temp={
      username:"",
      rollno:"",
      roomno:"",
      hostelName:"",
      category:"",
      description:""
    }
    reset(temp)
  };
  return (
    <div>
    {complaints.length === 0 ? (
      <p>No complaints found for this student.</p>
    ) : (
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id}>
            Reason: {complaint.complaint}   Status: {complaint.statusOfComplaint} 
          </li>
        ))}
      </ul>
    )}
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
              <form width="100" onSubmit={handleSubmit(onSubmit)}>
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
                  id="category"
                  onChange={onChangeType}
                  value={activeType}
                  className="form-select form-select-lg mb-3 mt-3"{...register("category", {
                    required: "password required"})}
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
    </div>
  );
}

export default Complaints;
