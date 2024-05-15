import React, { useState } from "react";
import "../../style/AdminSidebar1.css";

function AdminSidebar1() {
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  const handleItemHover = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className="adminSidebar1">
      <div className="page-selector">
        {items.map((item, index) => (
          <div key={index} onMouseEnter={() => handleItemHover(index)}>
            <button
              onClick={() => handleItemClick(index)}
              className={selectedItem === index ? "active" : ""}
            >
              {item.label}
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
    </div>
  );
}

export default AdminSidebar1;
