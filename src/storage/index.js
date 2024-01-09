import React from "react";
import style from "../styles/storage.module.css";
import { useState } from "react";   
import axios from 'axios';

function Storage(){
    const shelves = ['Shelf 1', 'Shelf 2', 'Shelf 3'];

    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>
                <form className={`${style.drop}`} id="dropdown">
                    <select className={`${style.dropdown}`}>
                        <option value="" disabled selected>Choose shelf</option>
                        {shelves.map((shelf, index) => (
                            <option key={index} value={shelf}>{shelf}</option>
                        ))}
                    </select>
                </form>
                <form className={`${style.src}`} id="src">
                    {/*Te bus dropdown ar search kopa */}
                </form>
                <form>
                    
                </form>
            </div>
            <div className={`${style.shelfs}`}>
                {/*Plaukti*/}
            </div>
        </div>
    )
}

export default Storage;
