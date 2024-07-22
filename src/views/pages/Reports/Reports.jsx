import React from "react";
import { useState, useEffect } from "react";
import "../../style/Reports.css";
import BasicDatePicker from "../Reports/BasicDatePicker";
import { Clock } from "@mui/x-date-pickers/TimeClock/Clock";
import ClockInTabel from "../clockInClockOut/ClockInTabel";
import { ImCancelCircle } from "react-icons/im";

function Reports() {
  //====================popup
  const [showPopup, setShowPopup] = useState(false);

  const handleRunButtonClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const [activeItem, setActiveItem] = useState(null);
  const handleClick = (index) => {
    setActiveItem(index);
  };
  //====================popup
  // button bg
  const [selectedGroup1, setSelectedGroup1] = useState(null);
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [selectedGroup3, setSelectedGroup3] = useState(null); // Adding selectedGroup3

  const handleColorClick = (value, group) => {
    if (group === 1) {
      setSelectedGroup1(selectedGroup1 === value ? null : value);
    } else if (group === 2) {
      setSelectedGroup2(selectedGroup2 === value ? null : value);
    } else if (group === 3) {
      // Handling selectedGroup3
      setSelectedGroup3(selectedGroup3 === value ? null : value);
    }
  };
  // button bg
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
          {/* =================popup ==============*/}
          <div className="Run-sale-btn">
            <button onClick={handleRunButtonClick}>Run</button>
            <div className={`popup ${showPopup ? "show" : ""}`}>
              <div className="popup-content">
                <div className="Book-time-pop-up">
                  <p>Book Time</p>
                  <span className="close" onClick={handlePopupClose}>
                    {/* &times; */}
                    <ImCancelCircle />
                  </span>
                </div>
                <div className="popup-content-text">
                  <p>
                    Your time, 4:30pm, will be held for 5 minutes. You have 4:33
                    remaining. Please complete the reservation process.
                  </p>
                  <h3>Jester Park Golf Course - JESTER</h3>
                </div>
                <div className="pop-up-input">
                  <div className="form-group">
                    <label htmlFor="date-input">Date</label>
                    <input type="date" id="date-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time-input">Time</label>
                    <input type="time" id="time-input" />
                  </div>
                </div>
                <div className="popup-click-btn">
                  <div className="two-btn-popup">
                    <button
                      style={
                        selectedGroup1 === 9
                          ? { backgroundColor: "#4365CF", color: "white" }
                          : {}
                      }
                      onClick={() => handleColorClick(9, 1)}
                    >
                      9
                    </button>
                    <button
                      style={
                        selectedGroup1 === 18
                          ? { backgroundColor: "#4365CF", color: "white" }
                          : {}
                      }
                      onClick={() => handleColorClick(18, 1)}
                    >
                      18
                    </button>
                  </div>
                  <div className="three-btn-popup">
                    <button
                      style={
                        selectedGroup2 === 2
                          ? { backgroundColor: "#4365CF", color: "white" }
                          : {}
                      }
                      onClick={() => handleColorClick(2, 2)}
                    >
                      2
                    </button>
                    <button
                      style={
                        selectedGroup2 === 3
                          ? { backgroundColor: "#4365CF", color: "white" }
                          : {}
                      }
                      onClick={() => handleColorClick(3, 2)}
                    >
                      3
                    </button>
                    <button
                      style={
                        selectedGroup2 === 4
                          ? { backgroundColor: "#4365CF", color: "white" }
                          : {}
                      }
                      onClick={() => handleColorClick(4, 2)}
                    >
                      4
                    </button>
                  </div>
                </div>
                <div className=" popup-click-btn3" style={{}}>
                  <button
                    style={
                      selectedGroup3 === 5 ? { backgroundColor: "red" } : {}
                    }
                    onClick={() => handleColorClick(5, 3)}
                  >
                    Yes
                  </button>
                  <button
                    style={
                      selectedGroup3 === 6 ? { backgroundColor: "red" } : {}
                    }
                    onClick={() => handleColorClick(6, 3)}
                  >
                    No
                  </button>
                </div>

                <div className="pop-up-btns-save">
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
          {/* =================popup ==============*/}
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
              {/* <a href="javascript:void(0);"> */}
              <i className={item.icon}></i>
              {item.label}
              {/* </a> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reports;
