import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/Pagination";
import ReactTableWrapper from "./reacttbl.style";
import { Badge } from "reactstrap";
import { getCouriersList } from "redux/orders/service";
import { history } from "redux/store";

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
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    getCouriersList().then((res) => setCouriers(res.data));
  }, []);

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

  const getCourierName = (id) => {
    if (id) {
      const courier = couriers.filter((cr) => cr.id === id);
      return courier[0]?.name;
    }
    return "";
  };

  const onEdit = (cId, e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/city/" + cId);
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="roe-card-style mt-15 mb-30">
        <div className="roe-card-header">
          <span className="hash"># </span> {props.title}
        </div>
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
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
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
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        <div>
                          {header.canFilter ? header.render("Filter") : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.original.id}>
                    <th scope="row">{row.original.id}</th>

                    <td>{row.original.name}</td>
                    <td>{getCourierName(row.original.firstCourier)}</td>
                    <td>
                      {row.original.activeStatus ? (
                        <Badge className="c-success p-2">Enabled</Badge>
                      ) : (
                        <Badge className="c-secondary p-2">Disabled</Badge>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn c-btn-sm c-outline-primary ma-5"
                        onClick={(e) => onEdit(row.original.id, e)}
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
        <Pagination
          onPageChange={gotoPage}
          pages={pageCount}
          page={pageIndex}
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
