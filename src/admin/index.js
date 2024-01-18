import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from "../styles/admin.module.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        axios.get('/users')
            .then(response => {
                if (Array.isArray(response.data.users)) {
                    // Store the passwords along with the users
                    const usersWithPasswords = response.data.users.map(user => ({
                        ...user,
                        password: user.password,  // Assuming the password is returned when fetching the users
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
        const updatedPrivilage = Number(event.target.value); // Convert to number

        // Update the user with the current username, password, and the new privilege
        axios.put(`/users/${user.id}`, {
            password: user.password,  // Use the stored password
            privilage: updatedPrivilage
        })
        .then(response => {
            console.log('User updated:', response.data);
            setSubmitMessage('User updated successfully!');
            // You might want to update your users list here
        })
        .catch(error => {
            console.error('Error updating user:', error);
            setSubmitMessage('Error updating user.');
        });
    }

    return (
        <div className={style.main}>
            <h2>Workers</h2>
            <table>
                <tr>
                    <th>Name</th>
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
            <p>{submitMessage}</p>
        </div>
    );
}

export default Admin;
