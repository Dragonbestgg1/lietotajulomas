import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import style from "../styles/admin.module.css";
import axios from 'axios';

function Admin() {
    const loggedInUserToken = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [submitMessage, setSubmitMessage] = useState('');
    const [newUser, setNewUser] = useState({username: '', password: '', privilage: 0});
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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
    const roleToPrivilage = (role) => {
        switch(role) {
            case 'Admin':
                return 2;
            case 'Warehouse Worker':
                return 1;
            case 'Shelf Sorter':
                return 0;
            default:
                return -1;
        }
    }
    
    const handlePrivilageChange = (event, user) => {
        if (user.token === loggedInUserToken) {
            setSubmitMessage('You cannot change your own privilege.');
            return;
        }
    
        const updatedPrivilage = Number(event.target.value);  // directly use the number
    
        const data = {
            password: user.password,  // send the existing password
            privilage: updatedPrivilage  // send the privilege number
        };
    
        console.log('Sending request with data:', data);  // print the data being sent
    
        axios.put(`/users/${user.id}`, data)
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
            // Fetch the updated list of users
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
            setShowModal(false);
        })
        .catch(error => {
            console.error('Error adding user:', error);
            setSubmitMessage('Error adding user.');
        });
    }

    const handleDeleteUser = (userId, privilage) => {
        if (privilage === 2) {
            setSubmitMessage('Admin users cannot be deleted.');
            return;
        }

        setUserToDelete(userId);
    }

    const confirmDeleteUser = () => {
        axios.delete(`/users/${userToDelete}`)
        .then(response => {
            console.log('User deleted:', response.data);
            setSubmitMessage('User deleted successfully!');
            setUsers(users.filter(user => user.id !== userToDelete));
            setUserToDelete(null); // Reset the userToDelete state
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            setSubmitMessage('Error deleting user.');
        });
    }

    return (
        <div className={style.main}>
            <h2>Workers</h2>
            <table>
                <tr>
                    <th className={`${style.th}`}>Name
                        <button onClick={() => setShowModal(!showModal)}>+</button>
                    </th>
                    <th>Role</th>
                </tr>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td className={`${style.th}`}>
                            <select value={user.privilage} onChange={(event) => handlePrivilageChange(event, user)}>
                                <option value={user.privilage}>{getRole(user.privilage)}</option>
                                {user.privilage !== 2 && <option value="2">Admin</option>}
                                {user.privilage !== 1 && <option value="1">Warehouse Worker</option>}
                                {user.privilage !== 0 && <option value="0">Shelf Sorter</option>}
                            </select>
                            <div className={`${style.column}`}>
                                <button onClick={() => handleDeleteUser(user.id, user.privilage)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
            {showModal && (
                <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                    <input type="text" value={newUser.username} className={`${style.input}`} onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="Enter new user name" />
                    <input type="password" value={newUser.password} className={`${style.input}`} onChange={(e) => setNewUser({...newUser, password: e.target.value})} placeholder="Enter new user password" />
                    <select value={newUser.privilage} onChange={(e) => setNewUser({...newUser, privilage: Number(e.target.value)})}>
                        <option value="2">Admin</option>
                        <option value="1">Warehouse Worker</option>
                        <option value="0">Shelf Sorter</option>
                    </select>
                    <button onClick={handleAddUser}>Add User</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </Modal>
            )}
            {userToDelete && (
                <Modal isOpen={!!userToDelete} onRequestClose={() => setUserToDelete(null)}>
                    <h2>Are you sure you want to delete this user?</h2>
                    <button onClick={confirmDeleteUser}>Yes</button>
                    <button onClick={() => setUserToDelete(null)}>No</button>
                </Modal>
            )}
            <div>{submitMessage}</div>
        </div>
    );
}

export default Admin;
