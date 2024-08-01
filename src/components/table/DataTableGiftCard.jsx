import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import classnames from "classnames";
import Pagination from "components/common/PaginationWitAPI";
import ReactTableWrapper from "./reacttbl.style";
import { history } from "redux/store";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import loaderActions from "redux/loader/actions";
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "../../views/style/CoustomPopup.css";
import { getAllCategories } from "redux/category/service";
import { allDepartments } from "redux/department/service";
import { getCustomers } from "redux/customer/service";
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
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customersList, setCustomersList] = useState([]);

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

  useEffect(() => {
    allDepartments()
      .then((res) => {
        const data = res.data.departments;
        setDepartments(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    getAllCategories()
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    getCustomers()
      .then((res) => {
        const data = res.data.customers;
        setCustomersList(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const getCustomerName = (id) => {
    if (
      id !== "" &&
      id !== undefined &&
      id !== null &&
      customersList.length > 0
    ) {
      return customersList.filter((cus) => cus.id === id)[0]?.name;
    }
    return "";
  };

  const getDepartmentName = (id) => {
    if (
      id !== "" &&
      id !== undefined &&
      id !== null &&
      departments.length > 0
    ) {
      return departments.filter((cus) => cus.id === id)[0]?.name;
    }
    return "";
  };

  const getCategoryName = (id) => {
    if (id !== "" && id !== undefined && id !== null && categories.length > 0) {
      return categories.filter((cus) => cus.id === id)[0]?.name;
    }
    return "";
  };

  const onEdit = (eId, e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/gift-card/" + eId);
  };

  const onDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Perform delete action here
    props.deleteGiftCard(deleteItemId);
    // Close modal and reset deleteItemId
    setShowDeleteModal(false);
    setDeleteItemId(null);
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
            {props.data.map((row) => (
              <tr key={row.id}>
                <Link
                  target="_blank"
                  to={`/gift-card/${row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <td style={{ border: 0 }}>{row.id}</td>
                </Link>
                <td>{row.giftCardNumber}</td>
                <td>{getCustomerName(row.customerId)}</td>
                <td>{row.customName}</td>
                <td>{getDepartmentName(row.departmentId)}</td>
                <td>{getCategoryName(row.categoryId)}</td>
                <td>{moment(row.dateIssued).format("LL")}</td>
                <td>{moment(row.expirationDate).format("LL")}</td>
                <td>
                  {row.status ? (
                    <Badge className="c-success p-2">Active</Badge>
                  ) : (
                    <Badge className="c-secondary p-2">In-Active</Badge>
                  )}
                </td>
                <td>
                  <button
                    className="btn c-btn-sm c-outline-danger ma-5"
                    onClick={() => onDelete(row.id)}
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
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.pageNo - 1}
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
        <ModalHeader style={{ textAlign: "center" }}>
          <p style={{ color: "#E92A2A", textAlign: "center" }}>
            Confirm Delete
          </p>{" "}
        </ModalHeader>
        <ModalBody>
          <p style={{ color: "#C8C8C8", textAlign: "center" }}>
            {" "}
            Are you about delete this action ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className="yes-btn" onClick={confirmDelete}>
            Yes
          </Button>{" "}
          <Button className="no-btn" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
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
