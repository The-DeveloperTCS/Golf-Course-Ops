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

  // async componentDidMount() {
  //   const res = await fetchFreeDelivery();
  //   const data = res.data;
  //   this.setState({
  //     applyFreeDelivery: data.freeDelivery,
  //     minimumOrderValue: data.minOrderValue,
  //   });
  // }

  render() {
    const { applyFreeDelivery, minimumOrderValue } = this.state;
    return (
      <div>
        <PageTitle title="sidebar.intro" />

        <div className="plr-15">
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
                  description: `Free delivery ${
                    applyFreeDelivery ? "Enable" : "Disable"
                  }`,
                  // direction: "up",
                  // percent: "0",
                }}
              />
              {/* <StockSectionWrapper className="stock-section"> */}
              {/* <div className="fs-18 header">Free Delivery</div>
              <div className="section-container">
                <div className="section-3">
                  <p className="fs-20 mt-15 bold-text">{minimumOrderValue}</p>
                  <p className="grey--text">{`Free delivery ${applyFreeDelivery ? "Enable" : "Disable"}`}</p>
                </div>
                <div className="section-1">
                 
                </div>
              </div> */}
              {/* </StockSectionWrapper> */}
            </div>
          </div>
        </div>
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
