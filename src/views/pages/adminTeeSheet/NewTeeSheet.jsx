import React, { useEffect, useState } from "react";
import profileimg from "../../../assets/images/Group 1000002530.png";
import profileimg3 from "../../../assets/images/Vector.png";
import profileimg2 from "../../../assets/images/Vector (2).png";
import "../../style/NewTeeSheet.css";
import { Link } from "react-router-dom";
import moment from "moment";
import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";

const defaultState = {
  date: moment().format("YYYY-MM-DD"),
  group_name: "tee-time",
  start_time: "11:00:00",
  end_time: "13:00:00",
  holes: 9,
  persons: 1,
  cart_count: 1,
  customer_name: "Customer L",
  pay_mode: "reserved",
  comment: "",
  customer_list: [],
};

function AdminTeeSheetSetting(props) {
  const { item } = props.location.state;
  const [teeSheet, setTeeSheet] = useState({ ...defaultState });

  useEffect(() => {
    if (!item.id) {
      const date = moment(item.timing, "HH:mm").toDate();
      const endDate = moment(date)
        .add(9, "minutes")
        .format("HH:mm:ss");

      return setTeeSheet({
        ...defaultState,
        start_time: item.timing,
        end_time: endDate,
      });
    }
    setTeeSheet(item);
  }, [item]);

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
          <input type="text" placeholder="Brandit (Badge)" />
          <div className="for-edit-icons"></div>
          <input type="text" placeholder="email" />
          <div className="for-nbr">
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row2 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>2</p>
          <input type="text" placeholder="Last. First name" />
          <div className="for-edit-icons"></div>
          <input type="text" placeholder="Email" />
          <div className="for-nbr">
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row3*/}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>3</p>
          <input type="text" placeholder="Last. First name" />
          <div className="for-edit-icons"></div>
          <input type="text" placeholder="Email" />
          <div className="for-nbr">
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row4 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>4</p>
          <input type="text" placeholder="Last. First name" />
          <div className="for-edit-icons"></div>
          <input type="text" placeholder="Email" />
          <div className="for-nbr">
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      <div className="Tee-sheet-large-input">
        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          value={teeSheet.comment}
        />
      </div>
      <div className="delet-update-tee-sheet-btn">
        <div className="btn-delet-update">
          {teeSheet.id && (
            <button style={{ backgroundColor: "#E92A2A" }}>Delete</button>
          )}
          {!teeSheet.id ? (
            <button style={{ backgroundColor: "#0CD374" }}>Reserved</button>
          ) : (
            <button style={{ backgroundColor: "#0CD374" }}>Update</button>
          )}
        </div>

        <div className="tee-sheet-Check-In">
          <div className="check-in-admint-tee-sheet">
            <Link to="/adminDashboardItems">
              <button>Check in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminTeeSheetSetting;
