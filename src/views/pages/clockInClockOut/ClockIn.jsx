import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../style/ClockIn.css";
import ClockinDropdown from "../clockInClockOut/ClockinDropdown";
import NotificationActions from "redux/notifications/actions";
import moment from "moment";
import {
  checkInnClock,
  checkOutClock,
  getLastCheckIn,
} from "redux/timeClock/service";

const { successWithTimeout, failureWithTimeout } = NotificationActions;

function ClockIn({ user }, props) {
  const [checkIn, setCheckIn] = useState({
    username: user.username,
    userId: user.id,
    date: moment().format("YYYY-MM-DD"),
    terminalId: null,
  });
  const [date, setdate] = useState(moment().format("YYYY-MM-DD"));
  const [timeIn, setTimeIn] = useState(false);

  useEffect(() => {
    fetchToCheckIn();
  }, [user]);

  const fetchToCheckIn = () => {
    getLastCheckIn(date, user?.id)
      .then((res) => {
        const data = res.data?.timeSheet;
        if (data) {
          setTimeIn(true);
          setCheckIn({
            ...checkIn,
            terminalId: data.terminalId,
          });
        } else {
          setTimeIn(false);
        }
      })
      .catch((err) => {
        NotificationActions.failureWithTimeout(
          "Failed to fetch, " + err.response.data.message
        );
      });
  };

  const handleClock = (param) => {
    const time = moment().format("hh:mm:ss");
    var payload = { ...checkIn };
    if (param == "clock-in") {
      payload.shiftStart = true;
      payload.checkIn = time;
      checkInnClock(payload)
        .then((res) => {
          successWithTimeout("Clock In time!");
          fetchToCheckIn();
        })
        .catch((err) => {
          failureWithTimeout(
            "Failed to clock In, " + err.response.data.message
          );
        });
    }
    if (param == "clock-out") {
      payload.shiftEnd = true;
      payload.checkOut = time;
      checkOutClock(payload)
        .then((res) => {
          successWithTimeout("Clock Out time!");
          fetchToCheckIn();
        })
        .catch((err) => {
          failureWithTimeout(
            "Failed to clock Out, " + err.response.data.message
          );
        });
    }
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
          {!timeIn ? (
            <button
              onClick={() => handleClock("clock-in")}
              className={"clock-in"}
            >
              {"Clock-In"}
            </button>
          ) : (
            <button
              onClick={() => handleClock("clock-out")}
              className={"clock-out"}
            >
              {"Clock Out"}
            </button>
          )}
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
