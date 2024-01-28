import React from 'react'
import img1 from "../../images/1.jpg"
import "./Home.css"
//import { Navbar } from 'react-bootstrap';
import NavBar from '../navbar/NavBar'
function Home() {
  return (
    <div>
      {<NavBar/>}
      <div className="container-fluid">
        <h1 className="homeHeading">JNTU HOSTELS</h1>
      </div>
    </div>
  );
}

export default Home