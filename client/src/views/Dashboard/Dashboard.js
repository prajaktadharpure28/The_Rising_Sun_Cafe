import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'
import FoodItemCard from './../../components/FoodItemCard/FoodItemCard'
import Navbar from './../../components/Navbar/Navbar'
import FoodItemList from './../../util/FoodItemList'

import { loginRequired } from './../../util/loginRequired'
import { currentUser } from './../../util/currentUser'

function Dashboard() {
  const [searchText, setSearchText] = useState('')
  const [currentFoodItems, setAllFoodItems] = useState([])

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
    if (searchText.length > 0) {
      fetchSpecificItems()
    }
    else {
      fetchAllItems()
    }
  }, [searchText])

  useEffect(() => {
    loginRequired()
  }, [])

  return (
    <div>
      <Navbar user={currentUser?.name} />

      <div className="option-btns">
        {currentUser && FoodItemList.FoodItemCart.length > 0 && (
          <a href="/myCart" className="btn m-2">
            Go to your cart
          </a>
        )}

        {/* show available tables */}
        <a className="btn m-2" href="/bookTable">Show available tables</a>

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
      <div className="show-items-container m-4">
        <div className="row ">
          {currentFoodItems.map((item, index) => {
            return (
              <FoodItemCard
                // key={item._id}
                key={index}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.imgURL}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
