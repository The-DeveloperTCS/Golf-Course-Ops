export const sidebarData = [
  // {
  //   name: "sidebar.intro",
  //   routepath: "/Intro",
  //   iconClass: "fas fa-chalkboard",
  //   resource: "",
  // },
  {
    name: "sidebar.employee",
    routepath: "/employee",
    // iconClass: "fas fa-chalkboard",
    resource: "",
  },
  {
    name: "Tee Sheet",
    routepath: "/adminTeeSheet",
    imageUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMtSURBVHgBhZVLTBNBGMf/s9tSWqAWa42oiVsRja8oYjT4wOLBGPWAqAmaKMSLxgvo2UQ4ePDi42K4CYlRTsqRxAOPRGJCNNUYiYCwyLtQKEhLnzPOLIJ97MI/mW73++b77X+/mU4JDOSpqHNYckI1oPIZQnCYh5R/KRWMD8KaQdHR1tKo6tUTPWC2LVrLCKsjDA6sK1Lf9uZlw5rg81V3FUikPckdXLk8foBgUx5gywJCUaCrj+HzcApHBWXlye7JWtDTuwluHudACzL07osYzBAurYZ1nBpBhSqPiAenhDRjopWr4PM37j1Khi67NYauqKwoY4mUbFu4TgNrLQCrT5+xt+B/kSnbASKZU/JZeVuhuMzpZby3pFa4NnHPHuhIMudgQ2EpZH6NLowhHpoG5KzlYv4Qq7MIjHbzO19KHe+6w2qN1JhASDVYJthkyeNjebdZHIo20hU1uTLAQpQxj8ShmRVcRbvcWE92+wa4t+RkxIlEDonFU/SKhsbnsZ5mgjKGJoN6KUUyKnrxfgBTs0GspcevvxrmBFjVS/gCEXzoUQ0Lvw34MDi+YJRWJb5uXqNsa1c/FkMR3dzTlh4Yih9SfPESnUb54FIM3h/9iMeiKfHpqVHeptAaYNYsRSy2Ju46kJ7Lz8/Hgzu3UFp2EX8CE/DPTGJu1oexkQGYHXvw5OF9bHJuNEJ3yKr3U7jo4FEr3yQeESnc6cb1q1dQcekCCndsR659MyxWO+S4HxINwb6tBDkFJbDYcnG4+Cg2cgNjExMIh8Mrdhva3ja2yuLr9pJTXlM8UVV1rdJRcemiNlkoFIkjz2qG2ebEtOzAd9mFna79oJRh1L+oXbdtLUDZyRMaePj3iMqhl0Wttt06mp4HeF/Kj5UcUdPfaSqwhFic4tVgL5797MbU4iJ888uxZJ07W64Kxsp9yvHUOzSnMIm2s7QfjSQRfAz8Qt+SD7cLSpGgqWcAh6iESuV73fnqak3yBJHYt8PpppSm/NWIV/bHggglounQgJgboVJxMlTIBB0ddLvqufumBBIebqeaH4WKPx5URqNz2h7lH15GSGeMSk3FbmdAj/EXwnU11qG+DV4AAAAASUVORK5CYII=",
    iconClass: "",
    resource: "",
  },
  {
    name: "location",
    routepath: "/location",
    // iconClass: "fas fa-chalkboard",
    resource: "",
  },
  {
    name: "  Inventory",
    routepath: "/inventory",
    // iconClass: "fas fa-chalkboard",
    resource: "",
  },

  // {
  //   name: "adminTeeSheetSetting",
  //   routepath: "/adminTeeSheetSetting",
  //   iconClass: "fas fa-chalkboard",
  //   resource: "",
  // },
  // {
  //   name: "adminDashboardItems",
  //   routepath: "/adminDashboardItems",
  //   iconClass: "fas fa-chalkboard",
  //   resource: "",
  // },
  {
    name: "sidebar.payment",
    routepath: "/payment",
    iconClass: "fas fa-cogs",
    resource: "PAYMENT",
    child: [
      {
        listname: "Add Payment",
        routepath: "/payment",
        shortname: "AP",
        resource: "PAYMENT",
      },
      {
        listname: "Pending Payments",
        routepath: "/pending-payments",
        shortname: "BP",
        resource: "PENDING_PAYMENTS",
      },
      {
        listname: "Adv Payment Request",
        routepath: "/advance-payment-request",
        shortname: "APR",
        resource: "ADV_PAYMENT_REQUEST",
      },
      {
        listname: "Pending Adv Payments",
        routepath: "/peninding-advance-payments",
        shortname: "PAP",
        resource: "PENDING_ADV_PAYMENTS",
      },
      {
        listname: "sidebar.profit",
        routepath: "/profit/bulk-upload",
        shortname: "PF",
        resource: "PROFIT_BULK",
      },
    ],
  },
  {
    name: "sidebar.access_management",
    routepath: "/access-management",
    iconClass: "fas fa-lock",
    resource: "ACCESS_MANAGEMENT",
  },
];

