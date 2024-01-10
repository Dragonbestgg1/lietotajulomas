import React, { useState, useEffect } from "react";
import style from "../styles/storage.module.css";
import axios from 'axios';
import Select from 'react-select';

function Storage(){
    const [shelves, setShelves] = useState([]);

    useEffect(() => {
        axios.get('/shelf')
            .then(response => {
                const options = response.data.map(shelf => ({ value: shelf, label: shelf }));
                setShelves(options);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>
                <form className={`${style.drop}`} id="dropdown">{/*Te ir meklet plauktu */}
                    <Select 
                        className={`${style.dropdown}`}
                        options={shelves}
                        isSearchable
                        placeholder="Choose shelf"
                    />
                </form>
                <form className={`${style.src}`} id="src">{/*Te ir pievienot dropdown */}
                </form>
            </div>
            <div className={`${style.shelfs}`}>
                {/*Plaukti*/}
            </div>
        </div>
    )
}

export default Storage;
