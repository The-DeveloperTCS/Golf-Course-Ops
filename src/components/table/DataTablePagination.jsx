import React from "react";
import ReactTableWrapper from "./reacttbl.style";
import classnames from "classnames";
import Pagination from "components/common/PaginationWitAPI";
import { Link } from "react-router-dom";
import { history } from "redux/store";

export default function StickyHeadTable(props) {
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
                      column.id === "name" ? classesOrderSorted : ""
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
                {column.id === "name" ? (
                  <input
                    type="number"
                    value={props.orderIdValue || ""}
                    onChange={(e) => {
                      // props.setOrderIdValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      // props.onChangeFilter(props.orderIdValue || "", column.id);
                    }}
                    onKeyPress={(event) => {
                      // if (event.key === "Enter") {
                      //   props.onChangeFilter(
                      //     props.orderIdValue || "",
                      //     column.id
                      //   );
                      // }
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
                    // to={`/orders/${row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <td style={{ border: 0 }}>{row.id}</td>
                  </Link>

                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{""}</td>
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
