import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import style from "../styles/storage.module.css";
import axios from 'axios';
import Select from 'react-select';

function Storage(){
    const [shelves, setShelves] = useState([]);
    const [items, setItems] = useState([]);
    const [showInput, setShowInput] = useState(false); 
    const [newShelfName, setNewShelfName] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedShelf, setSelectedShelf] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [editProduct, setEditProduct] = useState(null); 

    useEffect(() => {
        axios.get('/shelf')
            .then(response => {
                const options = [{ value: null, label: "Select all shelves" }].concat(
                    response.data.map(shelf => ({ value: shelf.id, label: `${shelf.id}. ${shelf.name}` }))
                );
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
            borderRadius: '10px',
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
                
            })
            .catch(error => {
                console.error('There was an error!', error);
                setMessage('Failed to add shelf.');
            });
    };

    const handleShelfEdit = (shelfId) => {
        const itemsToEdit = items.filter(item => item.shelf_id === shelfId);
        setEditItem(itemsToEdit);
        openModal();
    };

    const handleProductEdit = (productId) => {
        const productToEdit = items.find(item => item.id === productId);
        setEditProduct(productToEdit);
        openModal();
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        axios.put(`/items/${editProduct.id}`, editProduct)
            .then(response => {
                console.log(response);
                axios.get('/items') 
                    .then(response => {
                        setItems(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
                closeModal();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleDeleteShelf = (shelfId) => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = (shelfId) => {
        axios.delete(`/shelf/${shelfId}`)
            .then(response => {
                console.log(response);
                closeModal();
                setIsConfirmModalOpen(false);
                setItems(items.map(item => item.shelf_id === shelfId ? {...item, shelf_id: 0} : item));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return(
        <div className={`${style.main}`}>
            <div className={`${style.option}`}>
                <form className={`${style.drop}`} id="dropdown">
                    <Select 
                        className={`${style.dropdown}`}
                        options={shelves}
                        isSearchable
                        placeholder="Choose shelf"
                        styles={customStyle}
                        filterOption={filterOption}
                        onChange={setSelectedShelf}
                    />
                </form>
                <form className={`${style.src}`} id="src">
                    <input type="button" className={`${style.ad}`} value="+ Add shelf" onClick={() => setShowInput(!showInput)} />
                </form>
            </div>
            {showInput && ( 
                <form className={`${style.make}`} onSubmit={handleAddShelf}>
                    <input type="text" className={`${style.input}`} placeholder="Enter shelf name" value={newShelfName} onChange={(e) => setNewShelfName(e.target.value)} />
                    <input type="submit" className={`${style.but}`} value="Submit" />
                    {message && <div className={`${style.err}`}>{message}</div>} 
                </form>
            )}
            <div className={`${style.wholeProducts}`}>
                <div className={`${style.shelfWrap}`}>
                    <h1 className={`${style.h1}`}>Shelves</h1>
                    <div className={`${style.shelfs}`}>
                        {(selectedShelf && selectedShelf.value !== null ? shelves.filter(shelf => shelf.value === selectedShelf.value) : shelves).map(shelf => 
                            shelf.value !== null && (
                                <div className={`${style.shelfBox}`} onClick={() => handleShelfEdit(shelf.value)}>
                                    <div className={`${style.shelfName}`} key={shelf.value}>{shelf.label}</div>
                                    <div className={`${style.values}`}>
                                        <h1 className={`${style.h3}`}>Name</h1>
                                        <h1 className={`${style.h3}`}>Price</h1>
                                        <h1 className={`${style.h3}`}>count</h1>
                                        <h1 className={`${style.h3}`}>Image</h1>
                                    </div>
                                    {items.filter(item => item.shelf_id === shelf.value).map(filteredItem => (
                                        <div className={`${style.productsBox}`}>
                                            <div className={`${style.productsName}`} onClick={() => handleProductEdit(filteredItem.id)}>{filteredItem.name}</div>
                                            <div className={`${style.productsPrice}`}>{filteredItem.price}</div>
                                            <div className={`${style.productsCount}`}>{filteredItem.count}</div>
                                                <img className={`${style.shelfImage}`} src={filteredItem.image_url}></img>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className={`${style.productsWrap}`}>
                    <h1 className={`${style.h2}`}>Products</h1>
                    <div className={`${style.products}`}>
                        {items.map(item => (
                            <div className={`${style.productsBox}`}>
                                <div className={`${style.productsName}`} onClick={() => handleProductEdit(item.id)}>{item.name}</div>
                                <div className={`${style.productsPrice}`}>{item.price}</div>
                                <div className={`${style.productsCount}`}>{item.count}</div>
                                <div>
                                    <img className={`${style.productsImage}`} src={item.image_url}></img>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && editProduct && (
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={`${style.modal}`}>
                    <form onSubmit={handleEditSubmit} className={`${style.modalForm}`}>
                        <h2>{editProduct.name}</h2>
                        <div className={`${style.row}`}>
                            <label>Shelf ID:</label>
                            <input type="number" className={`${style.input}`} value={editProduct.shelf_id || 0} onChange={(e) => setEditProduct({...editProduct, shelf_id: e.target.value})} />
                        </div>
                        <div className={`${style.row}`}>
                            <label>Price:</label>
                            <input type="number" className={`${style.input}`} value={editProduct.price} onChange={(e) => setEditProduct({...editProduct, price: e.target.value})} />
                        </div>
                        <div className={`${style.row}`}>
                            <label>Count:</label>
                            <input type="number" className={`${style.input}`} value={editProduct.count} onChange={(e) => setEditProduct({...editProduct, count: e.target.value})} />
                        </div>
                        <input type="submit" className={`${style.but1}`} value="Submit" />
                    </form>
                </Modal>
            )}
            {isModalOpen && editItem && (
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={`${style.modal}`}>
                    {editItem.map((item, index) => (
                        <form key={index} onSubmit={(e) => handleEditSubmit(e, item.id)} className={`${style.modalForm}`}>
                            <h2>{item.name}</h2>
                            <div className={`${style.row}`}>
                                <label>Shelf ID:</label>
                                <input type="number" className={`${style.input}`} value={item.shelf_id} onChange={(e) => setEditItem(editItem.map((it, idx) => idx === index ? {...it, shelf_id: e.target.value} : it))} />
                            </div>
                            <div className={`${style.row}`}>
                                <label>Price:</label>
                                <input type="number" className={`${style.input}`} value={item.price} onChange={(e) => setEditItem(editItem.map((it, idx) => idx === index ? {...it, price: e.target.value} : it))} />
                            </div>
                            <div className={`${style.row}`}>
                                <label>Count:</label>
                                <input type="number" className={`${style.input}`} value={item.count} onChange={(e) => setEditItem(editItem.map((it, idx) => idx === index ? {...it, count: e.target.value} : it))} />
                            </div>
                            <input type="submit" className={`${style.but1}`} value="Submit" />
                        </form>
                    ))}
                    <button className={`${style.butDel}`} onClick={() => handleDeleteShelf(editItem[0].shelf_id)}>Delete Shelf</button>
                </Modal>
            )}
            {isConfirmModalOpen && (
                <Modal isOpen={isConfirmModalOpen} onRequestClose={() => setIsConfirmModalOpen(false)} className={`${style.modalDel}`}>
                    <h2>Are you sure you want to delete this shelf?</h2>
                    <div className={`${style.modalRow}`}>
                        <button className={`${style.butDel}`} onClick={() => handleConfirmDelete(editItem[0].shelf_id)}>Confirm</button>
                        <button className={`${style.butDec}`} onClick={() => setIsConfirmModalOpen(false)}>Decline</button>
                    </div>
                </Modal>
            )}
        </div>
    )
  }  
export default Storage;
    
