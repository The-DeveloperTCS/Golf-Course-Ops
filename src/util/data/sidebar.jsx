export const sidebarData = [
  {
    name: "sidebar.intro",
    routepath: "/Intro",
    iconClass: "fas fa-chalkboard",
    resource: "",
  },
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
    name: "sidebar.access_management",
    routepath: "/access-management",
    iconClass: "fas fa-lock",
    resource: "ACCESS_MANAGEMENT",
  },
];
