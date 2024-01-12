import React, { useState, useEffect } from "react";
import style from "../styles/storage.module.css";
import axios from 'axios';
import Select from 'react-select';

function Storage(){
    const [shelves, setShelves] = useState([]);

    useEffect(() => {
        axios.get('/shelf')
            .then(response => {
                const options = response.data.map(shelf => ({ value: shelf.id, label: shelf.name }));
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
            height: '100%',
            width: '250px',
            minWidth: '150px',
            alignItems: 'center',
            boxShadow: state.isFocused ? null : null,
            borderRadius: '10px'
        }),
    };

    const filterOption = (option, inputValue) => {
        return (
            option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.value.toString().includes(inputValue)
        );
    };

    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>
                <form className={`${style.drop}`} id="dropdown">{/*Forma lai izveletos plauktu*/}
                    <Select 
                        className={`${style.dropdown}`}
                        options={shelves}
                        isSearchable
                        placeholder="Choose shelf"
                        styles={customStyle}
                        filterOption={filterOption}
                    />
                </form>
                <form className={`${style.src}`} id="src">{/*Forma lai pievienotu plauktus*/}
                    <input type="button" className={`${style.ad}`} value="+ Add shelf" />
                </form>
            </div>
            <div className={`${style.shelfs}`}>{/*Plaukti*/}
                
            </div>
        </div>
    )
}

export default Storage;
