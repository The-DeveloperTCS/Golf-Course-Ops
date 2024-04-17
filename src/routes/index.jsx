import Layout from "layouts/DashboardLayout.jsx";
import { Login, Error400, Error500 } from "./../views/pages/index";
// import PackingList from "./../views/pages/print/PackingList";
// import PackingListProcces from "./../views/pages/print/PackingListProcces";
// import SalesInvoice from "./../views/pages/invoices/SaleTaxInvoice";
// import CreditNotes from "./../views/pages/invoices/CreditNotes";

import BulkPackingList from "./../views/pages/print/BulkPackingList";

const indexRoutes = [
  { path: "/login", component: Login },
  // { path: "/print/packing-list", component: PackingList },
  // { path: "/print/procces-packing-list", component: PackingListProcces },
  // { path: "/print/bulk-packing-list/:location", component: BulkPackingList },
  // { path: "/print/sales-invoice/:orderId", component: SalesInvoice },
  // { path: "/print/credit-notes/:orderId", component: CreditNotes },

  { path: "/error400", component: Error400 },
  { path: "/error500", component: Error500 },
  { path: "/", component: Layout },
];

export default indexRoutes;
