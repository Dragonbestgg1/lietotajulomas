import React, { useState, useEffect } from "react";
import style from "../styles/reports.module.css";
import axios from 'axios';

function Reports() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [deliveredTotal, setDeliveredTotal] = useState(0);
  const [days, setDays] = useState(7);

  useEffect(() => {
    // Fetch items
    axios.get('/items')
      .then(response => {
        const itemsData = response.data.items;
        setItems(itemsData);
        setPriceTotal(itemsData.total_cost);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });

    // Fetch orders
    axios.get('/orders')
      .then(response => {
        const ordersData = response.data;
        setOrders(ordersData);
        setDeliveredTotal(ordersData.delivered_total);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []); // empty dependency array ensures useEffect runs only once on component mount

  const handleChangeDays = (e) => {
    setDays(e.target.value);
    // Fetch data again based on the selected number of days
    // Add your logic to make the API calls with the specified days parameter
  };

  return (
    <div className={style.reportsContainer}>
      <h1>Reports</h1>
      <label>
        Days before:
        <input type="number" value={days} onChange={handleChangeDays} />
      </label>

      {/* Display Items Table */}
      <div>
        <h2>Items Table</h2>
        <table className={style.table}>
          {/* Table header */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {Object.values(items).map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.image_url} alt={item.name} className={style.image} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total cost */}
        <p>Total Cost: {priceTotal}</p>
      </div>

      {/* Display Orders Table */}
      <div>
        <h2>Orders Table</h2>
        <table className={style.table}>
          {/* Table header */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Item ID</th>
              <th>Postal Code</th>
              <th>Country</th>
              <th>City</th>
              <th>Delivered</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item_id}</td>
                <td>{order.postal_code}</td>
                <td>{order.country}</td>
                <td>{order.city}</td>
                <td>{order.delivered ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total price and delivered */}
        <p>Total Price: {priceTotal}</p>
        <p>Total Delivered: {deliveredTotal}</p>
      </div>
    </div>
  );
}

export default Reports;
