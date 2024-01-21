import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from "../styles/admin.module.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [submitMessage, setSubmitMessage] = useState('');
    const [newUser, setNewUser] = useState({username: '', password: '', privilage: 0});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                if (Array.isArray(response.data.users)) {
                    const usersWithPasswords = response.data.users.map(user => ({
                        ...user,
                        password: user.password, 
                    }));
                    setUsers(usersWithPasswords);
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

    const handlePrivilageChange = (event, user) => {
        const updatedPrivilage = Number(event.target.value);

        axios.put(`/users/${user.id}`, {
            password: user.password,  
            privilage: updatedPrivilage
        })
        .then(response => {
            console.log('User updated:', response.data);
            setSubmitMessage('User updated successfully!');
        })
        .catch(error => {
            console.error('Error updating user:', error);
            setSubmitMessage('Error updating user.');
        });
    }

    const handleAddUser = () => {
        if (!newUser.username || !newUser.password) {
            setSubmitMessage('Please fill in all fields.');
            return;
        }

        axios.post('/users', newUser)
        .then(response => {
            console.log('User added:', response.data);
            setSubmitMessage('User added successfully!');
            setUsers([...users, response.data]);
            setShowModal(false);
        })
        .catch(error => {
            console.error('Error adding user:', error);
            setSubmitMessage('Error adding user.');
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
                        <td>
                            <select value={user.privilage} onChange={(event) => handlePrivilageChange(event, user)}>
                                <option value={user.privilage}>{getRole(user.privilage)}</option>
                                {user.privilage !== 2 && <option value="2">Admin</option>}
                                {user.privilage !== 1 && <option value="1">Warehouse Worker</option>}
                                {user.privilage !== 0 && <option value="0">Shelf Sorter</option>}
                            </select>
                        </td>
                    </tr>
                ))}
            </table>
            {showModal && (
                <div className={style.modal}>
                    <h2>Add User</h2>
                    <input type="text" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="Enter new user name" />
                    <input type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} placeholder="Enter password" />
                    <select value={newUser.privilage} onChange={(e) => setNewUser({...newUser, privilage: Number(e.target.value)})}>
                        <option value="2">Admin</option>
                        <option value="1">Warehouse Worker</option>
                        <option value="0">Shelf Sorter</option>
                    </select>
                    <button onClick={handleAddUser}>Submit</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
            <p>{submitMessage}</p>
        </div>
    );
}

export default Admin;
