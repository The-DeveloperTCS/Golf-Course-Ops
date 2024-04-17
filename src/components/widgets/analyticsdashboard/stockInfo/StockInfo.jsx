import React from "react";
import { StockSectionWrapper, StockInfoWrapper } from "./StockInfo.style";

const StockInfo = ({ section1, section2, section3 }) => {
  return (
    <StockInfoWrapper className="roe-shadow-2 whitelight pa-25 flex">
      <StockSection {...section1} />
      {section2 && (
        <React.Fragment>
          <div className="vertical-hr" />
          <StockSection {...section2} />
        </React.Fragment>
      )}

      {section3 && (
        <React.Fragment>
          <div className="vertical-hr" />
          <StockSection {...section3} />
        </React.Fragment>
      )}
      {/* <StockSection {...section3} /> */}
    </StockInfoWrapper>
  );
};

const StockSection = ({
  title,
  amount,
  description,
  direction,
  percent,
  applyFreeDelivery,
}) => (
  <StockSectionWrapper className="stock-section" direction={direction}>
    <div className="fs-18 header">{title}</div>
    <div className="section-container">
      <div className="section-3">
        <p className="fs-20 mt-15 bold-text">{amount}</p>
        <p className="grey--text">{description}</p>
      </div>
      {!applyFreeDelivery ? (
        <div className="section-1">
          <i
            className={`fas ${
              direction === "up" ? "fa-arrow-up" : "fa-arrow-down"
            }`}
          />
          {percent}%
        </div>
      ) : null}
    </div>
  </StockSectionWrapper>
);

export default StockInfo;
