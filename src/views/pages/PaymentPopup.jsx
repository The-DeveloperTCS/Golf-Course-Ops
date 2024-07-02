import React, { useState } from "react";
import "../style/PaymentPopup.css";

const PaymentPopup = ({ onClose }) => {
  const [amount, setAmount] = useState("639.90");

  const handleAmountClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleKeypadClick = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  const handleClear = () => {
    setAmount("");
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Pay With Cash</h2>
        <div className="popup-main">
          <div className="popup-left">
            {/* Close button with "X" */}
            <button className="x-btn" onClick={onClose}>
              &times;
            </button>

            <div className="suggested-amounts">
              <button onClick={() => handleAmountClick("639.90")}>
                $639.90
              </button>
              <button onClick={() => handleAmountClick("640.00")}>
                $640.00
              </button>
              <button onClick={() => handleAmountClick("650.00")}>
                $650.00
              </button>
              <button onClick={() => handleAmountClick("700.00")}>
                $700.00
              </button>
            </div>
          </div>
          <div className="popup-right">
            <div className="keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleKeypadClick(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button onClick={handleClear}>Clear</button>
            </div>
          </div>
        </div>
        <div className="total-due">
          <h3>Total Due:</h3>
          <h3> ${amount}</h3>
        </div>
        <div className="customer-note">
          <textarea placeholder="Customer Note"></textarea>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <div className="manual-entry">
          <input
            type="text"
            value={amount}
            onChange={handleInputChange}
            placeholder="Enter Amount"
          />
          <button className="pay-btn">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
