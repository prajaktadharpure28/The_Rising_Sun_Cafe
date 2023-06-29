import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'
import QRCode from './../../assets/qr-code.png'
import "./Navbar.css"
import { currentUser } from './../../util/currentUser'

function Navbar() {
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <img className="logo" src={logo} alt="logo" />
          <a className="nav-bar" href='/'>Rising sun cafe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* qr code img */}
            {currentUser &&(
              <li className="nav-item">
              <Link 
                className="nav-link active"
                to="/scanner"
              >
                <img className="qr-code" src={QRCode} alt="qr-code" />
              </Link>
            </li>
            )}
            </ul>
            {currentUser && (
              <form className="d-flex align-items-center">
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
              {!currentUser ? (
                <button type="button" className='logout-btn m-2' onClick={Signup}>
                  Signup
                </button>
              ) : null}
              {!currentUser ? (
                <button type="button" className='logout-btn m-2' onClick={Login}>Login</button>
              ) : null}
              {currentUser ? (
                <button type="button" className='logout-btn m-2' onClick={logoutAlert}>
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
