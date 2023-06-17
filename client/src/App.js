import React from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'

import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import SideBar from "./components/SideBar/SideBar"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
          <SideBar />
      </BrowserRouter>
    </div>
    
  )
}

export default App