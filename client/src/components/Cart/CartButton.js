import React from 'react';
import './CartButton.css';
import trolley from '../../assets/trolley.png';
import { myFoodListCount } from '../../util/myList';

const CartButton = (props) => {
  return (
    <>
      <button className='cart-btn m-2' onClick={props.onClickCart}>
        <img
          src={trolley}
          alt="trolley"
          className="cart-icon"

        />
        <span className="badge">{myFoodListCount}</span>
      </button>
    </>
  );
};

export default CartButton;
