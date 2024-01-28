import React from 'react'
import NavBar from '../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'
import Home from '../components/home/Home'
import "./RouteLayout.css"
function RouteLayout(props) {
  return (
    <div>
      <div className='temp'>
        <Outlet />
      </div>
    </div>
  );
}

export default RouteLayout