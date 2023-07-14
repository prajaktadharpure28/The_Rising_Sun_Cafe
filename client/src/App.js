import React from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Dashboard from './views/Dashboard/Dashboard'
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import Home from './views/Home/Home'
import MyCart from './views/MyCart/MyCart'
import Tables from './views/Tables/Tables'
import Scanner from './views/Scanner/Scanner'
import Admin from './admin/views/Admin/Admin';
import AddProduct from './admin/views/AddProduct/AddProduct'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App