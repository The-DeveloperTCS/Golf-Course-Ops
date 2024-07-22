import React, { useEffect, useState } from "react";
import "../../style/AdminDashboardItems.css";
import { IoIosSearch } from "react-icons/io";
import ItemsSidebar from "./ItemsSidebar";
import { MdCancel } from "react-icons/md";
import PaymentPopup from "../Popups/PaymentPopup";
import CreditPopup from "../Popups/CreditPopup";
import CardPaymentPopup from "../Popups/CardPaymentPopup"; // Import CardPaymentPopup
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import { salesInfoGetById } from "redux/sale/service";
import { getTeeSheetInventorysList } from "redux/inventory/service";
import { getDateRangeSeasonsList } from "redux/season/service";
import moment from "moment";
import Select from "react-select";

const dummyData = [
  { name: "Green Fees", price: "$34", qty: 2, discount: "-" },
  { name: "Balls - dozen", price: "$34", qty: 2, discount: "-" },
  { name: "tees / h2", price: "$34", qty: 2, discount: "-" },
];

const SalesScreen = ({ saleId }) => {
  const [salesData, setSalesData] = useState();
  const [salesItems, setSalesItems] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonList, setSeasonList] = useState([]);

  const [data, setData] = useState(dummyData);
  const [buttonColors, setButtonColors] = useState([
    "rgb(67, 101, 207)",
    "rgb(67, 101, 207)",
    "rgb(67, 101, 207)",
  ]);
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [isCreditPopupOpen, setCreditPopupOpen] = useState(false);
  const [isCardPaymentPopupOpen, setCardPaymentPopupOpen] = useState(false); // State for CardPaymentPopup

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");

    getDateRangeSeasonsList(date)
      .then((res) => {
        const data = res.data.seasons;
        setSeasons(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });

    salesInfoGetById(saleId)
      .then((res) => {
        const data = res.data.sale;
        setSalesData(data);
        setSalesItems(data.item_list);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    getTeeSheetInventorysList("retail")
      .then((res) => {
        const data = res.data.inventories;
        setInventories(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [saleId]);

  console.log(seasons, "seasons");

  const togglePaymentPopup = () => {
    setPaymentPopupOpen(!isPaymentPopupOpen);
  };

  const toggleCreditPopup = () => {
    setCreditPopupOpen(!isCreditPopupOpen);
  };

  const toggleCardPaymentPopup = () => {
    setCardPaymentPopupOpen(!isCardPaymentPopupOpen);
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
    } else if (index === 2) {
      toggleCardPaymentPopup(); // Open CardPaymentPopup for Pay Now button
    }
  };

  const [activeButton, setActiveButton] = useState("");

  const handleSaleClick = () => {
    setActiveButton("sale");
  };

  const handleReturnClick = () => {
    setActiveButton("return");
  };

  console.log(salesItems, "salesItems");
  return (
    <div
      className="adminDashboardItems"
      style={{
        width: "100%",
        // padding: "20px",
        backgroundColor: "#EEF0F6",
      }}
    >
      <div className="Dashboard-Items-main">
        <div className="Dashboard-Items-left-main">
          <div className="Dashboard-Items-left">
            <div className="item-sale-return-btn">
              <p>Items</p>
              <div className="for-sale-item-btn">
                <button
                  style={{
                    backgroundColor: activeButton === "sale" ? "#0cd374" : "",
                  }}
                  onClick={handleSaleClick}
                >
                  sale
                </button>
                <button
                  style={{
                    backgroundColor: activeButton === "return" ? "red" : "",
                  }}
                  onClick={handleReturnClick}
                >
                  return
                </button>
              </div>
            </div>
            <div className="item-table">
              <table>
                <thead>
                  <tr>
                    <th className="th-cross-btn">
                      <MdCancel onClick={() => handleDelete(0)} />
                      {/* <input type="checkbox" id="chk" /> */}
                      {/* <label htmlFor="chk"></label> */}
                    </th>
                    <th className="item-name">#Items</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>DISC%</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesItems.map((item, index) => (
                    <tr key={index} className="sale-screen-inputs">
                      <td className="th-cross-btn">
                        <MdCancel onClick={() => handleDelete(index)} />
                        {/* <input type="checkbox" id="chk" /> */}
                        {/* <label htmlFor="chk"></label> */}
                      </td>
                      <td className="item-name">
                        {/* {item.itemName} */}
                        <Select
                          // value={terminals?.find((c) => c.value === checkIn.terminalId)}
                          // disabled={!useEmployeePermission}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          onChange={(e) => {
                            // setCheckIn({
                            //   ...checkIn,
                            //   terminalId: e.value,
                            // });
                          }}
                          options={seasons}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          placeholder="Price"
                          onChange={(event) => {
                            // handleInputChange(event.target.value, "price" , index);
                          }}
                          value={item.price}
                          name="price"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          placeholder="Qty"
                          onChange={(event) => {
                            // handleInputChange(event.target.value, "qty" , index);
                          }}
                          value={item.quantity}
                          name="qty"
                        />
                      </td>

                      <td>
                        {" "}
                        <input
                          type="number"
                          placeholder="disc%"
                          onChange={(event) => {
                            // handleInputChange(event.target.value, "disc" , index);
                          }}
                          value={item.quantity}
                          name="disc"
                        />
                      </td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="item-total">
                <p>{salesItems.length} items</p>
                <div className="sub-total-item">
                  <span>sub total</span>
                  <h1>${salesData?.subTotal}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-down-btns">
            {/* <div className="for-search">
              <input type="text" placeholder="Search customers" />
              <p>Add customers to sale</p>
            </div> */}
            <div className="cash-in-nbr">
              <h4>Total Due:</h4>
              <h3>${salesData?.total}</h3>
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
                Pay Now
              </button>
              <button
                style={{ backgroundColor: buttonColors[2] }}
                onClick={() => handleButtonClick(2)}
              >
                Credit Card
              </button>
            </div>
          </div>
        </div>
        <div className="Dashboard-Items-right">
          <ItemsSidebar inventories={inventories} />
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

      {/* Render CardPaymentPopup if open */}
      {isCardPaymentPopupOpen && (
        <CardPaymentPopup
          isOpen={isCardPaymentPopupOpen}
          onClose={toggleCardPaymentPopup}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const saleId = ownProps.match.params.saleId;
  return {
    saleId: saleId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesScreen);
