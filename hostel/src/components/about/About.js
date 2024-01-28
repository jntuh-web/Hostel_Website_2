import React,{useState,useEffect} from "react";
import { useLocation } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css"
import axios from 'axios'

function About(props) {
  
  // let obj = {
  //   name: "mahitha",
  //   rollno: "21011A0509",
  //   branch: "CSE",
  //   hostel: "Kamala Nehru Girls Hostel",
  //   roomno: "231",
  //   year: "3",
  // };
  const location=useLocation();
  const path=location.pathname.split('/')[2];
  
  
  const [studentName,setStudentname]=useState("");
  const [rollNo,setRollNo]=useState("")
  const [branch,setBranch]=useState("")
  const [hostel,setHostel]=useState("");
  const [roomNo,setRoomNo]=useState("");
  const [year,setYear]=useState("");

  useEffect(()=>{

    const getusername=async()=>{
      const res=await axios.get("http://localhost:5000/studentAuth/"+path)
      console.log(res.data)
      setStudentname(res.data.studentName)
      setRollNo(res.data.rollNumber)
      setBranch(res.data.branch)
      // setHostel(res.data.hostel)
      // setRoomNo(res.data.roomNo)
    } 
    getusername()
  },[path])
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="container-fluid">
        <div className="row h-100">
          <div className="details container-fluid shadow rounded col-12 col-md-7">
            <div className=" details-content  mt-3 p-4">
              <div className="columns">
                <h5>Name : </h5>
                <p>{studentName}</p>
              </div>
              <div className="columns">
                <h5>Roll No :</h5>
                <p>{rollNo}</p>
              </div>
              <div className="columns">
                <h5>Branch :</h5>
                <p>{branch}</p>
              </div>
              <div className="columns">
                <h5>Hostel :</h5>
                <p>Kamala</p>
              </div>
              <div className="columns">
                <h5>Room No :</h5>
                <p>231</p>
              </div>
              <div className="columns">
                <h5>Year Of Study :</h5>
                <p>3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="d-flex align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" width="100">
                S.no
              </th>
              <th scope="col" width="100">
                Mess Bill
              </th>
              <th scope="col" width="100">
                Room Rent
              </th>
              <th scope="col" width="100">
                Electricity Bill
              </th>
              <th scope="col" width="100">
                Water Bill
              </th>
              <th scope="col" width="130">
                Establishment
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>800</td>
              <td>150</td>
              <td>20</td>
              <td>20</td>
              <td>450</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>800</td>
              <td>150</td>
              <td>20</td>
              <td>20</td>
              <td>450</td>
            </tr>
          </tbody>
        </table>
</div>*/}
    </div>
  );
}

export default About;
