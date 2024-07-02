import React, { useState, useEffect } from "react";
import "../../style/AdminSidebar1.css";
import { IoIosArrowForward } from "react-icons/io";
import PaymentPopup from "../PaymentPopup";

function AdminSidebar1() {
  const [selectedItem, setSelectedItem] = useState(0); // Initialize with 0 for Page 1
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const items = [
    { label: "Page 1", subPages: null },
    { label: "Page 2", subPages: null },
    { label: "Page 3", subPages: null },
    {
      label: "Page 4",
      subPages: [
        { label: "SubPage 1" },
        { label: "SubPage 2" },
        { label: "SubPage 3" },
      ],
    },
    {
      label: "Page 5",
      subPages: [
        { label: "SubPage 4" },
        { label: "SubPage 5" },
        { label: "SubPage 6" },
      ],
    },
    {
      label: "Page 6",
      subPages: [
        { label: "SubPage 7" },
        { label: "SubPage 8" },
        { label: "SubPage 9" },
      ],
    },
    {
      label: "Page 7",
      subPages: [
        { label: "SubPage 1" },
        { label: "SubPage 2" },
        { label: "SubPage 3" },
      ],
    },
  ];

  useEffect(() => {
    // Optionally, you can add any initialization logic here
    // if needed when the component mounts.
  }, []);

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);

    // Show payment popup when "Page 1" is clicked
    if (index === 0) {
      setShowPaymentPopup(true);
    } else {
      setShowPaymentPopup(false);
    }
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

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

      {showPaymentPopup && <PaymentPopup onClose={handleClosePaymentPopup} />}
    </div>
  );
}

export default AdminSidebar1;
