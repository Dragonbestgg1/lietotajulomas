import React from "react";
import style from "../styles/data.module.css";
import { useState } from "react";   
import axios from 'axios';

function Data(){
    return(
        <div className={`${style.main}`}>
            <form id="productForm">
    <label for="productName">Preces nosaukums:</label>
    <input type="text" id="productName" name="productName"/>

    <label for="productCategory">Preces kategorija:</label>
    <select id="productCategory" name="productCategory">
      <option value="electronics">Elektronika</option>
      <option value="clothing">Apģērbs</option>
      <option value="home">Mājas preces</option>
    </select>

    <label for="productPrice">Preces cena:</label>
    <input type="text" id="productPrice" name="productPrice"/>

    <label for="productDescription">Preces apraksts:</label>
    <textarea id="productDescription" name="productDescription" rows="4" cols="50"></textarea>

    <input type="submit" value="Pievienot preces informāciju"/>
  </form>
        </div>
    )
} export default Data;