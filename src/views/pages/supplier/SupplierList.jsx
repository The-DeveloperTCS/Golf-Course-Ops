import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableForSuppliers from "components/table/DataTableForSuppliers";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import SupplierActions from "redux/supplier/action";
import { deleteSuppliers } from "redux/supplier/service";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const { startLoader, endLoader } = loaderActions;
const { fetchSuppliersPagination } = SupplierActions;

const SuppliersList = (props) => {
  const {
    fetchSuppliersPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [suppliersData, setSuppliersData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useSupplierPermission = useRolePermissions("SUPPLIER");

  const handleChangePage = (event) => {
    fetchSuppliersPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchSuppliersPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchSuppliersByValues();
  }, []);

  const fetchSuppliersByValues = () => {
    setTimeout(() => {
      fetchSuppliersPagination(25, 1);
    }, 2000);
  };

  const deleteSupplier = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteSuppliers(id)
      .then((res) => {
        fetchSuppliersByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in supplier table");
      });
  };

  useMemo(() => {
    setSuppliersData(props.suppliers);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.suppliers, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Supplier ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Joining Date",
      id: "date",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
    },
    {
      title: "Company Name",
      id: "companyName",
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
      title: "Address",
      id: "address",
      enableFilters: false,
    },
    {
      title: "Registered",
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
              Supplier List{" "}
              <span className="pull-right">
                {useSupplierPermission && (
                  <button
                    className="c-btn ma-5 c-outline-info"
                    onClick={() => props.history.push("/supplier/new")}
                  >
                    <i className="fas fa-plus" /> New Supplier
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableForSuppliers
              columns={columns}
              data={suppliersData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteSupplier={deleteSupplier}
            ></DataTableForSuppliers>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    suppliers: state.supplier.suppliers,
    pageLimit: state.supplier.pageLimit,
    pageNo: state.supplier.pageNo,
    total: state.supplier.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchSuppliersPagination,
  startLoader,
  endLoader,
})(SuppliersList);
