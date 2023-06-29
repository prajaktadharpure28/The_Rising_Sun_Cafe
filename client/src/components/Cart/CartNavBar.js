import React from 'react';
import { Link } from 'react-router-dom'
import './CartNavBar.css';
import { myFoodListCount } from '../../util/myList';
import logo from './../../assets/logo.png'
import QRCode from './../../assets/qr-code.png'
import trolley from './../../assets/trolley.png'
import { currentUser } from './../../util/currentUser'

const CartNavBar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <img className="logo" src={logo} alt="logo" />
          <a className="nav-bar" href="/">Rising sun cafe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* qr code img */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/scanner"
                >
                  <img className="qr-code" src={QRCode} alt="qr-code" />
                </Link>
              </li>
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
              {
                currentUser ? (
                  <button type="button" className='cart-btn m-2'
                    onClick={props.onClickCart}>
                    <img
                      src={trolley}
                      alt="cart"
                      className="cart-icon"
                    />
                    <span className="cart-count">{myFoodListCount}</span>
                  </button>
                ) : null
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CartNavBar;
