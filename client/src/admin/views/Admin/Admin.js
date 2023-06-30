import React from "react";
import { Link } from "react-router-dom";
import './Admin.css';
// import { currentUser } from "../../../util/currentUser";
import { isUser } from "../../../util/role";
import { loginRequired } from "../../../util/loginRequired";
import { tableBookingRequired } from "../../../util/tableBookingRequried";
import { isUserAdmin } from "../../../util/role";

function Admin() {
    loginRequired();
    tableBookingRequired();
    isUser();
    isUserAdmin();
    return (
        <div className="admin">
        <div className="admin__container">
            <h1>Admin</h1>
            <div className="admin__container__buttons">
            <Link to="/admin/addFoodItem">
                <button className="admin__container__buttons__addFoodItem">
                Add Food Item
                </button>
            </Link>
            <Link to="/admin/allFoodItems">
                <button className="admin__container__buttons__allFoodItems">
                All Food Items
                </button>
            </Link>
            <Link to="/admin/addTable">
                <button className="admin__container__buttons__addTable">
                Add Table
                </button>
            </Link>
            <Link to="/admin/allTables">
                <button className="admin__container__buttons__allTables">
                All Tables
                </button>
            </Link>
            </div>
        </div>
        </div>
    );
    }
    export default Admin;