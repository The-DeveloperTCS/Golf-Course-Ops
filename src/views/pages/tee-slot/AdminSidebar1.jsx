import React, { useState, useEffect } from "react";
import "../../style/AdminSidebar1.css";
import { IoIosArrowForward } from "react-icons/io";
import PaymentPopup from "../PaymentPopup";

function AdminSidebar1() {
  const [selectedItem, setSelectedItem] = useState(0); // Initialize with 0 for Page 1
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const items = [
    { label: "Overview", subPages: null },
    { label: "Players", subPages: null },
    { label: "Scores", subPages: null },
    {
      label: "Holes",
      subPages: [{ label: "Hole 1" }, { label: "Hole 2" }, { label: "Hole 3" }],
    },
    {
      label: "Leaderboard",
      subPages: [
        { label: "Top Players" },
        { label: "Monthly Winners" },
        { label: "All Time Stats" },
      ],
    },
    {
      label: "Settings",
      subPages: [
        { label: "Course Settings" },
        { label: "Player Settings" },
        { label: "Admin Settings" },
      ],
    },
    {
      label: "Reports",
      subPages: [
        { label: "Player Reports" },
        { label: "Course Analytics" },
        { label: "Financial Reports" },
      ],
    },
  ];

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);

    if (index === 0) {
      setShowPaymentPopup(true);
    } else {
      setShowPaymentPopup(false);
    }
  };

  // const handleClosePaymentPopup = () => {
  //   setShowPaymentPopup(false);
  // };

  return (
    <div className="adminSidebar1">
      <div className="page-selector">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleItemClick(index)}
              className={selectedItem === index ? "active" : ""}
            >
              {item.label}
              {item.subPages && (
                <span className="sub-label-icon">
                  <IoIosArrowForward />
                </span>
              )}
            </button>
            {item.subPages && selectedItem === index && (
              <div className="sub-menu">
                {item.subPages.map((subPage, subIndex) => (
                  <button key={subIndex}>{subPage.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* {showPaymentPopup && <PaymentPopup onClose={handleClosePaymentPopup} />} */}
    </div>
  );
}

export default AdminSidebar1;
