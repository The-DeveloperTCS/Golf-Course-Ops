// CreditPopup.js
import React from "react";
import "../style/CreditPopup.css";

const CreditPopup = ({ isOpen, togglePopup }) => {
  return (
    <div>
      {isOpen && (
        <div className="credit-popup">
          <div className="credit-content">
            <div className="credit-buttons">
              <button>Cash</button>
              <button>Check</button>
              <button>Credit Card</button>
              <button>Git Card</button>
              <button>Rain Check</button>
              <button>Punch Card</button>
              <button>Coupon</button>
              <button>Loyalty Points</button>
              <button>Member Blance</button>
              <button>Customer Credit</button>
              <button>Campaign Points</button>
            </div>
            <div className="credit-price1">
              <label for="inputField">Amount</label>

              <div className="credit-price">
                <span>$</span>

                <input type="text" id="inputField" name="inputField" />
              </div>
              <div className="pymet-"></div>
            </div>
            {/* <button className="close-button" onClick={togglePopup}>
                            Close
                        </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditPopup;
