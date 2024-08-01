import React, { useEffect, useState } from "react";
import "../../style/AdminDashboardItems.css";
import ItemsSidebar from "./ItemsSidebar";
import PaymentPopup from "../Popups/PaymentPopup";
import { connect } from "react-redux";
import { salesInfoGetById } from "redux/sale/service";
import { getTeeSheetInventorysList } from "redux/inventory/service";
import { getDateRangeSeasonsList } from "redux/season/service";
import moment from "moment";
import Select from "react-select";
import Loader from "components/loader/Loader";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failure } = NotificationActions;

const defaultState = {
  subTotal: 0,
  saleTax: 0,
  stateTax: 0,
  total: 0,
  pay_method: "cash",
  teesheetId: null,
  date: "",
  item_list: [
    {
      itemId: null,
      itemName: "",
      price: 0,
      quantity: 0,
      discount: 0,
      total: 0,
      seasonId: null,
      seasonName: "",
    },
  ],
  customerId: null,
  accountTitle: "",
  saleId: "",
  sale: true,
  isReturn: false,
  pay_mode: "paid",
};

const SalesScreen = ({
  saleId,
  startLoader,
  endLoader,
  loader,
  successWithTimeout,
  failure,
}) => {
  const [salesData, setSalesData] = useState({ ...defaultState });
  const [salesItems, setSalesItems] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);

  useEffect(() => {
    startLoader(true);
    salesInfoGetById(saleId)
      .then((res) => {
        const data = res.data.sale;
        setSalesData(data);
        setSalesItems(data.item_list);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    getTeeSheetInventorysList("Retail")
      .then((res) => {
        const data = res.data.inventories;
        setInventories(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [saleId]);

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    getDateRangeSeasonsList(date)
      .then((res) => {
        const seasonData = res.data.seasons;
        const list = [];
        setSeasons(seasonData);
        var obj = {
          seasonId: seasonData[0].id,
          seasonName: seasonData[0].name,
          itemId: null,
          itemName: null,
          price: Number(seasonData[0].season_list[0].price),
          seasonlistId: seasonData[0].season_list[0].id,
          quantity: 1,
          discount: 0,
          total: Number(seasonData[0].season_list[0].price) * 1,
        };
        list.push(obj);
        const subTotal = Number(seasonData[0].season_list[0].price);
        const salesTax = Number(Math.round((subTotal / 100) * 7.5).toFixed(2));

        setSalesData({
          ...salesData,
          item_list: list,
          subTotal: subTotal,
          saleTax: salesTax,
          total: Number(subTotal + salesTax),
          stateTax: salesTax,
          date: moment().format("YYYY-MM-DD"),
        });
        setSeasonList(seasonData[0].season_list);
        endLoader(false);
      })
      .catch((err) => {
        console.log(err, "err");
        endLoader(false);
      });
  }, [salesItems]);

  const updateData = (value, row, key, index) => {
    const data = { ...row };
    if (key === "seasonId") {
      data.seasonId = value.id;
      const seasonList = seasons.filter(
        (seasLis) => seasLis.id === value.id
      )[0];
      setSeasonList(seasonList?.season_list);
      data.seasonlistId = seasonList?.season_list[0]?.id;
    }

    if (key === "seasonlistId") {
      const totalDiscount =
        ((Number(value.price) * data.quantity) / 100) * data.discount;
      data.seasonlistId = value.id;
      data.price = Number(value.price);
      data.quantity = Number(data.quantity);
      data.total = Number(
        Math.round(Number(value.price) * data.quantity - totalDiscount).toFixed(
          2
        )
      );
      data.discount = Number(data.discount);
    }
    if (key === "price") {
      const totalDiscount =
        ((Number(value) * data.quantity) / 100) * data.discount;
      const total = Number(value) * data.quantity;
      data.price = Number(value);
      data.total = Number(Math.round(total - totalDiscount).toFixed(2));
    }
    if (key === "quantity") {
      const totalDiscount =
        ((data.price * Number(value)) / 100) * data.discount;
      const total = data.price * Number(value);
      data.quantity = Number(value);
      data.total = Number(Math.round(total - totalDiscount).toFixed(2));
    }
    if (key === "discount") {
      const discount = (data.total / 100) * Number(value);
      data.discount = Number(value);
      data.total = Number(Math.round(data.total - discount).toFixed(2));
    }
    const newData = [...salesData.item_list];
    newData[index] = data;
    const subTotal = newData.reduce((acc, cv) => acc + cv.total, 0);
    const salesTax = Number(Math.round((subTotal / 100) * 7.5).toFixed(2));
    setSalesData({
      ...salesData,
      item_list: newData,
      subTotal: Number(subTotal),
      saleTax: salesTax,
      total: Number(Math.round(subTotal + salesTax).toFixed(2)),
    });
  };

  const onChangeItemAdd = (item) => {
    const itemAdd = {
      itemId: item.id,
      itemName: item.name,
      price: item.unitPrice,
      quantity: 1,
      discount: 0,
      total: item.unitPrice,
      seasonId: null,
      seasonName: "",
      seasonlistId: null,
    };
    const itemsAll = [...salesData.item_list];
    itemsAll.push(itemAdd);
    const subTotal = itemsAll.reduce((acc, cv) => acc + cv.total, 0);
    const salesTax = Number(Math.round((subTotal / 100) * 7.5).toFixed(2));
    setSalesData({
      ...salesData,
      item_list: itemsAll,
      subTotal: Number(subTotal),
      saleTax: Number(salesTax),
      total: Number(Math.round(subTotal + salesTax).toFixed(2)),
    });
  };

  console.log(salesData, "sales data");

  return loader ? (
    <Loader />
  ) : (
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
                    backgroundColor: salesData?.sale ? "#0cd374" : "",
                  }}
                  onClick={() => {
                    setSalesData({
                      ...salesData,
                      sale: true,
                      return: false,
                    });
                  }}
                >
                  sale
                </button>
                <button
                  style={{
                    backgroundColor: salesData?.return ? "red" : "",
                  }}
                  onClick={() => {
                    setSalesData({
                      ...salesData,
                      sale: false,
                      return: true,
                    });
                  }}
                >
                  return
                </button>
              </div>
            </div>
            <div className="item-table">
              <table>
                <thead>
                  <tr>
                    {/* <th className="th-cross-btn">
                        <MdCancel onClick={() => handleDelete(0)} />
                        <input type="checkbox" id="chk" />
                        <label htmlFor="chk"></label>
                      </th> */}
                    <th className="item-name">#Items</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>DISC%</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.item_list.map((item, index) => (
                    <tr key={index} className="sale-screen-inputs">
                      {/* <td className="th-cross-btn">
                              <MdCancel onClick={() => handleDelete(index)} />
                              <input type="checkbox" id="chk" />
                              <label htmlFor="chk"></label>
                            </td> */}
                      <td className="item-name">
                        {item.seasonId !== null ? (
                          <div className="select-container">
                            <Select
                              className="flex-select"
                              value={seasons?.find(
                                (c) => c.id === item.seasonId
                              )}
                              // disabled={!useEmployeePermission}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              onChange={(e) => {
                                updateData(e, item, "seasonId", index);
                              }}
                              options={seasons}
                            />
                            <Select
                              className="flex-select2"
                              value={seasonList?.find(
                                (c) => c.id === item.seasonlistId
                              )}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              onChange={(e) => {
                                updateData(e, item, "seasonlistId", index);
                              }}
                              options={seasonList}
                            />
                          </div>
                        ) : (
                          <div className="select-container">
                            {item.itemName}
                          </div>
                        )}
                      </td>

                      <td>
                        <input
                          style={{ width: "100%" }}
                          type="number"
                          placeholder="Price"
                          onChange={(event) => {
                            updateData(
                              event.target.value,
                              item,
                              "price",
                              index
                            );
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
                            updateData(
                              event.target.value,
                              item,
                              "quantity",
                              index
                            );
                          }}
                          value={item.quantity}
                          name="qty"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          placeholder="disc%"
                          onChange={(event) => {
                            updateData(
                              event.target.value,
                              item,
                              "discount",
                              index
                            );
                          }}
                          value={item.discount}
                          name="disc"
                        />
                      </td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="item-total">
                <p>{salesData.item_list.length} items</p>
                <div className="sub-total-item">
                  <span>Sales Tax - 7.50%</span>
                  <h1>${salesData?.saleTax}</h1>
                </div>
                <div className="sub-total-item">
                  <span>sub total</span>
                  <h1>${salesData?.subTotal}</h1>
                </div>
              </div>
              {/* <div className="item-total">

              </div> */}
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
                style={{ backgroundColor: "rgb(67, 101, 207)" }}
                onClick={() => setPaymentPopupOpen(true)}
              >
                Cash
              </button>
              {/* <button
                  style={{ backgroundColor: "rgb(67, 101, 207)" }}
                // onClick={() => handleButtonClick(1)}
                >
                  Pay Now
                </button> */}
              {/* <button
                  style={{ backgroundColor: "rgb(67, 101, 207)" }}
                // onClick={() => handleButtonClick(2)}
                >
                  Credit Card
                </button> */}
            </div>
          </div>
        </div>
        <div className="Dashboard-Items-right">
          <ItemsSidebar
            inventories={inventories}
            onChangeItemAdd={onChangeItemAdd}
          />
        </div>
      </div>

      {/* Render PaymentPopup if open */}
      {isPaymentPopupOpen && (
        <PaymentPopup
          isOpen={isPaymentPopupOpen}
          salesData={salesData}
          setPaymentPopupOpen={setPaymentPopupOpen}
          // togglePopup={togglePaymentPopup}
        />
      )}

      {/* Render CreditPopup if open */}
      {/* {isCreditPopupOpen && (
          <CreditPopup
            isOpen={isCreditPopupOpen}
            togglePopup={toggleCreditPopup}
          />
        )} */}

      {/* Render CardPaymentPopup if open */}
      {/* {isCardPaymentPopupOpen && (
          <CardPaymentPopup
            isOpen={isCardPaymentPopupOpen}
            onClose={toggleCardPaymentPopup}
          />
        )} */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const saleId = ownProps.match.params.saleId;
  return {
    saleId: saleId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(SalesScreen);
