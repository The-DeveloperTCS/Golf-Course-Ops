// CardPaymentPopup.js
import React, { useState } from "react";
import "../../style/CardPaymentPopup.css";
import card from "../../../assets/images/CARD.jpg";

const CardPaymentPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content3">
        <div className="card-image">
          <img src={card} alt="Card" />
          <h2>Pay with card</h2>
        </div>
        <form className="card-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardHolder">Card Holder</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiration Date</label>
            <div className="expiry-cvv">
              <select id="expiryMonth" name="expiryMonth">
                <option value="01">01</option>
                <option value="02">02</option>
                {/* More months */}
              </select>
              <select id="expiryYear" name="expiryYear">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                {/* More years */}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" placeholder="123" />
          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
        <button className="close-button2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CardPaymentPopup;
