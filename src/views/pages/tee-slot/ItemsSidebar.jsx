import React, { useState, useEffect } from "react";
import "../../style/AdminSidebar1.css";
import { IoIosArrowForward } from "react-icons/io";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";

function ItemsSidebar({ inventories, onChangeItemAdd }) {
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

  const handleItemClick = (item, index) => {
    setSelectedItem(selectedItem === index ? null : index);

    if (index === 0) {
      setShowPaymentPopup(true);
    } else {
      setShowPaymentPopup(false);
    }
    onChangeItemAdd(item);
  };

  return (
    <div className="adminSidebar1">
      <div className="page-selector">
        {inventories.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleItemClick(item, index)}
              className={selectedItem === index ? "active" : ""}
            >
              {item.name}
              {/* {item.subPages && (
                <span className="sub-label-icon">
                  <IoIosArrowForward />
                </span>
              )} */}
            </button>
            {/* {item.subPages && selectedItem === index && (
              <div className="sub-menu">
                {item.subPages.map((subPage, subIndex) => (
                  <button key={subIndex}>{subPage.label}</button>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* {showPaymentPopup && <PaymentPopup onClose={handleClosePaymentPopup} />} */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsSidebar);
