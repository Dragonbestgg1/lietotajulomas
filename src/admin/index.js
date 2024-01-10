import React from "react";
import style from "../styles/admin.module.css";
import { useState } from "react";   


function Admin(){
    return(
        <div className={`${style.main}`}>
        <h2>Tabula</h2>

<table>
  <tr>
    <th>Kas</th>
    <th>Amats</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    
  </tr>
</table>
        </div>
    )
}

export default Admin;