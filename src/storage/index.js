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
    const [selectedItem, setSelectedItem] = useState(null);
    const [editShelfId, setEditShelfId] = useState(null);
    const [isConfirmItemModalOpen, setIsConfirmItemModalOpen] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
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
    const customStyle1 = {
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
        const productsToEdit = items.filter(item => item.shelf_id === shelfId);
        setEditProduct(productsToEdit); 
        setSelectedItem(null);
        setEditShelfId(shelfId); // set the shelfId here
        openModal();
    };
    const handleProductEdit = (itemId) => {
        const itemToEdit = items.find(item => item.id === itemId);
        setSelectedItem([itemToEdit]);
        setEditItem([itemToEdit]); // set editItem here
        openModal();
    };
    const handleEditSubmit = (event, id) => {
        event.preventDefault();
        if (!editProduct || editProduct.length === 0) {
            console.error('editProduct is null or empty');
            return;
        }
        const updatedProduct = editProduct[0];
        axios.put(`/items/${id}`, updatedProduct)
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
    const handleDeleteShelf = (shelfId, hasItems) => {
        console.log(`handleDeleteShelf called with shelfId: ${shelfId}`);
        setIsConfirmModalOpen(true);
        if (!hasItems) {
            setEditShelfId(shelfId); // set the editShelfId here if the shelf has no items
        } else {
            setSelectedShelf(shelfId); // set the selected shelf id here if the shelf has items
        }
    };
    const handleConfirmDelete = () => {
        if (editShelfId === null) {
            console.error('No shelf selected for deletion');
            return;
        }
        axios.delete(`/shelf/${editShelfId}`)
            .then(response => {
                console.log(response);
                setIsConfirmModalOpen(false);
                setItems(items.map(item => item.shelf_id === editShelfId ? {...item, shelf_id: 0} : item));
                setEditShelfId(null); // reset the shelfId after deletion
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    const handleDeleteItem = (itemId) => {
        setIsConfirmItemModalOpen(true);
        setEditItemId(itemId); // set the itemId here
    };
    const handleConfirmItemDelete = () => {
        if (editItemId === null) {
            console.error('No item selected for deletion');
            return;
        }
        axios.delete(`/items/${editItemId}`)
            .then(response => {
                console.log(response);
                setIsConfirmItemModalOpen(false);
                setItems(items.filter(item => item.id !== editItemId));
                setEditItemId(null); // reset the itemId after deletion
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
                    <input type="text" className={`${style.input1}`} placeholder="Enter shelf name" value={newShelfName} onChange={(e) => setNewShelfName(e.target.value)} />
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
                                    <div className={`${style.productsContainer}`}>
                                        {items.filter(item => item.shelf_id === shelf.value).map(filteredItem => (
                                            <div className={`${style.productsBox}`}>
                                                <div className={`${style.productsName}`} onClick={(e) => {e.stopPropagation(); handleProductEdit(filteredItem.id);}}>{filteredItem.name}</div>
                                                <div className={`${style.productsPrice}`}>{filteredItem.price}</div>
                                                <div className={`${style.productsCount}`}>{filteredItem.count}</div>
                                                <img className={`${style.shelfImage}`} src={filteredItem.image_url}></img>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                        </div>
                    </div>
                    <div className={`${style.productsWrap}`}>
                        <h1 className={`${style.h2}`}>Products</h1>
                        <div className={`${style.products}`}>
                            {items.map(item => (
                                <div className={`${style.productsBox}`} onClick={() => handleProductEdit(item.id)}>
                                    <div className={`${style.productsName}`}>{item.name}</div>
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
                        {editProduct.map((product, index) => (
                            <form key={index} onSubmit={(e) => handleEditSubmit(e, product.id)} className={`${style.modalForm}`}>
                                <h2>{product.name}</h2>
                                <div className={`${style.row}`}>
                                    <label>Shelf:</label>
                                    <Select 
                                        className={`${style.dropdown}`}
                                        options={shelves}
                                        isSearchable
                                        placeholder="Choose shelf"
                                        styles={customStyle1}
                                        filterOption={filterOption}
                                        value={shelves.find(option => option.value === product.shelf_id)}
                                        onChange={(option) => setEditProduct(editProduct.map((it, idx) => idx === index ? {...it, shelf_id: option.value} : it))}
                                    />
                                </div>
                                <div className={`${style.row}`}>
                                    <label>Price:</label>
                                    <input type="number" className={`${style.input}`} value={product.price} onChange={(e) => setEditProduct(editProduct.map((it, idx) => idx === index ? {...it, price: e.target.value} : it))} />
                                </div>
                                <div className={`${style.row}`}>
                                    <label>Count:</label>
                                    <input type="number" className={`${style.input}`} value={product.count} onChange={(e) => setEditProduct(editProduct.map((it, idx) => idx === index ? {...it, count: e.target.value} : it))} />
                                </div>
                                <input type="submit" className={`${style.but1}`} value="Submit" />
                            </form>
                        ))}
                            <button className={`${style.butDel}`} onClick={() => {
                                if (editProduct && editProduct.length > 0 && editProduct[0].shelf_id) {
                                    handleDeleteShelf(editProduct[0].shelf_id, true)
                                } else if (selectedItem && selectedItem.length > 0 && selectedItem[0].shelf_id) {
                                    handleDeleteShelf(selectedItem[0].shelf_id, true)
                                } else {
                                    handleDeleteShelf(editShelfId, false);
                                }
                            }}>Delete Shelf</button>
                    </Modal>
                )}
                    {isConfirmModalOpen && (
                        <Modal isOpen={isConfirmModalOpen} onRequestClose={() => setIsConfirmModalOpen(false)} className={`${style.modalDel}`}>
                            <h2>Are you sure you want to delete this shelf?</h2>
                            <div className={`${style.modalRow}`}>
                                <button className={`${style.butDel}`} onClick={() => {
                                    if (editShelfId !== null) {
                                        handleConfirmDelete(editShelfId)
                                    } else {
                                        console.error('No shelf selected for deletion');
                                    }
                                }}>Confirm</button>
                                <button className={`${style.butDec}`} onClick={() => setIsConfirmModalOpen(false)}>Decline</button>
                            </div>
                        </Modal>
                    )}
                {isModalOpen && selectedItem && (
                    <Modal isOpen={isModalOpen} onRequestClose={closeModal} className={`${style.modal}`}>
                        {selectedItem.map((item, index) => (
                            <form key={index} onSubmit={(e) => handleEditSubmit(e, item.id)} className={`${style.modalForm}`}>
                                <h2>{item.name}</h2>
                                <div className={`${style.row}`}>
                                    <label>Shelf:</label>
                                    <Select 
                                        className={`${style.dropdown}`}
                                        options={shelves}
                                        isSearchable
                                        placeholder="Choose shelf"
                                        styles={customStyle}
                                        filterOption={filterOption}
                                        value={shelves.find(option => option.value === item.shelf_id)}
                                        onChange={(option) => setSelectedItem(selectedItem.map((it, idx) => idx === index ? {...it, shelf_id: option.value} : it))}
                                    />
                                </div>
                                <div className={`${style.row}`}>
                                    <label>Price:</label>
                                    <input type="number" className={`${style.input}`} value={item.price} onChange={(e) => setSelectedItem(selectedItem.map((it, idx) => idx === index ? {...it, price: e.target.value} : it))} />
                                </div>
                                <div className={`${style.row}`}>
                                    <label>Count:</label>
                                    <input type="number" className={`${style.input}`} value={item.count} onChange={(e) => setSelectedItem(selectedItem.map((it, idx) => idx === index ? {...it, count: e.target.value} : it))} />
                                </div>
                                <input type="submit" className={`${style.but1}`} value="Submit" />
                            </form>
                        ))}
                        <button className={`${style.butDel}`} onClick={() => {
                            if (editItemId !== null) {
                                handleDeleteItem(editItemId)
                            } else {
                                console.error('No item selected for deletion');
                            }
                        }}>Delete item</button>
                    </Modal>
                )}

                {isConfirmItemModalOpen && (
                    <Modal isOpen={isConfirmItemModalOpen} onRequestClose={() => setIsConfirmItemModalOpen(false)} className={`${style.modalDel}`}>
                        <h2>Are you sure you want to delete this item?</h2>
                        <div className={`${style.modalRow}`}>
                            <button className={`${style.butDel}`} onClick={handleConfirmItemDelete}>Confirm</button>
                            <button className={`${style.butDec}`} onClick={() => setIsConfirmItemModalOpen(false)}>Decline</button>
                        </div>
                    </Modal>
                )}

        </div>
    )
  }  
export default Storage;
    
