import React from "react";
import style from "../styles/reports.module.css";
import { useState } from "react";   
import axios from 'axios';

function Reports(){{/*uz tokens bus*/}
    return(
        <div className={`${style.main}`}>
             <h2>Noliktavas preču atskaite</h2>
  <table>
    <thead>
      <tr>
        <th>Preces kods</th>
        <th>Preces nosaukums</th>
        <th>Preces daudzums</th>
        <th>Kategorija</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>Dators</td>
        <td>25</td>
        <td>Elektronika</td>
      </tr>
      <tr>
        <td>002</td>
        <td>T-krekls</td>
        <td>150</td>
        <td>Apģērbs</td>
      </tr>
    </tbody>
  </table>
        </div>
    )
}

export default Reports;