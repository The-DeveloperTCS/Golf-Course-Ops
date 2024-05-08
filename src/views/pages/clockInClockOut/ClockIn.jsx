import React, { useState } from "react";
import "../../style/ClockIn.css";
import ClockinDropdown from "../clockInClockOut/ClockinDropdown";
import ClockInTabel from "../clockInClockOut/ClockInTabel";
import { BsDash } from "react-icons/bs";

function ClockIn() {
  const dataForComponentB = [
    {
      id: 1,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 2,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 3,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 4,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 5,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 6,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 7,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 8,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 9,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 10,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 11,
      terminal: "Pro Shop",
      shiftStart: "10:00 AM",
      shiftEnd: "07:00 PM",
      totalTime: "09 Hours",
    },
    {
      id: 12,
      terminal: "Food & Beverage",
      shiftStart: "08:00 AM",
      shiftEnd: "05:00 PM",
      totalTime: "09 Hours",
    },
  ];

  const columnsA = [
    {
      width: 200,
      label: "Terminal",
      dataKey: "terminal",
    },
    {
      width: 120,
      label: "Shift Start",
      dataKey: "shiftStart",
      numeric: false,
    },
    {
      width: 120,
      label: "Shift End",
      dataKey: "shiftEnd",
      numeric: false,
    },
    {
      width: 120,
      label: "Total Time",
      dataKey: "totalTime",
      numeric: false,
    },
  ];
  const [clockInClicked, setClockInClicked] = useState(false);

  const handleClockIn = (event) => {
    event.preventDefault();
    // handle form submission here
    setClockInClicked(!clockInClicked); // Toggle clock in/out state
  };

  return (
    <div className="ClockIn-main">
      <div className="ClockIn-left">
        <div className="ClockIn-left-top">
          <p>Check In</p>
        </div>
        <div className="Change-Employee-clockin">
          <div className="Employee-name">
            <h3>Willie Chieves</h3>
          </div>
          <div className="Chanhe-Employee-name">
            <p>Change Employee</p>
          </div>
        </div>
        <div className="password-clockin">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" name="password" />
          <ClockinDropdown />
        </div>
        <div className="for-checkin-btn">
          <button
            onClick={handleClockIn}
            className={clockInClicked ? "clock-out" : "clock-in"}
          >
            {clockInClicked ? "clock out" : "clock in"}
          </button>
        </div>
      </div>
      {/* ClockIn-right */}
      <div className="ClockIn-right">
        <div className="ClockIn-left-top1">
          <p>Show Time clock history</p>
          <span>
            <BsDash />
          </span>
        </div>
        <div className="">
          <ClockInTabel data={dataForComponentB} columns={columnsA} />
        </div>
      </div>
    </div>
  );
}

export default ClockIn;
