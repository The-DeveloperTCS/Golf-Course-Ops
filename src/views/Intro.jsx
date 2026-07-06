import React from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
import { IncomeTable } from "components/widgets/analyticsdashboard";
import DashboardProCharts from "components/dashboard/DashboardProCharts";
import { getCollection } from "mock/mockDb";

const Intro = () => {
  const sales = getCollection("sales");

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="plr-15">
        <DashboardProCharts />
        <div className="row pt-30 pb-30">
          <div className="col-md-12">
            <IncomeTable
              title="Recent Pro Shop Sales"
              data={{
                headerFields: ["Sale ID", "Customer", "Items", "Total"],
                rowData: (sales.length
                  ? sales
                  : [
                      {
                        saleID: "S-1001",
                        soldto: "John Miller",
                        items: "Glove, Balls",
                        total: "$124.00",
                      },
                      {
                        saleID: "S-1002",
                        soldto: "Sarah Chen",
                        items: "Polo Shirt",
                        total: "$89.50",
                      },
                      {
                        saleID: "S-1003",
                        soldto: "Mike Torres",
                        items: "Range Bucket",
                        total: "$18.00",
                      },
                    ]
                )
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
