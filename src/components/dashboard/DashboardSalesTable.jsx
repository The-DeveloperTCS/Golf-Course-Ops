import React, { useState, useMemo } from "react";

const DashboardSalesTable = ({ sales }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return sales.filter(
      (s) =>
        !q ||
        s.saleID?.toLowerCase().includes(q) ||
        s.soldto?.toLowerCase().includes(q)
    );
  }, [sales, search]);

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const pageRows = rows.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="dash-table-section dash-fade-in">
      <div className="dash-table-section__head">
        <div>
          <h3>Recent Pro Shop Sales</h3>
          <p>Transaction history with search and pagination</p>
        </div>
        <input
          type="search"
          className="dash-table-search"
          placeholder="Search sales..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((sale) => (
              <tr key={sale.id}>
                <td>
                  <code>{sale.saleID}</code>
                </td>
                <td>{sale.soldto}</td>
                <td>{sale.items}</td>
                <td>
                  <span
                    className={`dash-badge dash-badge--${sale.paymenttype}`}
                  >
                    {sale.paymenttype}
                  </span>
                </td>
                <td className="dash-table__amount">{sale.total}</td>
                <td>
                  <span className="dash-badge dash-badge--success">
                    {sale.payMode || "paid"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dash-table-pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DashboardSalesTable;
