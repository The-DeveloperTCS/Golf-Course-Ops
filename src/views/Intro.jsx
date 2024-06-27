import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import { StockInfo } from "components/widgets/analyticsdashboard";
// import { fetchFreeDelivery } from "redux/freeDelivery/service";
import { StockSectionWrapper } from "components/widgets/analyticsdashboard/stockInfo/StockInfo.style";

class Intro extends Component {
  state = {
    applyFreeDelivery: false,
    minimumOrderValue: 0,
  };

  render() {
    const { applyFreeDelivery, minimumOrderValue } = this.state;
    return (
      <div>
        <PageTitle title="Dashboard" />

        {/* <div className="plr-15">
          <div className="row">
            <div className="col-md-12 pt-30">
              <StockInfo
                section1={{
                  title: "New Orders",
                  amount: "0",
                  description: "Total order this week",
                  direction: "up",
                  percent: "0",
                }}
                section2={{
                  title: "New Merchants",
                  amount: "0",
                  description: "Merchants signup this week",
                  direction: "up",
                  percent: "0",
                }}
                section3={{
                  title: "Free Delivery",
                  amount: minimumOrderValue,
                  applyFreeDelivery: applyFreeDelivery,
                  description: `Free delivery ${applyFreeDelivery ? "Enable" : "Disable"
                    }`,
                  // direction: "up",
                  // percent: "0",
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.themeChanger,
  };
};

export default connect(mapStateToProps, null)(Intro);