export const HorizontalSidebarData = [
  {
    name: "sidebar.intro",
    routepath: "/Intro",
    iconClass: "fas fa-chalkboard",
    resource: "",
  },
  {
    name: "sidebar.AdminTeeSheet",
    routepath: "/adminTeeSheet",
    imageUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMtSURBVHgBhZVLTBNBGMf/s9tSWqAWa42oiVsRja8oYjT4wOLBGPWAqAmaKMSLxgvo2UQ4ePDi42K4CYlRTsqRxAOPRGJCNNUYiYCwyLtQKEhLnzPOLIJ97MI/mW73++b77X+/mU4JDOSpqHNYckI1oPIZQnCYh5R/KRWMD8KaQdHR1tKo6tUTPWC2LVrLCKsjDA6sK1Lf9uZlw5rg81V3FUikPckdXLk8foBgUx5gywJCUaCrj+HzcApHBWXlye7JWtDTuwluHudACzL07osYzBAurYZ1nBpBhSqPiAenhDRjopWr4PM37j1Khi67NYauqKwoY4mUbFu4TgNrLQCrT5+xt+B/kSnbASKZU/JZeVuhuMzpZby3pFa4NnHPHuhIMudgQ2EpZH6NLowhHpoG5KzlYv4Qq7MIjHbzO19KHe+6w2qN1JhASDVYJthkyeNjebdZHIo20hU1uTLAQpQxj8ShmRVcRbvcWE92+wa4t+RkxIlEDonFU/SKhsbnsZ5mgjKGJoN6KUUyKnrxfgBTs0GspcevvxrmBFjVS/gCEXzoUQ0Lvw34MDi+YJRWJb5uXqNsa1c/FkMR3dzTlh4Yih9SfPESnUb54FIM3h/9iMeiKfHpqVHeptAaYNYsRSy2Ju46kJ7Lz8/Hgzu3UFp2EX8CE/DPTGJu1oexkQGYHXvw5OF9bHJuNEJ3yKr3U7jo4FEr3yQeESnc6cb1q1dQcekCCndsR659MyxWO+S4HxINwb6tBDkFJbDYcnG4+Cg2cgNjExMIh8Mrdhva3ja2yuLr9pJTXlM8UVV1rdJRcemiNlkoFIkjz2qG2ebEtOzAd9mFna79oJRh1L+oXbdtLUDZyRMaePj3iMqhl0Wttt06mp4HeF/Kj5UcUdPfaSqwhFic4tVgL5797MbU4iJ888uxZJ07W64Kxsp9yvHUOzSnMIm2s7QfjSQRfAz8Qt+SD7cLSpGgqWcAh6iESuV73fnqak3yBJHYt8PpppSm/NWIV/bHggglounQgJgboVJxMlTIBB0ddLvqufumBBIebqeaH4WKPx5URqNz2h7lH15GSGeMSk3FbmdAj/EXwnU11qG+DV4AAAAASUVORK5CYII=",
    resource: "",
  },

  {
    name: "sidebar.access_management",
    routepath: "/access-management",
    iconClass: "fas fa-lock",
    resource: "ACCESS_MANAGEMENT",
  },
];
