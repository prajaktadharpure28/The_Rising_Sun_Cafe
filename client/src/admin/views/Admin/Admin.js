import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Admin.css"
import Navbar from '../../../components/Navbar/Navbar'

import MENU_ITEM from './menuConfig'

function Admin() {
  const [menuItem, setMenuItem] = useState(MENU_ITEM);

  useEffect(() => {
    setMenuItem(MENU_ITEM);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-admin">
        <h1>Admin Panel</h1>
      </div>
      <div className="row admin-row text-center">
        {menuItem.map((item, index) => {
          return (
            <div key={index} className="col-md-3 adminCard">
              <Link to={item.path}>
                <img src={item.icon} className="admin_img" alt="random" />
                <button
                  className="admin_btn"
                >{
                    item.title
                  }
                </button>
              </Link>
            </div>
          );
        }
        )}
      </div>
    </div>
  )
}
export default Admin;