import React from "react";
import style from "../styles/storage.module.css";
import { useState } from "react";   
import axios from 'axios';

function Storage(){
    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>{/*Plauktu izvele/pievienot jaunu plauktu*/}
                <form className={`${style.drop}`} id="dropdown">
                    <select className={`${style.dropdown}`}>
                        <option value="" disabled selected>Choose shelf</option>
                        {/*te vajadzes ar foreach options prieks plauktiem un value ko paradit bus
                        plaukta numurs, kura ir atrodama informācija par to*/}
                    </select>
                </form>
                <form className={`${style.src}`} id="src">
                    {/*Te bus dropdown ar search kopa */}
                </form>
                {/* <form className={`${style.add}`} id="addShelfs">

                </form> */}
                
            </div>
            <div className={`${style.shelfs}`}>{/*Plaukti*/}

            </div>
        </div>
    )
}

export default Storage;