import React, { useEffect, useState } from "react";
import moment from "moment";
import ReactTableWrapper from "./reacttbl.style";
import { history } from "redux/store";
import classnames from "classnames";
import Pagination from "components/common/PaginationWitAPI";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  "@global": {
    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColot: "#000000",
    },
  },
});

export default function StickyHeadTable(props) {
  const [date, setDate] = useState(null);

  let classesOrderSorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.orderIdSorted,
    "-sort-desc": props.orderIdSorted,
  };

  let classesDateSorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.dateSorted,
    "-sort-desc": props.dateSorted,
  };

  let classesTotalSorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.totalSorted,
    "-sort-desc": props.totalSorted,
  };

  useEffect(() => {
    setDate(null);
  }, [props.status]);

  const onChangeDate = (e, id) => {
    setDate(e);
    props.onChangeFilter(moment(e).format("YYYY-MM-DD") || "", id);
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="table-container text-center overflow-auto">
        <table border={1} className="custom-react-table-theme-class">
          <thead>
            {props.columns.map((column) => (
              <th>
                {column.enableFilters ? (
                  <div
                    className={classnames(
                      column.id === "id"
                        ? classesOrderSorted
                        : column.id === "date"
                        ? classesDateSorted
                        : column.id === "total"
                        ? classesTotalSorted
                        : ""
                    )}
                    onClick={() => props.onSort(column.id)}
                  >
                    {column.title}
                  </div>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </thead>
          <tbody>
            {props.columns.map((column) => (
              <td>
                {column.id === "id" ? (
                  <input
                    type="number"
                    value={props.orderIdValue || ""}
                    onChange={(e) => {
                      props.setOrderIdValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(props.orderIdValue || "", column.id);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.orderIdValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : column.id === "date" ? (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      style={{ width: "50%" }}
                      label="Date"
                      inputFormat="dd-MM-yyyy"
                      value={date}
                      onChange={(e) => onChangeDate(e, column.id)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                ) : column.id === "merchant" ? (
                  <input
                    type="text"
                    value={props.searchMerchantValue || ""}
                    onChange={(e) => {
                      props.setSearchMerchantValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(
                        props.searchMerchantValue || "",
                        column.id
                      );
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.searchMerchantValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : column.id === "salesAgentId" ? (
                  <input
                    type="text"
                    value={props.searchSalesAgentValue || ""}
                    onChange={(e) => {
                      props.setSearchSalesAgentValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(
                        props.searchSalesAgentValue || "",
                        column.id
                      );
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.searchSalesAgentValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : column.id === "customer" ? (
                  <input
                    type="text"
                    value={props.searchCustomerValue || ""}
                    onChange={(e) => {
                      props.setSearchCustomerValue(
                        e.target.value || "",
                        column.id
                      ); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(
                        props.searchCustomerValue || "",
                        column.id
                      );
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.searchCustomerValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : null}
              </td>
            ))}
            {props.data.map((row) => {
              return (
                <tr>
                  <Link
                    target="_blank"
                    to={`/orders/${row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <td style={{ border: 0 }}>{row.id}</td>
                  </Link>
                  {props.columns.map(
                    (column) =>
                      column.id === "date" && (
                        <td onClick={() => history.push(`/orders/${row.id}`)}>
                          {moment(row.placedAt)
                            .local()
                            .format("DD-MM-YYYY")}
                        </td>
                      )
                  )}
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.merchant ? row.merchant : ""}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.salesAgent ? row.salesAgent : ""}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {!!row.customerName
                      ? row.customerName + " - " + row.customerPhone
                      : row.customerPhone}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.countPreOrder}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.total}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.receivedPayment}
                  </td>
                  <td onClick={() => history.push(`/orders/${row.id}`)}>
                    {row.balancePayment}
                  </td>

                  {props.columns.map(
                    (column) =>
                      column.id === "courier" && (
                        <td onClick={() => history.push(`/orders/${row.id}`)}>
                          {row.courierName ? row.courierName : ""}
                        </td>
                      )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.pageNo - 1}
      />
    </ReactTableWrapper>
  );
}
