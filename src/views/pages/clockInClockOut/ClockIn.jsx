import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../style/ClockIn.css";
import ClockinDropdown from "../clockInClockOut/ClockinDropdown";
import NotificationActions from "redux/notifications/actions";
import moment from "moment";
import { addAttendance } from "redux/timeClock/service";

function ClockIn({ user }) {
  const [checkIn, setCheckIn] = useState({
    username: user.username,
    userId: user.id,
    shiftStart: false,
    shiftEnd: false,
    date: moment().format("YYYY-MM-DD"),
    totalTime: "",
    checkIn: "",
    checkOut: "",
    terminalId: 2,
  });

  const handleClock = (param) => {
    const time = moment().format("hh:mm:ss");
    var payload = { ...checkIn };
    if (param == "clock-in") {
      payload.shiftStart = true;
      payload.checkIn = time;
    }
    if (param == "clock-out") {
      payload.shiftEnd = true;
      payload.checkOut = time;
    }
    console.log(payload, "payload");
  };

  return (
    <div className="ClockIn-main">
      <div className="ClockIn-left">
        <div className="ClockIn-left-top">
          <p>Check In</p>
        </div>
        <div className="Change-Employee-clockin">
          <div className="Employee-name">
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        </div>
        <div className="password-clockin">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              setCheckIn({
                ...checkIn,
                password: e.target.value,
              })
            }
          />
          <ClockinDropdown
            user={user}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
          />
        </div>
        <div className="for-checkin-btn">
          <button
            onClick={() => handleClock("clock-in")}
            className={"clock-in"}
          >
            {"Clock-In"}
          </button>

          <button
            onClick={() => handleClock("clock-out")}
            className={"clock-out"}
          >
            {"Clock Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClockIn);
