import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableCustomers from "components/table/DataTableCustomers";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import CustomerActions from "redux/customer/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const { startLoader, endLoader } = loaderActions;
const { fetchCustomersPagination } = CustomerActions;

const CustomersList = (props) => {
  const {
    fetchCustomersPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [customersData, setCustomersData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useCustomerPermission = useRolePermissions("CUSTOMER");

  const handleChangePage = (event) => {
    fetchCustomersPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchCustomersPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchCustomersByValues();
  }, []);

  const fetchCustomersByValues = () => {
    fetchCustomersPagination(25, 1);
  };

  useMemo(() => {
    setCustomersData(props.customers);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.customers, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Customer ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Joining Date",
      id: "customerDateJoined",
      enableFilters: false,
    },
    {
      title: "First Name",
      id: "firstName",
      enableFilters: true,
    },
    {
      title: "Last Name",
      id: "lastName",
      enableFilters: false,
    },
    {
      title: "Phone No.",
      id: "phoneNumber",
      enableFilters: false,
    },
    {
      title: "Email",
      id: "emailAddress",
      enableFilters: false,
    },
    {
      title: "User Name",
      id: "username",
      enableFilters: false,
    },
    {
      title: "City",
      id: "city",
      enableFilters: false,
    },
    {
      title: "Status",
      id: "status",
      enableFilters: true,
    },
    {
      title: "Action",
      id: "action",
      enableFilters: false,
    },
  ]);

  return loader ? (
    <Loader />
  ) : (
    <div className="row ma-0">
      <div className="col-lg-12 ptb-15">
        <div className="roe-card-style">
          <div className="roe-card-header flex center">
            <div className="flex-1 mr-15 my-title ml-1">
              Customer List{" "}
              <span className="pull-right">
                {useCustomerPermission && (
                  <button
                    className="c-btn ma-5 add-new-btn-color"
                    onClick={() => props.history.push("/customer/new")}
                  >
                    <i className="fas fa-plus" /> New Customer
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableCustomers
              columns={columns}
              data={customersData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableCustomers>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customers: state.customer.customers,
    pageLimit: state.customer.pageLimit,
    pageNo: state.customer.pageNo,
    total: state.customer.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchCustomersPagination,
  startLoader,
  endLoader,
})(CustomersList);
