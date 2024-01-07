import React from "react";
import style from "../styles/admin.module.css";
import { useState } from "react";   
import axios from 'axios';


function Admin(){
    return(
        <div className={`${style.main}`}>
            <h1 className={style.title}>Admin Page</h1>
        </div>
    )
}

export default Admin;