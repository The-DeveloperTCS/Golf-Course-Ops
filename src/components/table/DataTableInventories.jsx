import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import moment from "moment";
import ReactTableWrapper from "./reacttbl.style";
import { history } from "redux/store";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import loaderActions from "redux/loader/actions";
const { startLoader, endLoader } = loaderActions;

const HeaderComponent = (props) => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return <div className={classnames(classes)}>{props.title}</div>;
};

const DataTable = (props) => {
  const sortBy = useMemo(() => {
    return props.sortBy || [];
  }, [props.sortBy]);
  const columns = useMemo(
    () =>
      props.columns.map((c) => {
        const colDef = {
          Header: (tableInstance) => {
            return (
              <HeaderComponent
                isSortedDesc={tableInstance.column.isSortedDesc}
                title={c.title}
              />
            );
          },
          placeholder: c.title,
          accessor: c.field,
          disableFilters: !c.enableFilters,
        };

        if (c.id) {
          colDef.id = c.id;
        }

        if (c.cell) {
          colDef.Cell = c.cell;
        }
        if (c.enableFilters) {
          colDef.Filter = FilterComponent;
        }

        return colDef;
      }),
    [props.columns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      data: props.data,
      columns: columns,
      initialState: {
        pageSize: 25,
        pageIndex: 0,
        sortBy: sortBy,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const onEdit = (eId, e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/inventory/" + eId);
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="table-container text-center overflow-auto">
        <table
          border={1}
          className="custom-react-table-theme-class"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                    <div>{header.render("Header")}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => {
                  return (
                    <td
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      <div>
                        {header.canFilter ? header.render("Filter") : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}

            {props.data.map((row) => {
              return (
                <tr>
                  <Link
                    target="_blank"
                    to={`/inventory/${row.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <td style={{ border: 0 }}>{row.id}</td>
                  </Link>
                  <td>{row.product_picture}</td>
                  <td>{row.name}</td>
                  <td>{row.glCode}</td>
                  <td>{row.department}</td>
                  <td>{row.category}</td>
                  <td>{row.subCategory}</td>
                  <td>{row.unitCost}</td>
                  <td>{row.unitPrice}</td>
                  <td>{row.quantity}</td>
                  <td>{row.itemType}</td>
                  <td>{row.foodType}</td>
                  <td>{row.status}</td>
                  <td>
                    <button
                      className="btn c-btn-sm c-outline-danger ma-5"
                      onClick={(e) => props.deleteLocation(row.id, e)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn c-btn-sm c-outline-primary ma-5"
                      onClick={(e) => onEdit(row.id, e)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination onPageChange={gotoPage} pages={pageCount} page={pageIndex} />
    </ReactTableWrapper>
  );
};

const FilterComponent = (tableInstance) => {
  const { filterValue, setFilter } = tableInstance.column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="tabl-search react-form-input"
      placeholder={`${tableInstance.column.placeholder}`}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default connect(null, {
  startLoader,
  endLoader,
})(DataTable);
