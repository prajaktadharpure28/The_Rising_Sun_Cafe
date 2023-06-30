import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import headerImage from "./../../assets/signup.png"
import Navbar from '../../components/Navbar/Navbar'

import {currentUser} from './../../util/currentUser'
import './Signup.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user')

  useEffect(() => {
    if(currentUser){
     window.location.href="/"
    }
  }, [])

  async function signupUser() {
    const response = await axios.post('/signup', {
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role
    })
    console.log(response.data)
    if (response.data.success) {
      await Swal.fire({
        title: "🏆",
        text: response.data.message,
        icon: "success",
        button: "OK",
      });
      window.location.href = '/login'
    }
    else {
      Swal.fire({
        title: "😥",
        text: response.data.message,
        icon: "warning",
        button: "OK",
      })
    }

    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setRole('user')
  }

  return (
    <>
    <Navbar user={currentUser?.name}/>
      <div className='container mt-5'>
        <div className=' card-signup'>
          <div className='row'>
            <h2 className='brand-name text-center mt-3'>The Rising Sun Cafe</h2>
            <h4 className="brand-name-1 text-center mt-2 ">
              Sippin' on dreams
            </h4>
            <div className='col-md-6'>
              <div className='mt-5 '>
                <img
                  src={headerImage}
                  alt=""
                  className="signup-image mx-auto d-block"
                />
              </div>
            </div>
            <div className='col-md-6 mt-3 '>
              <form>

                <div className="mb-3 mt-5" >
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder='FullName'
                    value={name} onChange={(e) =>{ setName(e.target.value)}}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email} onChange={(e) =>{ setEmail(e.target.value)}}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    placeholder="Mobile Number"
                    value={phone} onChange={(e) => {setPhone(e.target.value)}}
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
                  <button className="signup-page-btn w-100 mb-5" type="button" onClick={signupUser}>
                    <i className="fa-solid fa-right-to-bracket"></i> Signup 
                  </button>
                <div className="text-center">
                  <a className='brand-name-1' href="/login">Already have an account? Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup