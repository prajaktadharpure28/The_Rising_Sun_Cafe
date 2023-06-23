import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import logo from './../../assets/logo.png'
import trolley from './../../assets/trolley.png'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { currentUser } from './../../util/currentUser'

function Navbar({ user }) {
  function logOut() {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }
  // sweetalert for logout

  async function logoutAlert() {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Logout cancelled :)",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
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
          <img className="logo" src={logo} alt="logo" />
          <a className="nav-bar" href="#">Rising sun cafe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li> */}
            </ul>
            {currentUser && (
              <form class="d-flex align-items-center">
                <img
                  src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                  alt="profile"
                  className="profile-icon"
                />
                <p className="profile-name">{currentUser.name}</p>
              </form>
            )}

            {/* add to cart button */}

            <div className="d-flex">
              <Link to="/myCart">
                {
                  currentUser && (
                    <button type="button" className='cart-btn m-2'>
                      <img
                        src={trolley}
                        alt="cart"
                        className="cart-icon"
                      />
                    </button>
                  )
                }
              </Link>
            </div>
            {!currentUser && (
              <button type="button" className='logout-btn m-2' onClick={Signup}>
                Signup
              </button>
            )}
            {!currentUser && (
              <button type="button" className='logout-btn m-2' onClick={Login}>Login</button>
            )}

            {currentUser && (
              <button type="button" className='logout-btn m-2' onClick={logoutAlert}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
