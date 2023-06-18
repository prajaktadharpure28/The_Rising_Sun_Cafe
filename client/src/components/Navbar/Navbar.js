import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { currentUser } from './../../util/currentUser'

function Navbar({ user }) {
  function logOut() {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
  }

  function Login() {
    window.location.href = '/login'
  }

  function Signup() {
    window.location.href = '/signup'
  }



  // const [foodItemCount, setFoodItemCount] = useState(myFoodListCount)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="nav-bar" href="#">Rising sun cafe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            {currentUser && (
            <form class="d-flex align-items-center">
            
              <img
                src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                alt="profile"
                className="profile-icon"
              />
              <h4 className='text'>{user}</h4>
            </form>
            )}
            
           {!currentUser && (
            <button type="button" className='logout-btn' onClick={Signup}>
              Signup
            </button>
            )}
            {!currentUser && (
            <button type="button" className='logout-btn' onClick={Login}>Login</button>
            )}


            {currentUser && (
            <button type="button" className='logout-btn' onClick={logOut}>Logout</button>
            )}


           
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
