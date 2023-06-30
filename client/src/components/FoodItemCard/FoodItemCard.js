import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FoodItemCard.css"

const FoodItemCard = (props) => {
  const [quantity, setQuantity] = useState(1);

  async function addToList() {
    const listObj = {
      name: props.title,
      price: props.price,
      quantity: quantity,
      total: props.price * quantity,
    };

    //Add list to local storage
    const existingList = JSON.parse(localStorage.getItem('list')) || [];
    existingList.push(listObj);
    localStorage.setItem('list', JSON.stringify(existingList));
    await Swal.fire ({
      title: "Added to Cart",
      text: "Item added to cart successfully",
      icon: "success",
      confirmButtonText: "OK",
    });

    // setQuantity(1);

    window.location.reload();

  }

  return (
    <div className="cards col-md-3">
      <div className="card-container">
        <div className="card" style={{ width: "18rem" }}>
          <img src={props.imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-desc">{props.description} </p>
            <p className="card-text">Only at ₹{props.price}/-</p>
            <span>{props.category}</span>
            {/*increment and decreament buttons for quantity */}
            <div className="d-flex">
              <button
                className="card-btn m-2 fs-4 qty-change-btn"
                onClick={(e) => {
                  // setQuantity(quantity - 1);
                  
                    quantity - 1 && setQuantity(quantity - 1);
                  
                }}
              >
                -
              </button>
              <p className="mx-3 align-middle fs-5 font-monospace qty-count">
                {quantity}
              </p>
              <button
                className="card-btn m-2 fs-4 qty-change-btn"
                onClick={(e) => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>

            <button
              href="#"
              className="card-btn"
              onClick={addToList}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemCard;

