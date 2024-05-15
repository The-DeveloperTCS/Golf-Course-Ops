import React, { useState } from "react";
import "../../style/AdminDashboardItems.css";
import { IoIosSearch } from "react-icons/io";
import AdminSidebar1 from "./AdminSidebar1";
import { MdCancel } from "react-icons/md";

const dummyData = [
  { name: "Green Fees", price: "$34", qty: 2, discount: "-" },
  { name: "Balls - dozen", price: "$34", qty: 2, discount: "-" },
  { name: "tees / h2", price: "$34", qty: 2, discount: "-" },
];

export default function AdminDashboardItems() {
  const [data, setData] = useState(dummyData);

  const handleDelete = (index) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

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
                      <MdCancel onClick={() => handleDelete(0)} />
                      <input type="checkbox" id="chk" />
                      <label for="chk"></label>
                    </th>
                    <th>#Items</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>DISC%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="th-cross-btn">
                        <MdCancel onClick={() => handleDelete(index)} />
                        <input type="checkbox" id="chk" />
                        <label for="chk"></label>
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
        </div>
        <div className="Dashboard-Items-right">
          <AdminSidebar1 />
        </div>
      </div>
    </div>
  );
}
