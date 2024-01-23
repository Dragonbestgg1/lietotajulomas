import React, { useState, useEffect, useRef } from "react";
import style from "../styles/reports.module.css";
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Reports() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [deliveredTotal, setDeliveredTotal] = useState(0);
  const [days, setDays] = useState(7);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyReport, setCompanyReport] = useState([]);
  const pdfRef = useRef();

  
  useEffect(() => {
    if (startDate && endDate) {
      axios.get(`/report?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
          console.log(response.data);
          
          // items
          const itemsData = response.data.items;
          if (itemsData) {
            setItems(itemsData);
            setPriceTotal(itemsData.total_cost);
          }

          // orders
          if (response.data.orders) {
            setOrders(response.data.orders);
            setDeliveredTotal(response.data.delivered_total);

            // Generate company report
            const companyData = {};
            response.data.orders.forEach(order => {
              const companyId = order.company_id;
              if (!companyData[companyId]) {
                companyData[companyId] = {
                  companyName: order.company_name,
                  totalQuantity: 0,
                  totalCost: 0,
                };
              }
              companyData[companyId].totalQuantity += 1; // Assuming each order is one item
              companyData[companyId].totalCost += order.item_price;
            });
            setCompanyReport(Object.values(companyData));
          }
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    }
  }, [startDate, endDate]);

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const generatePdf = () => {
    if (pdfRef.current) {
      html2canvas(pdfRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('report.pdf');
        });
    }
  };

  return (
    <div className={`${style.main}`}>
      <div className={style.reportsContainer} ref={pdfRef}>
        <h1>Reports</h1>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={handleChangeStartDate} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={handleChangeEndDate} />
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
              {items && Object.values(items).map(item => (
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
            <h2>Company Summary Report</h2>
            {/* Table header */}
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Total Quantity</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {companyReport.map(company => (
                <tr key={company.companyName}>
                  <td>{company.companyName}</td>
                  <td>{company.totalQuantity}</td>
                  <td>{company.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Total price and delivered */}
          <p>Total Price: {priceTotal}</p>
          <p>Total Delivered: {deliveredTotal}</p>
          <button onClick={generatePdf}>Generate PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Reports;
