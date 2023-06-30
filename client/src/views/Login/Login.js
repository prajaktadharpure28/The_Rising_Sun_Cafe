import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import headerImage from './../../assets/login.png';
import Navbar from '../../components/Navbar/Navbar';

import { currentUser } from './../../util/currentUser'
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      window.location.href = "/dashboard"
    }
  }, [])

  async function checkLogin() {
    const response = await axios.post('/login', {
      email: email, 
      password: password,
    })
    console.log(response.data) 
      if (response.data.success) {
      await Swal.fire({
        title: "✅",
        text: response.data.message,
        icon: "success",
        button: "Ok!",
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      window.location.href = "/"
    }
    else {
      await Swal.fire({
        title: "😥",
        text: response.data.message,
        icon: "warning",
        button: "Try Again!"
      })
      setEmail("");
      setPassword("");
      localStorage.removeItem('currentUser');
    }
  }

  return (
    <>
    <Navbar user={currentUser?.name}/>
      <div className='container mt-5'>
        <div className='login-card'>
          <div className='row'>
            <h2 className='brand-name text-center mt-5'>Login</h2>
            <div className='col-md-6 mt-3'>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email} onChange={(e) =>  {setEmail(e.target.value) } }
                    />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password} onChange={(e) => {setPassword(e.target.value) }}
                  />
                </div>
                <button className="login-page-btn w-100 mb-3 m-2" type="button" onClick={checkLogin}>
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </button>

                <div className="text-center">
                  <a className='brand-name-1' href="/signup">Don't have an account? Register</a>
                </div>
              </form>
            </div>

            <div className='col-md-6'>
              <div className='mt-3 image mb-3 '>
                <img
                  src={headerImage}
                  alt=""
                  className="login-img mx-auto d-block "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login