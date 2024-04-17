import React, { useState } from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";

export default function StickyHeadTable(props) {
  const [itemId, setItemId] = useState("");
  return (
    <ReactTableWrapper {...props}>
      <Table striped>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th>
                {column.enableFilters ? (
                  <div>{column.title}</div>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.columns.map((column) => (
            <td>
              {column.id === "checkBoxes" ? (
                <input
                  style={{
                    accentColor: "#00c486",
                    width: "16px",
                    height: "16px",
                    marginTop: "15px",
                  }}
                  type="checkbox"
                  checked={props.checkedAll}
                  onChange={(e) => {
                    props.selectAllReleasedItems(e.target.checked);
                  }}
                />
              ) : null}
              {column.id === "itemId" ? (
                <input
                  type="number"
                  value={itemId || ""}
                  onBlur={(e) => {
                    props.onChangeFilter(itemId || "", column.id); // Set undefined to remove the filter entirely
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      props.onChangeFilter(itemId || "", column.id);
                    }
                  }}
                  onChange={(e) => {
                    setItemId(e.target.value);
                  }}
                  className="tabl-search react-form-input"
                  style={{
                    width: "140px",
                    marginLeft: "-4px",
                    marginRight: "-15px",
                  }}
                  placeholder={`Search by Item ID`}
                />
              ) : null}
            </td>
          ))}

          {props.data.map((i) => (
            <tr key={i.id}>
              <th>
                <input
                  style={{
                    accentColor: "#00c486",
                    width: "16px",
                    height: "16px",
                    marginTop: "3px",
                  }}
                  type="checkbox"
                  checked={i.unreleased}
                  onChange={(e) => {
                    props.selectReleasedItems(e.target.checked, i.id);
                  }}
                />
              </th>
              {/* <Link
                target="_blank"
                to={`/catalog/items/${i.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <th scope="row">{i.id}</th>
              </Link> */}
              {i.set ? (
                <Link
                  target="_blank"
                  to={`/catalog/sets/${i.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <th scope="row">{i.id}</th>
                </Link>
              ) : (
                <Link
                  target="_blank"
                  to={`/catalog/items/${i.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <th scope="row">{i.id}</th>
                </Link>
              )}
              <td>
                {i.thumbnail && (
                  <img
                    alt={i.name}
                    style={{
                      width: "100px",
                    }}
                    src={i.thumbnail}
                  />
                )}
              </td>
              <td>{i.name}</td>
              <td>{i.parentCategory}</td>
              <td>{i.childCategory}</td>
              <td>{i.brand}</td>
              <td>{i.quantity}</td>
              <td>{i.latestCostPrice}</td>
              <td>{i.price}</td>
              <td>
                {moment(i.createdAt)
                  .local()
                  .format("YYYY-MM-DD hh:mm a")}
              </td>
              <td>
                {i.releaseDate &&
                  moment(i.releaseDate)
                    .local()
                    .format("YYYY-MM-DD hh:mm a")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.unreleasedItemsPageNo - 1}
      />
    </ReactTableWrapper>
  );
}
