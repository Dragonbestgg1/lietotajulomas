import * as React from "react";
import { useState, useEffect } from "react";
import style from '../styles/login.css';

function App(){
    return(
        <div className={`${style.main}`}>
            <div>{/*header*/}

            </div>
            <div className={`${style.body}`}>{/*login/register*/}
                <h1>Nebusa</h1>
            </div>
        </div>
    )
}
export default App();