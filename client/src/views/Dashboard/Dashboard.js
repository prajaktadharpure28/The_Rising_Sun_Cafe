import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios'
import FoodItemCard from './../../components/FoodItemCard/FoodItemCard'
import FoodItemList from './../../util/FoodItemList'
import CartNavBar from '../../components/Cart/CartNavBar';
import Cart from '../../components/Cart/Cart';

import { tableBookingRequired } from '../../util/tableBookingRequried';
import { loginRequired } from './../../util/loginRequired'
import { currentUser } from './../../util/currentUser'

import Modal from 'react-modal';

Modal.setAppElement('#root');

function Dashboard() {
  const [searchText, setSearchText] = useState('')
  const [currentFoodItems, setAllFoodItems] = useState([])

  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleModalCart() {
    setIsCartOpen(!isCartOpen);
    console.log('Button Clicked');
  }

  async function fetchAllItems() {
    console.log('fetching all items')
    const response = await axios.get('/allFoodItems')
    console.log(response.data.data)
    setAllFoodItems(response.data.data)
  }

  async function fetchSpecificItems() {
    console.log('fetching specific items')
    const response = await axios.get(`/foodItems?title=${searchText}`)
    console.log(response.data.data)
    setAllFoodItems(response.data.data)
  }

  useEffect(() => {
    loginRequired();
    tableBookingRequired();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSpecificItems()
    }
    else {
      fetchAllItems()
    }
    //eslint-disable-next-line
  }, [searchText])


  return (
    <div>
      <CartNavBar onClickCart={toggleModalCart} />
      <Cart onClickCart={toggleModalCart} isCartOpen={isCartOpen} />
      <div className="option-btns">
        {currentUser  &&  (
          <a href="/mycart" className="btn m-2">
            Go to your cart
          </a>
        )}

        {/* show available tables */}
        <a className="btn m-2" href="/tables">Show available tables</a>

        {/* show my orders */}
        <a className="btn m-2" href="/myOrders">Show my orders</a>

        {/* show checkout button on the right hand side */}
        {currentUser && FoodItemList.FoodItemCart.length > 0 && (
          <a href="/checkout" className="btn m-2">
            Checkout
          </a>
        )}
      </div>
      <div className='search-container'>
        <input type="text"
          placeholder='Search for food items, drinks, desserts, etc...'
          className='input-search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <div className="food-items-result  text-center">
          <div className="container-fluid">
            <div className="row">
              {currentFoodItems?.map((fooditem, index) => {
                return (
                  <FoodItemCard
                    key={index}
                    title={fooditem.title}
                    price={fooditem.price}
                    category={fooditem.category}
                    imgUrl={fooditem.imgUrl}
                  />
                );
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
