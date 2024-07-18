import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../../style/TeeSheetDropdown.css";

const TeeSheetDropdown = () => {
  const [openIndex, setOpenIndex] = useState(null); // Specify type as number | null
  const [hoveredOption, setHoveredOption] = useState(-1); // Specify type as number

  const handleHover = (index) => {
    // Explicitly define the type of index parameter
    setHoveredOption(index);
  };

  const handleLeave = () => {
    setHoveredOption(-1);
  };

  const handleOpen = (index) => {
    // Explicitly define the type of index parameter
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="Header-dropdown-main">
      <div className={`bottom_bottom_header_menus_parent`}>
        <div className="drop-dwon-heading">
          <p className="cursor-pointer" onClick={() => handleOpen(0)}>
            RESTRICTED - $16
          </p>
          <IoIosArrowDown
            className="cursor-pointer"
            onClick={() => handleOpen(0)}
          />
        </div>
        {openIndex === 0 && (
          <div className="menus flex-wrap bigger-dropdown">
            <ul style={{ color: "#30404D" }}>
              <li
                onMouseEnter={() => handleHover(0)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> RESTRICTED - $16</p>
              </li>
              <li
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> RESTRICTED - $16</p>
              </li>
              <li
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> RESTRICTED - $16</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeeSheetDropdown;
