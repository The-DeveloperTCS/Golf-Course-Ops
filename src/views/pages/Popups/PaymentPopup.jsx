// PaymentPopup.js
import React, { useState } from "react";
import "../../style/PaymentPopup.css";
import { connect, useDispatch } from "react-redux";
import { history } from "redux/store";
import { transationOfTeeSheet } from "redux/transaction/service";
import Loader from "components/loader/Loader";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";

const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failure } = NotificationActions;

const PaymentPopup = ({ isOpen, salesData, setPaymentPopupOpen }, props) => {
  const { startLoader, endLoader, loader, successWithTimeout, failure } = props;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(Number(salesData.total));
  const [fixedAmount, setFixedAmount] = useState(Number(salesData.total));

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
    setAmount(0);
  };

  const onTransaction = () => {
    dispatch(loaderActions.startLoader(true));
    const payLoad = { ...salesData };
    payLoad.total = amount;
    payLoad.pay_mode = "paid";
    payLoad.payMethod = "cash";
    payLoad.pay_method = "cash";
    transationOfTeeSheet(payLoad)
      .then((res) => {
        dispatch(loaderActions.endLoader(false));
        dispatch(
          NotificationActions.successWithTimeout(
            "Transaction complete successfully"
          )
        );
        history.push("/tee-sheet/list");
      })
      .catch((err) => {
        console.log(err, "error");
        dispatch(loaderActions.endLoader(false));
        dispatch(
          NotificationActions.failureWithTimeout(err.response.data.message)
        );
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="popup1">
      <div className="popup-content1">
        <h2>Pay With Cash</h2>
        <div className="popup-main">
          <div className="popup-left">
            <button
              className="x-btn"
              onClick={() => setPaymentPopupOpen(false)}
            >
              &times;
            </button>
            <div className="suggested-amounts">
              <button onClick={() => handleAmountClick(fixedAmount + 3)}>
                ${fixedAmount + 3}
              </button>
              <button onClick={() => handleAmountClick(fixedAmount + 6)}>
                ${fixedAmount + 6}
              </button>
              <button onClick={() => handleAmountClick(fixedAmount + 8)}>
                ${fixedAmount + 8}
              </button>
              <button onClick={() => handleAmountClick(fixedAmount + 9)}>
                ${fixedAmount + 9}
              </button>
            </div>
          </div>
          <div className="popup-right">
            <div className="manual-entry">
              <input
                type="number"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
              />
              <button
                className="pay-btn1"
                style={{ backgroundColor: "#0CD374" }}
                onClick={() => onTransaction()}
              >
                Pay
              </button>
            </div>
            <div className="keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleKeypadClick(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                style={{ backgroundColor: "#E92A2A" }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="total-due">
          <h3>Total Due:</h3>
          <h3> ${Number(salesData.total)}</h3>
        </div>
        <div className="customer-note">
          <textarea placeholder="Customer Note"></textarea>
        </div>
        <button
          className="close-btn"
          onClick={() => setPaymentPopupOpen(false)}
          style={{ backgroundColor: "#E92A2A" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(PaymentPopup);
