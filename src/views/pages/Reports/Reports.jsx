import React from "react";
import { useState, useEffect } from "react";
import "../../style/Reports.css";
import BasicDatePicker from "../Reports/BasicDatePicker";
import { Clock } from "@mui/x-date-pickers/TimeClock/Clock";
import ClockInTabel from "../clockInClockOut/ClockInTabel";

function Reports() {
  const [activeItem, setActiveItem] = useState(null);
  const items = [
    { label: "Employee Z out" },
    { label: "sales" },
    { label: "invoices" },
    { label: "register logs" },
    { label: "GL code report" },
    { label: "Z out" },
    { label: "register logs" },
    { label: "GL code report" },
  ];

  const columnsA = [
    {
      width: 80,
      label: "Sale ID",
      dataKey: "saleID",
    },
    {
      width: 80,
      label: "Price",
      dataKey: "price",
      numeric: false,
    },
    {
      width: 50,
      label: "Items",
      dataKey: "items",
      numeric: false,
    },
    {
      width: 50,
      label: "Sold to",
      dataKey: "soldto",
      numeric: false,
    },
    {
      width: 50,
      label: "Subtotal",
      dataKey: "subtotal",
      numeric: false,
    },
    {
      width: 50,
      label: "Total",
      dataKey: "total",
      numeric: false,
    },
    {
      width: 50,
      label: "Tax",
      dataKey: "tax",
      numeric: false,
    },
    {
      width: 50,
      label: "Payment type",
      dataKey: "paymenttype",
      numeric: false,
    },
  ];

  const handleClick = (index) => {
    setActiveItem(index);
  };

  const dataForComponentB = [
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
    {
      id: 1,
      saleID: "564564",
      price: "23 May 2023",
      items: "02",
      soldto: "David",
      subtotal: "50$",
      total: "50$",
      tax: "0$",
      paymenttype: "cash",
    },
  ];

  return (
    <div className="Reports-main">
      <div className="reports-content">
        <div className="main-text-support">
          {" "}
          <p>Sales</p>
        </div>
        <div className="Sales-input-main">
          <div className="input-1">
            {" "}
            <label for="saleID">Sale ID:</label>
            <input type="text" id="saleID" />
          </div>

          <div className="input-2">
            {" "}
            <label for="dateRange">Date Range:</label>
            <BasicDatePicker label="From" id="fromDate" placeholder="From" />
          </div>

          <div className="input-2">
            <label for="dateRange">Date Range:</label>
            <BasicDatePicker label="To" id="toDate" placeholder="To" />
          </div>
          <div className="input-1">
            <select id="courses">
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
              <option value="course3">Course 3</option>
            </select>
          </div>
          <div className="input-1">
            <label for="employee">Employee:</label>
            <input type="text" id="employee" />
          </div>
        </div>
        <div className="Sales-input-main">
          <div className="input-1">
            <label for="courses">terminal</label>
            <select id="courses">
              <option value="course1">All</option>
              <option value="course2">terminal 2</option>
              <option value="course3">terminal 3</option>
            </select>
          </div>
          <div className="input-1">
            <label for="courses">Department</label>
            <select id="courses">
              <option value="course1">All</option>
              <option value="course2">terminal 2</option>
              <option value="course3">terminal 3</option>
            </select>
          </div>
          <div className="input-1">
            <label for="courses">sale type</label>
            <select id="courses">
              <option value="course1">All</option>
              <option value="course2">terminal 2</option>
              <option value="course3">terminal 3</option>
            </select>
          </div>
          <div className="input-1">
            <select id="courses">
              <option value="course1">All</option>
              <option value="course2">terminal 2</option>
              <option value="course3">terminal 3</option>
            </select>
          </div>
          <div className="input-1">
            <label for="courses">pay type</label>
            <select id="courses">
              <option value="course1">All</option>
              <option value="course2">terminal 2</option>
              <option value="course3">terminal 3</option>
            </select>
          </div>
          <div className="Run-sale-btn">
            <button>Run</button>
          </div>
        </div>
        <ClockInTabel data={dataForComponentB} columns={columnsA} />
      </div>
      <div id="accordian">
        <div className="grerrn-screen-acr">
          <p>New Reporting</p>
          <span>+</span>
        </div>
        <ul className="show-dropdown main-navbar">
          <div className="selector-active" style={{ top: activeItem * 45 }}>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
          {items.map((item, index) => (
            <li
              key={index}
              className={activeItem === index ? "active" : ""}
              onClick={() => handleClick(index)}
            >
              <a href="javascript:void(0);">
                <i className={item.icon}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reports;
