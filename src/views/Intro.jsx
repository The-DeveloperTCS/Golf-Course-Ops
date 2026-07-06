import React from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import {
  StockInfo,
  MetricsWidget,
  CurrentStatisctics,
  CountChart,
  IncomeTable,
} from "components/widgets/analyticsdashboard";
import { getCollection } from "mock/mockDb";

const Intro = () => {
  const customers = getCollection("customers").length;
  const giftCards = getCollection("giftCards").length;
  const teeSheets = getCollection("teesheets").filter(
    (sheet) => sheet.date === new Date().toISOString().slice(0, 10)
  ).length;
  const employees = getCollection("employees").length;
  const salesTotal = getCollection("sales").length + 248;

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="plr-15">
        <div className="row">
          <div className="col-md-12 pt-30">
            <StockInfo
              section1={{
                title: "Today's Tee Times",
                amount: String(teeSheets),
                description: "Booked slots for today",
                direction: "up",
                percent: "12",
              }}
              section2={{
                title: "Active Customers",
                amount: String(customers),
                description: "Registered golfers",
                direction: "up",
                percent: "8",
              }}
              section3={{
                title: "Gift Cards Sold",
                amount: String(giftCards),
                description: "Active gift cards in system",
                direction: "up",
                percent: "5",
              }}
            />
          </div>
        </div>
        <div className="row pt-30">
          <div className="col-lg-4 col-md-6">
            <MetricsWidget
              cardTitle="Pro Shop Revenue"
              count1="$18,420"
              metric1="This week"
              count2="$3,260"
              metric2="Today"
              stackCount={salesTotal}
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <CurrentStatisctics
              block1={{
                title: "Staff On Duty",
                amount: String(Math.max(6, Math.floor(employees / 4))),
                percent: "4%",
                direction: "up",
                color: "#4365CF",
              }}
              block2={{
                title: "Cart Fleet Available",
                amount: String(
                  getCollection("carts").filter((c) => c.status === "Available")
                    .length
                ),
                percent: "2%",
                direction: "down",
                color: "#00C9A7",
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12">
            <CountChart
              icon="fas fa-golf-ball"
              title="Tee Sheet Utilization"
              subtitle="Today's booking rate"
              displayText={`${Math.min(
                100,
                Math.round((teeSheets / 50) * 100)
              )}%`}
              chartType="bar"
              bgColor="#4365CF"
            />
          </div>
        </div>
        <div className="row pt-30 pb-30">
          <div className="col-md-12">
            <IncomeTable
              title="Recent Pro Shop Sales"
              data={{
                headerFields: ["Sale ID", "Customer", "Items", "Total"],
                rowData: getCollection("sales")
                  .slice(0, 8)
                  .map((sale) => ({
                    field1: sale.saleID,
                    field2: sale.soldto,
                    field3: sale.items,
                    field4: sale.total,
                  })),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({ ...state.themeChanger }), null)(Intro);
