import React, { useState, useEffect } from "react";
import axios from 'axios';
import style from "../styles/admin.module.css";

function Admin() {
    const [users, setUsers] = useState([]);

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

    const getRole = (privilege) => {
        switch(privilege) {
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
                        <td>{getRole(user.privilage)}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Admin;
