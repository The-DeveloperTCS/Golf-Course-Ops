import React, { useState } from "react";
import "../../style/AdminDashboardItems.css";
import { IoIosSearch } from "react-icons/io";
import AdminSidebar1 from "./AdminSidebar1";
import { MdCancel } from "react-icons/md";
import PaymentPopup from "../PaymentPopup";
import CreditPopup from "../CreditPopup";

const dummyData = [
  { name: "Green Fees", price: "$34", qty: 2, discount: "-" },
  { name: "Balls - dozen", price: "$34", qty: 2, discount: "-" },
  { name: "tees / h2", price: "$34", qty: 2, discount: "-" },
];

const AdminDashboardItems = () => {
  const [data, setData] = useState(dummyData);
  const [buttonColors, setButtonColors] = useState([
    "rgb(81, 16, 186)",
    "rgb(81, 16, 186)",
    "rgb(81, 16, 186)",
  ]);

  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [isCreditPopupOpen, setCreditPopupOpen] = useState(false);

  const togglePaymentPopup = () => {
    setPaymentPopupOpen(!isPaymentPopupOpen);
  };

  const toggleCreditPopup = () => {
    setCreditPopupOpen(!isCreditPopupOpen);
  };

  const handleDelete = (index) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  const handleButtonClick = (index) => {
    const newColors = buttonColors.map((color, i) =>
      i === index ? "#0CD374" : "#4365CF"
    );
    setButtonColors(newColors);

    if (index === 0) {
      togglePaymentPopup(); // Open PaymentPopup for Cash button
    } else if (index === 1) {
      toggleCreditPopup(); // Open CreditPopup for Credit Card button
    }
  };

  return (
    <div
      className="adminDashboardItems"
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: "#EEF0F6",
      }}
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
                      <label htmlFor="chk"></label>
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
                        <label htmlFor="chk"></label>
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
          <div className="admin-down-btns">
            <div className="for-search">
              <input type="text" placeholder="Search customers" />
              <p>Add customers to sale</p>
            </div>
            <div className="cash-btn">
              <button
                style={{ backgroundColor: buttonColors[0] }}
                onClick={() => handleButtonClick(0)}
              >
                Cash
              </button>
              <button
                style={{ backgroundColor: buttonColors[1] }}
                onClick={() => handleButtonClick(1)}
              >
                Credit Card
              </button>
              <button
                style={{ backgroundColor: buttonColors[2] }}
                onClick={() => handleButtonClick(2)}
              >
                Pay Now
              </button>
            </div>
            <div className="cash-in-nbr">
              <h4>Total Due:</h4>
              <h3>$99.6</h3>
            </div>
          </div>
        </div>
        <div className="Dashboard-Items-right">
          <AdminSidebar1 />
        </div>
      </div>

      {/* Render PaymentPopup if open */}
      {isPaymentPopupOpen && (
        <PaymentPopup
          isOpen={isPaymentPopupOpen}
          togglePopup={togglePaymentPopup}
        />
      )}

      {/* Render CreditPopup if open */}
      {isCreditPopupOpen && (
        <CreditPopup
          isOpen={isCreditPopupOpen}
          togglePopup={toggleCreditPopup}
        />
      )}
    </div>
  );
};

export default AdminDashboardItems;
