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
          //console.log(response.data);
          
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
          //console.error('Error fetching items:', error);
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
        <div>
          <div>
            <h1>Reports</h1>
          </div>
          <div>
            <label>
              Start Date:
              <div>
                <input type="date" value={startDate} onChange={handleChangeStartDate} />
              </div>
            </label>
          </div>
          <div>
            <label>
              End Date:
              <div>
                <input type="date" value={endDate} onChange={handleChangeEndDate} />
              </div>
            </label>
          </div>
        </div>

        {/* Display Items Table */}
        <div>
          <h2>Items Table</h2>
          <div className={style.table}>
            {/* Table header */}
            <div>
              <div>ID</div>
              <div>Name</div>
              <div>Price</div>
              <div>Total</div>
              <div>Image</div>
            </div>
            {/* Table body */}
            <div>
              {items && Object.values(items).map(item => (
                <div key={item.id}>
                  <div>{item.id}</div>
                  <div>{item.name}</div>
                  <div>{item.total}</div>
                  <div>{item.price}</div>
                  <div>
                    <img src={item.image_url} alt={item.name} className={style.image} />
                  </div>
                </div>
              ))}    
            </div>
          </div>
          {/* Total cost */}
          <div>Total Cost: {priceTotal}</div>
        </div>

        {/* Display Orders Table */}
        <div>
          <h2>Orders Table</h2>
          <div className={style.table}>
            {/* Table header */}
            <div>
              <div>ID</div>
              <div>Item ID</div>
              <div>Postal Code</div>
              <div>Country</div>
              <div>City</div>
              <div>Delivered</div>
            </div>
            {/* Table body */}
            <div>
              {orders.map(order => (
                <div key={order.id}>
                  <div>{order.id}</div>
                  <div>{order.item_id}</div>
                  <div>{order.postal_code}</div>
                  <div>{order.country}</div>
                  <div>{order.city}</div>
                  <div>{order.delivered ? 'Yes' : 'No'}</div>
                </div>
              ))}
            </div>
            <h2>Company Summary Report</h2>
            {/* Table header */}
            <div>
              <div>Company Name</div>
              <div>Total Quantity</div>
              <div>Total Cost</div>
            </div>
            {/* Table body */}
            <div>
              {companyReport.map(company => (
                <div key={company.companyName}>
                  <div>{company.companyName}</div>
                  <div>{company.totalQuantity}</div>
                  <div>{company.totalCost}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Total price and delivered */}
          <div>Total Price: {priceTotal}</div>
          <div>Total Delivered: {deliveredTotal}</div>
          <button onClick={generatePdf}>Generate PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Reports;