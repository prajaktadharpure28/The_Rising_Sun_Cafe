import React from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './views/Dashboard/Dashboard'
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import Home from './views/Home/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App