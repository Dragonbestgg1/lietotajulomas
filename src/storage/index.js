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

    const customStyle = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '30px',
            height: '60px',
            width: '250px',
            minWidth: '150px',
            boxShadow: state.isFocused ? null : null,
            borderRadius: '10px'
        }),
    };

    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>
                <form className={`${style.drop}`} id="dropdown">{/*Te ir meklet plauktu */}
                    <Select 
                        className={`${style.dropdown}`}
                        options={shelves}
                        isSearchable
                        placeholder="Choose shelf"
                        styles={customStyle}
                    />
                </form>
                <form className={`${style.src}`} id="src">{/*Te ir pievienot Plauktu */}
                    <input type="button" className={`${style.ad}`} value="+ Add shelf" />
                </form>
            </div>
            <div className={`${style.shelfs}`}>
                {/*Plaukti*/}
            </div>
        </div>
    )
}

export default Storage;
