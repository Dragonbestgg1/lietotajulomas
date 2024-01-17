import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from "../styles/admin.module.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({username: '', password: '', privilage: 0});
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.log('response.data.users is not an array:', response.data.users);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const getRole = (privilage) => {
        switch(privilage) {
            case 2:
                return 'Admin';
            case 1:
                return 'Warehouse Worker';
            case 0:
                return 'Shelf Sorter';
            default:
                return 'Unknown';
        }
    }

    const handleInputChange = (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newUser.username || !newUser.password) {
            setSubmitMessage('Please fill in all fields.');
            return;
        }
        axios.post('/users', newUser)
            .then(response => {
                console.log('User created:', response.data);
                setSubmitMessage('User submitted successfully!');
                // You might want to update your users list here
            })
            .catch(error => {
                console.error('Error creating user:', error);
                setSubmitMessage('Error submitting user.');
            });
    }

    return (
        <div className={style.main}>
            <h2>Workers</h2>
            <table>
                <tr>
                    <th>Name
                    <button onClick={() => setShowModal(!showModal)}>+</button>
                    </th>
                    <th>Role</th>
                </tr>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{getRole(user.privilage)}</td>
                    </tr>
                ))}
            </table>
            {showModal && (
                <div className={style.modal}>
                    <form className={`${style.modalForm}`} onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="username" onChange={handleInputChange} />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" onChange={handleInputChange} />
                        </label>
                        <label>
                            Privilage:
                            <select name="privilage" onChange={handleInputChange}>
                                <option value="0">Shelf Sorter</option>
                                <option value="1">Warehouse Worker</option>
                                <option value="2">Admin</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <p>{submitMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Admin;
