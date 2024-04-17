import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/PaginationWitAPI";
import ReactTableWrapper from "./reacttbl.style";
import { Table, Badge } from "reactstrap";
import { history } from "redux/store";
import { Link } from "react-router-dom";
import { fetchBrands } from "redux/catalog/service";

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
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetchBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);
  const getBrandName = (bId) => {
    if (bId !== null) {
      const brand = brands.filter((br) => br.id === bId);
      return brand[0]?.name;
    }
    return "";
  };
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
    prepareRow,
    page,
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

  const routePageItemOrSet = (i) => {
    if (i.set) {
      history.push(`/catalog/sets/${i.id}`);
    } else {
      history.push(`/catalog/items/${i.id}`);
    }
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="roe-card-style mt-15 mb-30">
        <div className="roe-card-header">
          <span className="hash"># </span> {props.title}
        </div>
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
                  <th>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.set ? (
                      <Link
                        target="_blank"
                        to={`/catalog/sets/${row.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <th scope="row">{row.id}</th>
                      </Link>
                    ) : (
                      <Link
                        target="_blank"
                        to={`/catalog/items/${row.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <th scope="row">{row.id}</th>
                      </Link>
                    )}
                    <td onClick={() => routePageItemOrSet(row)}>
                      {row.thumbnail && (
                        <img
                          alt={row.name}
                          style={{
                            width: "100px",
                          }}
                          src={row.thumbnail}
                        />
                      )}
                    </td>
                    <td onClick={() => routePageItemOrSet(row)}>{row.name}</td>
                    <td onClick={() => routePageItemOrSet(row)}>
                      {row.description}
                    </td>
                    <td onClick={() => routePageItemOrSet(row)}>
                      {getBrandName(row.brandId)}
                    </td>
                    <td onClick={() => routePageItemOrSet(row)}>{row.price}</td>
                    <td onClick={() => routePageItemOrSet(row)}>
                      {row.quantity}
                    </td>
                    <td>
                      {row.statusId === 1 ? (
                        <Badge className="c-success p-2">Enabled</Badge>
                      ) : (
                        <Badge className="c-secondary p-2">Disabled</Badge>
                      )}
                    </td>
                    <td>
                      <button
                        className="c-btn c-danger"
                        onClick={(e) => props.onDeleteRow(row.id, row)}
                      >
                        <i className="fa fa-window-close"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Pagination
          handleChangePage={props.handleChangePage}
          totalPages={props.totalPages}
          pageNo={props.pageNo - 1}
        />
      </div>
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

export default DataTable;
