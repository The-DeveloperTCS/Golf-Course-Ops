import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import profileimg from "../../../assets/images/Group 1000002530.png";
import profileimg3 from "../../../assets/images/Vector.png";
import profileimg2 from "../../../assets/images/Vector (2).png";
import "../../style/NewTeeSheet.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getCustomers } from "redux/customer/service";
import NotificationActions from "redux/notifications/actions";

function TeeSheetForm(
  {
    updateTeeSheet,
    onSave,
    handleChaneDeleteTeeSheet,
    handleChaneCheckInTeeSheet,
  },
  props
) {
  const [teeSheet, setTeeSheet] = useState({ ...updateTeeSheet });
  const [saving, setSaving] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [bookedCustomer, setBookedCustomer] = useState([
    {
      customer_name: "",
      customer_email: "",
      customer_cellphone: "",
      customerId: "",
      no_show: false,
      zip: "",
    },
    {
      customer_name: "",
      customer_email: "",
      customer_cellphone: "",
      customerId: "",
      no_show: false,
      zip: "",
    },
    {
      customer_name: "",
      customer_email: "",
      customer_cellphone: "",
      customerId: "",
      no_show: false,
      zip: "",
    },
    {
      customer_name: "",
      customer_email: "",
      customer_cellphone: "",
      customerId: "",
      no_show: false,
      zip: "",
    },
  ]);

  useEffect(() => {
    getCustomers()
      .then((res) => {
        const data = res.data.customers;
        setCustomersList(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  useEffect(() => {
    if (updateTeeSheet.id) {
      setBookedCustomer(updateTeeSheet.customer_list);
      return setTeeSheet({ ...updateTeeSheet });
    }
    setTeeSheet({ ...updateTeeSheet });
  }, [updateTeeSheet]);

  const handleInputChange = (index, value, field) => {
    var arr = [];
    for (var i in bookedCustomer) {
      if (i == index) {
        var obj = { ...bookedCustomer[i] };
        if (field === "email") {
          obj.customer_email = value;
        }
        if (field === "number") {
          obj.customer_cellphone = value;
        }
        if (field === "zip") {
          obj.zip = value;
        }
        arr.push(obj);
      } else {
        arr.push(bookedCustomer[i]);
      }
    }
    setBookedCustomer(arr);
  };

  const onChangeCustomerList = (customer, index) => {
    if (index == 0) {
      setTeeSheet({
        ...teeSheet,
        customer_name: customer.firstName + " " + customer.lastName,
        customerId: customer.id,
      });
    }
    var obj = {
      customer_name: customer.firstName + " " + customer.lastName,
      customer_email: customer.emailAddress,
      customer_cellphone: customer.cellPhoneNumber,
      customerId: customer.id,
      no_show: false,
      zip: customer.zipCode,
    };

    var arr = [];
    for (var i = 0; i <= 3; i++) {
      if (i == index) {
        arr.push(obj);
      } else {
        arr.push(bookedCustomer[i]);
      }
    }
    setBookedCustomer(arr.filter((e) => e !== undefined));
  };

  const handleChaneAddTeeSheet = () => {
    setSaving(true);
    var sheet = {
      ...teeSheet,
      customer_list: bookedCustomer,
    };
    onSave({ ...sheet }).then(() => setSaving(false));
  };

  const handleChaneUpdateTeeSheet = () => {
    setSaving(true);
    var sheet = {
      ...teeSheet,
      customer_list: bookedCustomer,
    };
    onSave({ ...sheet }).then(() => setSaving(false));
  };

  //   const initialState = [
  //     { name: "foo", counter: 0 },
  //     { name: "far", counter: 0 },
  //     { name: "faz", counter: 0 }
  //   ];

  // const [state, setState] = useState(initialState);

  // const clickButton = () => {
  // 	// 1. Make a shallow copy of the array
  // 	let temp_state = [...state];

  // 	// 2. Make a shallow copy of the element you want to mutate
  // 	let temp_element = { ...temp_state[0] };

  // 	// 3. Update the property you're interested in
  // 	temp_element.counter = temp_element.counter+1;

  // 	// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
  // 	temp_state[0] = temp_element;

  // 	// 5. Set the state to our new copy
  // 	setState( temp_state );
  // }

  //   et markers = [ ...this.state.markers ];
  // markers[index] = {...markers[index], key: value};
  // this.setState({ markers });

  const getCustomerName = (id) => {
    if (id !== "") {
      return customersList.filter((cus) => cus.id === id)[0];
    }
    return {};
  };
  console.log(customersList, "customersList");
  return (
    <div className="admin-t-main">
      <div className="admin-t-buttons">
        <button
          style={{
            backgroundColor: "#4365CF",
            color: "#ffffff",
          }}
        >
          tee time
        </button>
      </div>
      {/*========== Golfer and Cart Area ===========================*/}
      <div className="golfer-cart-area-main1">
        <div className="golfer-cart-area-main">
          <div className="golfer-img">
            <img src={profileimg} alt="" />
          </div>
          <input
            className="golfer-input"
            type="text"
            value={teeSheet.persons}
            disabled
          />
          {/* =========Golfer buttons ========*/}
          <div className="golfer-input-buttons">
            <button
              className="golferbtn1"
              style={{
                backgroundColor: teeSheet.persons === 1 ? "#4365CF" : "",
                color: teeSheet.persons === 1 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  persons: 1,
                })
              }
            >
              1
            </button>
            <button
              style={{
                backgroundColor: teeSheet.persons === 2 ? "#4365CF" : "",
                color: teeSheet.persons === 2 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  persons: 2,
                })
              }
            >
              2
            </button>
            <button
              style={{
                backgroundColor: teeSheet.persons === 3 ? "#4365CF" : "",
                color: teeSheet.persons === 3 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  persons: 3,
                })
              }
            >
              3
            </button>
            <button
              className="golferbtn4"
              style={{
                backgroundColor: teeSheet.persons === 4 ? "#4365CF" : "",
                color: teeSheet.persons === 4 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  persons: 4,
                })
              }
            >
              4
            </button>
          </div>
          {/* =========Golfer buttons ========*/}
        </div>
        <div className="golfer-cart-area-main2">
          <div className="golfer-img2">
            <img src={profileimg2} alt="" />
          </div>
          <input
            className="golfer-input"
            type="text"
            value={teeSheet.cart_count}
            disabled
          />
          {/* =========cart buttons ========*/}
          <div className="Cart-input-buttons">
            <button
              className="golferbtn1"
              style={{
                backgroundColor: teeSheet.cart_count === 0 ? "#4365CF" : "",
                color: teeSheet.cart_count === 0 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  cart_count: 0,
                })
              }
            >
              0
            </button>
            <button
              style={{
                backgroundColor: teeSheet.cart_count === 1 ? "#4365CF" : "",
                color: teeSheet.cart_count === 1 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  cart_count: 1,
                })
              }
            >
              1
            </button>
            <button
              style={{
                backgroundColor: teeSheet.cart_count === 2 ? "#4365CF" : "",
                color: teeSheet.cart_count === 2 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  cart_count: 2,
                })
              }
            >
              2
            </button>
            <button
              style={{
                backgroundColor: teeSheet.cart_count === 3 ? "#4365CF" : "",
                color: teeSheet.cart_count === 3 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  cart_count: 3,
                })
              }
            >
              3
            </button>
            <button
              className="golferbtn4"
              style={{
                backgroundColor: teeSheet.cart_count === 4 ? "#4365CF" : "",
                color: teeSheet.cart_count === 4 ? "white" : "#161819",
              }}
              onClick={() =>
                setTeeSheet({
                  ...teeSheet,
                  cart_count: 4,
                })
              }
            >
              4
            </button>
          </div>
          {/* =========cart buttons ========*/}
        </div>
        <div className="adminteeSheet-radio-btn"></div>
        <div className="tee-raido-btn-main">
          <img src={profileimg3} alt="" />
          <button
            className="golferbtn1"
            style={{
              backgroundColor: teeSheet.holes === 9 ? "#4365CF" : "",
              color: teeSheet.holes === 9 ? "white" : "#161819",
            }}
            onClick={() =>
              setTeeSheet({
                ...teeSheet,
                holes: 9,
              })
            }
          >
            09
          </button>
          <button
            className="golferbtn4"
            style={{
              backgroundColor: teeSheet.holes === 18 ? "#4365CF" : "",
              color: teeSheet.holes === 18 ? "white" : "#161819",
            }}
            onClick={() =>
              setTeeSheet({
                ...teeSheet,
                holes: 18,
              })
            }
          >
            18
          </button>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row1 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>1</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customersList}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              onChangeCustomerList(newValue, 0);
            }}
            defaultValue={getCustomerName(bookedCustomer[0].customerId)}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Name" // Placeholder text
              />
            )}
          />
          <div className="for-edit-icons"></div>
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => {
              handleInputChange(0, event.target.value, "email");
            }}
            value={bookedCustomer[0]?.customer_email}
            name="email1"
          />
          <div className="for-nbr">
            <input
              type="text"
              placeholder="888-888-8888"
              onChange={(event) => {
                handleInputChange(0, event.target.value, "number");
              }}
              value={bookedCustomer[0]?.customer_cellphone}
              name="number1"
            />
          </div>
          <div className="for-zip">
            <input
              type="text"
              placeholder="zip"
              onChange={(event) => {
                handleInputChange(0, event.target.value, "zip");
              }}
              value={bookedCustomer[0]?.zip}
              name="zip1"
            />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row2 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>2</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customersList}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              onChangeCustomerList(newValue, 1);
            }}
            // defaultValue={getCustomerName(bookedCustomer[1].customerId)}
            getOptionLabel={(option) =>
              option?.firstName.toString() + " " + option?.lastName.toString()
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Name" />
            )}
          />
          <div className="for-edit-icons"></div>
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => {
              handleInputChange(1, event.target.value, "email");
            }}
            value={bookedCustomer[1]?.customer_email}
            name="email2"
          />
          <div className="for-nbr">
            <input
              type="text"
              placeholder="888-888-8888"
              onChange={(event) => {
                handleInputChange(1, event.target.value, "number");
              }}
              value={bookedCustomer[1]?.customer_cellphone}
              name="number2"
            />
          </div>
          <div className="for-zip">
            <input
              type="text"
              placeholder="zip"
              onChange={(event) => {
                handleInputChange(1, event.target.value, "zip");
              }}
              value={bookedCustomer[1]?.zip}
              name="zip2"
            />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row3*/}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>3</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customersList}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              onChangeCustomerList(newValue, 2);
            }}
            // defaultValue={getCustomerName(bookedCustomer[2].customerId)}
            getOptionLabel={(option) =>
              option?.firstName.toString() + " " + option?.lastName.toString()
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Name" />
            )}
          />
          <div className="for-edit-icons"></div>
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => {
              handleInputChange(2, event.target.value, "email");
            }}
            value={bookedCustomer[2]?.customer_email}
            name="email3"
          />
          <div className="for-nbr">
            <input
              type="text"
              placeholder="888-888-8888"
              onChange={(event) => {
                handleInputChange(2, event.target.value, "number");
              }}
              value={bookedCustomer[2]?.customer_cellphone}
              name="number3"
            />
          </div>
          <div className="for-zip">
            <input
              type="text"
              placeholder="zip"
              onChange={(event) => {
                handleInputChange(2, event.target.value, "zip");
              }}
              value={bookedCustomer[2]?.zip}
              name="zip3"
            />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row4 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>4</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customersList}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              onChangeCustomerList(newValue, 3);
            }}
            // defaultValue={getCustomerName(bookedCustomer[3].customerId)}
            getOptionLabel={(option) =>
              option?.firstName.toString() + " " + option?.lastName.toString()
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Name" />
            )}
          />
          <div className="for-edit-icons"></div>
          <input
            type="text"
            placeholder="Email"
            onChange={(event) => {
              handleInputChange(3, event.target.value, "email");
            }}
            value={bookedCustomer[3]?.customer_email}
            name="email4"
          />
          <div className="for-nbr">
            <input
              type="text"
              placeholder="888-888-8888"
              onChange={(event) => {
                handleInputChange(3, event.target.value, "number");
              }}
              value={bookedCustomer[3]?.customer_cellphone}
              name="number4"
            />
          </div>
          <div className="for-zip">
            <input
              type="text"
              placeholder="zip"
              onChange={(event) => {
                handleInputChange(3, event.target.value, "zip");
              }}
              value={bookedCustomer[3]?.zip}
              name="zip4"
            />
          </div>
        </div>
      </div>
      <div className="Tee-sheet-large-input">
        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          value={teeSheet.comment}
          onChange={(e) =>
            setTeeSheet({
              ...teeSheet,
              comment: e.target.value,
            })
          }
        />
      </div>
      <div className="delet-update-tee-sheet-btn">
        <div className="btn-delet-update">
          {teeSheet.id && (
            <button
              style={{ backgroundColor: "#E92A2A" }}
              onClick={() => handleChaneDeleteTeeSheet(teeSheet)}
            >
              Delete
            </button>
          )}
          {!teeSheet.id ? (
            <button
              style={{ backgroundColor: "#0CD374" }}
              onClick={handleChaneAddTeeSheet}
              loading={saving}
            >
              Reserved
            </button>
          ) : (
            <button
              style={{ backgroundColor: "#0CD374" }}
              onClick={handleChaneUpdateTeeSheet}
            >
              Update
            </button>
          )}
        </div>

        <div className="tee-sheet-Check-In">
          <div className="check-in-admint-tee-sheet">
            {/* <Link to="/adminDashboardItems"> */}
            <button
              onClick={() =>
                handleChaneCheckInTeeSheet(teeSheet, bookedCustomer)
              }
            >
              Check in
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeeSheetForm);
