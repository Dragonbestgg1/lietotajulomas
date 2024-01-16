import React, { useState, useEffect } from "react";
import style from "../styles/storage.module.css";
import axios from 'axios';
import Select from 'react-select';

function Storage(){
    const [shelves, setShelves] = useState([]);
    const [items, setItems] = useState([]);
    const [showInput, setShowInput] = useState(false); 
    const [newShelfName, setNewShelfName] = useState(''); 
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        axios.get('/shelf')
            .then(response => {
                const options = response.data.map(shelf => ({ value: shelf.id, label: `${shelf.id}. ${shelf.name}` }));
                setShelves(options);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/items')
            .then(response => {
                setItems(response.data);
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

    const handleAddShelf = (event) => { 
        event.preventDefault();
        if (newShelfName.trim() === '') { 
            setMessage('Shelf name cannot be empty.');
            return;
        }
        axios.post('/shelf', { name: newShelfName })
            .then(response => {
                console.log(response);
                setNewShelfName('');
                setShowInput(false);
                setMessage('Shelf was successfully added!');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setMessage('Failed to add shelf.');
            });
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
                    <input type="button" className={`${style.ad}`} value="+ Add shelf" onClick={() => setShowInput(!showInput)} />
                </form>
            </div>
            {showInput && ( 
                <form className={`${style.make}`} id="newShelfForm" onSubmit={handleAddShelf}>
                    <input type="text" className={`${style.input}`} placeholder="Enter shelf name" value={newShelfName} onChange={e => setNewShelfName(e.target.value)} />
                    <input type="submit" value="Submit" />
                    {message && <div className={`${style.err}`}>{message}</div>} 
                </form>
            )}
            <div className={`${style.wholeProducts}`}>
                <div className={`${style.shelfs}`}>{/*Plaukti*/}
                    {shelves.map(shelf => 
                    <div className={`${style.shelfBox}`}>
                        <div className={`${style.shelfName}`} key={shelf.value}>{shelf.label}</div>
                        
                    </div>
                    )}
                </div>
                <div className={`${style.products}`}>{/*Produkti */}
                    {/* {items.map((item, index) =>  */}
                     <div className={`${style.productsBox}`} >{/*key={index} */}
                         <div className={`${style.productsName}`}>Darzenis</div>{/* {item.name} */}
                         <div className={`${style.productsPrice}`}>3,00 </div>
                    </div>
                    {/* )} */}
                </div>
            </div>
        </div>
    )
}

export default Storage;
