import React from "react";
import "../../style/AdminDashboardItems.css";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import AdminSidebar1 from "./AdminSidebar1";
import { GiCancel } from "react-icons/gi";

const dummyData = [
  { name: "Green Fees", price: "$34", qty: 2, discount: "-" },
  { name: "Balls - dozen", price: "$34", qty: 2, discount: "-" },
  { name: "tees / h2", price: "$34", qty: 2, discount: "-" },
];

export default function AdminDashboardItems() {
  return (
    <div
      className="adminDashboardItems"
      style={{ width: "100%", padding: "20px", backgroundColor: "#EEF0F6" }}
    >
      <div className="Dashboard-Items-main">
        <div className="Dashboard-Items-left-main">
          <div className="Dashboard-Items-left">
            <div className="item-sale-return-btn">
              <p>Items</p>
              <div className="for-sale-item-btn">
                <button>sale</button>
                <button>return</button>
              </div>
            </div>
            <div className="item-table">
              <table>
                <thead>
                  <tr>
                    <th className="th-cross-btn">
                      <GiCancel />
                      <input type="checkbox" />
                    </th>
                    <th>#Items</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>DISC%</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <GiCancel />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>{item.discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="item-total">
                <p>03 items</p>
                <div className="sub-total-item">
                  <span>sub total</span>
                  <h1>$56.89</h1>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="Dashboard-Items-left2">
            <div className="Items-left2-buttons">
              <div className="search-item">
                <p>Items</p>
                <input type="search" placeholder="search" />
                <IoIosSearch />
              </div>
              <div className="Items-left2-buttons-main">
                <button>Pay now</button>
                <button>credit card</button>
                <button style={{ backgroundColor: "#E92A2A" }}>cash</button>
              </div>
            </div>
            <div
              className=""
              style={{ padding: "25px ", backgroundColor: "white" }}
            ></div>
            <div className="Items-left2-line1">
              <p>Green Fees</p>
            </div>
            <div className="Items-left2-line21">
              <p>Balls - dozen</p>
            </div>
            <div className="Items-left2-line3">
              <p>tees / h2</p>
            </div>
            <div className="Items-left2-line4">
              <p>total due:</p> <h4>$00.00</h4>
            </div>
          </div> */}
        </div>
        <div className="Dashboard-Items-right">
          <AdminSidebar1 />
        </div>
      </div>
    </div>
  );
}
