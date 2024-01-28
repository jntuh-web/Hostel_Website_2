import React from 'react'
import "./Navbar.css"
import logo from "../../images/logo.jpg"
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-body-tertiary bg-dark rounded fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#Home">
            <div className="logo-content">
              <img width="40px" className="rounded-circle" src={logo} alt="" />
              <h5 className="mx-3 my-1">JNTUH</h5>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/wardens">
                  Wardens
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signIn">
                  SignIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default NavBar