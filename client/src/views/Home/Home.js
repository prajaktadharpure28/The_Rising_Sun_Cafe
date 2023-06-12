import React, {useState, useEffect} from 'react'
// import axios from 'axios'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar';

import {loginRequired} from './../../util/loginRequired'
import { currentUser } from '../../util/currentUser'

function Home() {


useEffect(()=>{
      loginRequired()
  }, [])
  

  return (
    <div>
      <Navbar user={currentUser?.name}/>
    </div>
  )
}

export default Home
