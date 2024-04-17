import React, { useEffect, useState } from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table, Badge } from "reactstrap";
import { history } from "redux/store";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classnames from "classnames";
import Select from "react-select";

const itemStatusOptions = [
  { value: "", label: "Default" },
  { value: 1, label: "Enabled" },
  { value: 0, label: "Disabled" },
];

export default function StickyHeadTable(props) {
  let classesIdSorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.isSortedById,
    "-sort-desc": props.isSortedById,
  };
  let classesPriceSorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.isSortedByPrice,
    "-sort-desc": props.isSortedByPrice,
  };
  let classesQuantitySorted = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": !props.isSortedByQuantity,
    "-sort-desc": props.isSortedByQuantity,
  };

  const handleBrand = (newBrand) => {
    if (newBrand !== null) {
      const brand = props.brands.filter((br) => br.id === newBrand.id);
      props.onChangeFilter(brand[0].id, "brand");
      props.setSelectedBrand(brand[0]);
    } else {
      props.onChangeFilter("", "brand");
      props.setSelectedBrand(null);
    }
  };

  const routePageItemOrSet = (i) => {
    if (i.set) {
      history.push(`/catalog/sets/${i.id}`);
    } else {
      history.push(`/catalog/items/${i.id}`);
    }
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="table-container text-center overflow-auto">
        <Table
          striped
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <thead>
            <tr>
              {props.columns.map((column) => (
                <th>
                  {column.enableFilters ? (
                    <div
                      className={classnames(
                        column.id === "id"
                          ? classesIdSorted
                          : column.id === "price"
                          ? classesPriceSorted
                          : column.id === "quantity"
                          ? classesQuantitySorted
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
            </tr>
          </thead>
          <tbody>
            {props.columns.map((column) => (
              <td>
                {column.id === "id" ? (
                  <input
                    type="number"
                    value={props.itemIdValue || ""}
                    onChange={(e) => {
                      props.setItemIdValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(props.itemIdValue || "", column.id);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.itemIdValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    style={{ width: "80px" }}
                    placeholder={`Item ID`}
                  />
                ) : column.id === "name" ? (
                  <input
                    type="text"
                    value={props.searchItemNameValue || ""}
                    onChange={(e) => {
                      props.setSearchItemNameValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(
                        props.searchItemNameValue || "",
                        column.id
                      );
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.searchItemNameValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`Item Name`}
                  />
                ) : column.id === "description" ? (
                  <input
                    type="text"
                    value={props.searchItemDescriptionValue || ""}
                    onChange={(e) => {
                      props.setSearchItemDescriptionValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(
                        props.searchItemDescriptionValue || "",
                        column.id
                      );
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.searchItemDescriptionValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : column.id === "supplierSku" ? (
                  <input
                    type="text"
                    value={props.itemSkuValue || ""}
                    onChange={(e) => {
                      props.setItemSkuValue(e.target.value); // Set undefined to remove the filter entirely
                    }}
                    onBlur={(e) => {
                      props.onChangeFilter(props.itemSkuValue || "", column.id);
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        props.onChangeFilter(
                          props.itemSkuValue || "",
                          column.id
                        );
                      }
                    }}
                    className="tabl-search react-form-input"
                    placeholder={`${column.title}`}
                  />
                ) : column.id === "brand" ? (
                  <Autocomplete
                    id="Brands"
                    size={"small"}
                    options={props.brands}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brands"
                        variant="outlined"
                      />
                    )}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 210 }}
                    value={props.selectedBrand}
                    onChange={(_event, newBrand) => {
                      handleBrand(newBrand);
                    }}
                  />
                ) : column.id === "status" ? (
                  <React.Fragment>
                    <div className="c-btn ma-4 select-dropdown">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        value={
                          props.itemStatusOption !== null
                            ? itemStatusOptions.find(
                                (c) => c.value === props.itemStatusOption
                              )
                            : ""
                        }
                        onChange={(o) => {
                          props.setItemStatusOption(o.value);
                          props.onChangeFilter(o.value, "status");
                        }}
                        options={itemStatusOptions}
                      ></Select>
                    </div>
                  </React.Fragment>
                ) : null}
              </td>
            ))}

            {props.data.map((i) => (
              <tr
                key={i.id}
                // onClick={() => history.push(`/catalog/items/${i.id}`)}
              >
                {i.set ? (
                  <Link
                    target="_blank"
                    to={`/catalog/sets/${i.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {/* {" "} */}
                    <th scope="row">{i.id}</th>
                  </Link>
                ) : (
                  <Link
                    target="_blank"
                    to={`/catalog/items/${i.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {/* {" "} */}
                    <th scope="row">{i.id}</th>
                  </Link>
                )}
                <td onClick={() => routePageItemOrSet(i)}>
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
                <td onClick={() => routePageItemOrSet(i)}>{i.name}</td>
                <td onClick={() => routePageItemOrSet(i)}>{i.description}</td>
                <td onClick={() => routePageItemOrSet(i)}>{i.brandName}</td>
                <td onClick={() => routePageItemOrSet(i)}>{i.price}</td>
                <td onClick={() => routePageItemOrSet(i)}>{i.quantity}</td>
                <td>{i.supplierSku}</td>
                <td>
                  {i.statusId === 1 ? (
                    <Badge className="c-success p-2">Enabled</Badge>
                  ) : (
                    <Badge className="c-secondary p-2">Disabled</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.pageNo - 1}
      />
    </ReactTableWrapper>
  );
}
