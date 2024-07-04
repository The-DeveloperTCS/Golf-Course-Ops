import React, { useState } from "react";
import profileimg from "../../../assets/images/Group 1000002530.png";
import profileimg3 from "../../../assets/images/Vector.png";
import profileimg2 from "../../../assets/images/Vector (2).png";
import edit2 from "../../../assets/images/Group 1000002532.png";
import { Link } from "react-router-dom";
import "../../style/NewTeeSheet.css";

function NewTeeSheet() {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);

  const [
    clickedGolferCartButtonIndex,
    setClickedGolferCartButtonIndex,
  ] = useState(0);

  const [clickedCartButtonIndex, setClickedCartButtonIndex] = useState(0);

  const handleCartButtonClick = (index) => {
    setClickedCartButtonIndex(index);
  };
  const [clickedRadioButtonIndex, setClickedRadioButtonIndex] = useState(0);

  const handleRadioButtonClick = (index) => {
    setClickedRadioButtonIndex(index);
  };

  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
  };

  const handleGolferCartButtonClick = (index) => {
    setClickedGolferCartButtonIndex(index);
  };

  return (
    <div className="admin-t-main">
      <div className="admin-t-buttons">
        <button
          style={{
            backgroundColor: clickedButtonIndex === 0 ? "#5110BA" : "#0CD374 ",
            color: clickedButtonIndex === 0 ? "white" : "",
          }}
          onClick={() => handleButtonClick(0)}
        >
          tee time
        </button>
        <button
          style={{
            backgroundColor: clickedButtonIndex === 1 ? "#5110BA" : "#0CD374",
            color: clickedButtonIndex === 1 ? "white" : "",
          }}
          onClick={() => handleButtonClick(1)}
        >
          tournament
        </button>
        <button
          style={{
            backgroundColor: clickedButtonIndex === 2 ? "#5110BA" : "#0CD374",
            color: clickedButtonIndex === 2 ? "white" : "",
          }}
          onClick={() => handleButtonClick(2)}
        >
          league
        </button>
        <button
          style={{
            backgroundColor: clickedButtonIndex === 3 ? "#5110BA" : "#0CD374",
            color: clickedButtonIndex === 3 ? "white" : "",
          }}
          onClick={() => handleButtonClick(3)}
        >
          event
        </button>
        <button
          style={{
            backgroundColor: clickedButtonIndex === 4 ? "#5110BA" : "#0CD374",
            color: clickedButtonIndex === 4 ? "white" : "",
          }}
          onClick={() => handleButtonClick(4)}
        >
          block
        </button>
        <button
          style={{
            backgroundColor: clickedButtonIndex === 5 ? "#5110BA" : "#0CD374",
            color: clickedButtonIndex === 5 ? "white" : "",
          }}
          onClick={() => handleButtonClick(5)}
        >
          shotgun
        </button>
      </div>
      {/*========== Golfer and Cart Area ===========================*/}
      <div className="golfer-cart-area-main1">
        <div className="golfer-cart-area-main">
          <div className="golfer-img">
            <img src={profileimg} alt="" />
          </div>
          <input className="golfer-input" type="text" value="01" disabled />
          {/* =========Golfer buttons ========*/}
          <div className="golfer-input-buttons">
            <button
              className="golferbtn1"
              style={{
                backgroundColor:
                  clickedGolferCartButtonIndex === 0 ? "#4365CF" : "",
                color: clickedGolferCartButtonIndex === 0 ? "white" : "#161819",
              }}
              onClick={() => handleGolferCartButtonClick(0)}
            >
              1
            </button>
            <button
              style={{
                backgroundColor:
                  clickedGolferCartButtonIndex === 2 ? "#4365CF" : "",
                color: clickedGolferCartButtonIndex === 2 ? "white" : "#161819",
              }}
              onClick={() => handleGolferCartButtonClick(2)}
            >
              2
            </button>
            <button
              style={{
                backgroundColor:
                  clickedGolferCartButtonIndex === 3 ? "#4365CF" : "",
                color: clickedGolferCartButtonIndex === 3 ? "white" : "#161819",
              }}
              onClick={() => handleGolferCartButtonClick(3)}
            >
              3
            </button>
            <button
              className="golferbtn4"
              style={{
                backgroundColor:
                  clickedGolferCartButtonIndex === 4 ? "#4365CF" : "",
                color: clickedGolferCartButtonIndex === 4 ? "white" : "#161819",
              }}
              onClick={() => handleGolferCartButtonClick(4)}
            >
              4
            </button>
          </div>
          {/* =========Golfer buttons ========*/}
        </div>

        <div className="golfer-cart-area-main">
          <div className="golfer-img">
            <img src={profileimg2} alt="" />
          </div>
          <input className="golfer-input" type="text" value="01" disabled />
          {/* =========cart buttons ========*/}
          <div className="Cart-input-buttons">
            <button
              className="golferbtn1"
              style={{
                backgroundColor: clickedCartButtonIndex === 0 ? "#5110BA" : "",
                color: clickedCartButtonIndex === 0 ? "white" : "#161819",
              }}
              onClick={() => handleCartButtonClick(0)}
            >
              1
            </button>
            <button
              style={{
                backgroundColor: clickedCartButtonIndex === 2 ? "#5110BA" : "",
                color: clickedCartButtonIndex === 2 ? "white" : "#161819",
              }}
              onClick={() => handleCartButtonClick(2)}
            >
              2
            </button>
            <button
              style={{
                backgroundColor: clickedCartButtonIndex === 3 ? "#5110BA" : "",
                color: clickedCartButtonIndex === 3 ? "white" : "#161819",
              }}
              onClick={() => handleCartButtonClick(3)}
            >
              3
            </button>
            <button
              className="golferbtn4"
              style={{
                backgroundColor: clickedCartButtonIndex === 4 ? "#5110BA" : "",
                color: clickedCartButtonIndex === 4 ? "white" : "#161819",
              }}
              onClick={() => handleCartButtonClick(4)}
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
              backgroundColor: clickedRadioButtonIndex === 0 ? "#5110BA" : "",
              color: clickedRadioButtonIndex === 0 ? "white" : "#161819",
            }}
            onClick={() => handleRadioButtonClick(0)}
          >
            09
          </button>
          <button
            className="golferbtn4"
            style={{
              backgroundColor: clickedRadioButtonIndex === 2 ? "#5110BA" : "",
              color: clickedRadioButtonIndex === 2 ? "white" : "#161819",
            }}
            onClick={() => handleRadioButtonClick(2)}
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
          <div className="for-edit-icons">
            <img src={edit2} alt="" />
          </div>
          <input type="text" placeholder="mark.brandit@opewm.org" />
          <div className="for-nbr">
            {" "}
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            {" "}
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      {/* Tee Sheet input Feilds seeting row2 */}
      <div className="tee-sheet-seeting-input-main">
        <div className="seeting-input-row1">
          <p>2</p>
          <input type="text" placeholder="Last. First name" />
          <div className="for-edit-icons">
            <img src={edit2} alt="" />
          </div>
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
          <div className="for-edit-icons">
            <img src={edit2} alt="" />
          </div>
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
          <div className="for-edit-icons">
            <img src={edit2} alt="" />
          </div>
          <input type="text" placeholder="Email" />
          <div className="for-nbr">
            {" "}
            <input type="text" placeholder="888-888-8888" />
          </div>
          <div className="for-zip">
            <input type="text" placeholder="zip" />
          </div>
        </div>
      </div>
      <div className="tee-sheet-check-button">
        {/* <div className="check-text">
          <p>
            booked by wave 2022 wave 2022 <br /> 4:28 @ 08:19 AM
          </p>
        </div> */}
      </div>
      <div className="Tee-sheet-large-input">
        <input type="text" name="" id="" disabled />
      </div>

      <div className="delet-update-tee-sheet-btn">
        <div className="btn-delet-update">
          <button style={{ backgroundColor: "#0CD374" }}>Reserved</button>
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

export default NewTeeSheet;
