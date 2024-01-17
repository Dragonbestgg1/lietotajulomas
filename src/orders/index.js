import React from "react";
import style from "../styles/orders.module.css";
import { useState } from "react";   
import axios from 'axios';

function Orders(){
    return(
        <div className={`${style.main}`}>
            <h2>Pasūtījumu pārvaldība</h2>
            <table id="myTable">
    <tr>
        <th>Pasūtījuma nr.</th>
        <th>Preces nosaukums</th>
        <th>Preces cena</th>
        <th>Statuss</th>
    </tr>
</table>
        </div>
    )
}

export default Orders;