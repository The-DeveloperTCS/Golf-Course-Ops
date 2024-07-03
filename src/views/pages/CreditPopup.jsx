// CreditPopup.js
import React from "react";
import "../style/CreditPopup.css";

const CreditPopup = ({ isOpen, togglePopup }) => {
  return (
    <div>
      {isOpen && (
        <div className="credit-popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>Credit Card Information</h2>
            <p>Enter your credit card details here.</p>
            <button className="close-button" onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditPopup;
