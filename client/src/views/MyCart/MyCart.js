import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import "./MyCart.css";
import { myFoodListItems } from './../../util/myList';
import { currentUser } from "./../../util/currentUser";
import { myBookedTable } from "./../../util/bookedTable";
import Swal from "sweetalert2";

function MyCart() {
  if (currentUser.user === null) {
    window.location.href = "/";
  }

  async function placeOrder() {
    const response = await axios.post('/orderFoodItems', {
      userId: currentUser._id,
      tableNumber: myBookedTable.tableNumber,
      items: myFoodListItems,
    });

    console.log(response.data.data);
    if (response.data.success) {
      await Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        button: 'OK',
      });
      localStorage.removeItem('list');
      window.location.reload();
    }
  }

    // dialog box for remove item

    const removeItem = (index) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            myFoodListItems.splice(index, 1);
            localStorage.setItem('list', JSON.stringify(myFoodListItems));
            window.location.reload();
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Your item is safe :)', 'error');
          }
        });
    }
  // set quantity

  function setQuantity(item, quantity) {
    const existingCart = JSON.parse(localStorage.getItem("list")) || [];
    const updatedCart = existingCart.map((foodItem) => {
      if (foodItem.name === item.name) {
        foodItem.quantity = quantity;
        foodItem.total = foodItem.price * quantity;
      }
      return foodItem;
    });
    localStorage.setItem("list", JSON.stringify(updatedCart));
    window.location.reload();
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="my-cart-heading">My Cart</h1>
            <div className="my-cart-container">
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th className="tab-col" scope="col">Item</th>
                        <th className="tab-col" scope="col">Quantity</th>
                        <th className="tab-col" scope="col">Price</th>
                        <th className="tab-col" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myFoodListItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={item.quantity}
                                onChange={(e) =>
                                  setQuantity(item, e.target.value)
                                }
                              />
                            </td>
                            <td>{item.total}</td>
                            <td>
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  removeItem(index);
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="text-right">
                    <button
                      className="btn"
                      onClick={placeOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default MyCart;