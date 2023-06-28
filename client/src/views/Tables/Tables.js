import React, { useState, useEffect } from 'react';
import './Tables.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar';
import AvailableTable from './../../assets/table.png';
import { loginRequired } from '../../util/loginRequired';
import { currentUser } from '../../util/currentUser';

const Tables = () => {
  const [availabeTable, setAvailabeTable] = useState([]);

  useEffect(() => {
    loginRequired();
    fetchAvailabeTalbles();
  }, []);

  async function fetchAvailabeTalbles() {
    console.log('fetching all tables');
    const response = await axios.get('/availableTables');
    console.log(response.data.data);
    setAvailabeTable(response.data.data);
  }

  async function bookThisTable(e) {
    const response = await axios.post('/bookTable', {
      tableNumber: e.target.value,
      userId: currentUser._id,
    });

    console.log(e.target.value);
    console.log(currentUser);

    if (response.data.success) {
      await Swal.fire({
        title: 'Success',
        text: 'Table Booked Successfully',
        icon: 'success',
        button: 'OK',
      });
      window.location.href = '/dashboard';
      localStorage.setItem('bookedTable', JSON.stringify(response.data.data));
    } else {
      await Swal.fire({
        title: 'Error',
        text: 'Table Already Booked',
        icon: 'error',
        button: 'OK',
      });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="text-table">
        <h1>Available Tables</h1>
      </div>
      <div className="row table-row text-center">
        {availabeTable?.map((table, index) => {
          return (
            <div key={index} className={`col-md-3 tableCard ${table.occupied && 'bg-tableCard'}`}>
              <p className="tableNumber">Table Number - {table.tableNumber}</p>
              <img src={AvailableTable} className="table" alt="random" />
              <br></br>
              <button
              className={`btn ${table.occupied}`}
                disabled={table.occupied}
                value={table.tableNumber}
                onClick={bookThisTable}>
                Book Table
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Tables;
