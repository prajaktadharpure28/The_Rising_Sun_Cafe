import React from 'react';
import { myFoodListItems } from './../../util/myList';
import './Cart.css';
import axios from 'axios';
import swal from 'sweetalert2';
import { currentUser } from '../../util/currentUser';
import { myBookedTable } from '../../util/bookedTable';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const Cart = (props) => {
  async function placeOrder() {
    const response = await axios.post('/orderFoodItems', {
      userId: currentUser._id,
      tableNumber: myBookedTable.tableNumber,
      items: myFoodListItems,
    });

    console.log(response.data.data);
    if (response.data.success) {
      await swal.fire({
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
    swal.fire({
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
          swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire('Cancelled', 'Your item is safe :)', 'error');
        }
      });
  };


  return (
    <div>
      <Modal
        isOpen={props.isCartOpen}
        onRequestClose={props.onClickCart}
        contentLabel="My dialog"
        className="myCartmodal"
        overlayClassName="myCartoverlay"
        closeTimeoutMS={200}>
        <div className="cart-container">
          {myFoodListItems.map((item, index) => {
            return (
              <div>
                <h6>Name : {item.name}</h6>
                <h6>Quantity : {item.quantity}</h6>
                <h6>Price : ₹{item.price}</h6>
                <button
                  className="remove-button"
                  onClick={() => {
                    removeItem(index);
                  }}>
                  Remove
                </button>
                <hr></hr>
              </div>
            );
          })}

          <h5 className="my-4 text-center">
            Total Bill : ₹{myFoodListItems.reduce((acc, item) => acc + item.total, 0)}
          </h5>

          <button className="cancel-btn mx-4" onClick={props.onClickCart}>
            Cancel
          </button>
          <button className="order-btn mx-4" onClick={placeOrder}>
            Order Now
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
