import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableCarts from "components/table/DataTableCarts";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import CartActions from "redux/cart/action";
const { startLoader, endLoader } = loaderActions;
const { fetchCartsPagination } = CartActions;

const CartsList = (props) => {
  const {
    fetchCartsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [cartsData, setCartsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchCartsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchCartsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchCartsByValues();
  }, []);

  const fetchCartsByValues = () => {
    setTimeout(() => {
      fetchCartsPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setCartsData(props.carts);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.carts, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Cart ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Item Name",
      id: "itemName",
      enableFilters: true,
    },
    {
      title: "Value",
      id: "value",
      enableFilters: true,
    },
    {
      title: "Customer Name",
      id: "customerName",
      enableFilters: false,
    },
    {
      title: "Expiry Date",
      id: "expirationDate",
      enableFilters: false,
    },
    {
      title: "Issue Date",
      id: "dateIssued",
      enableFilters: false,
    },
    {
      title: "Department",
      id: "department",
      enableFilters: false,
    },
    {
      title: "Category",
      id: "category",
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
              Cart List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 c-outline-info"
                  onClick={() => props.history.push("/cart/new")}
                >
                  <i className="fas fa-plus" /> New Cart
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableCarts
              columns={columns}
              data={cartsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableCarts>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cart.carts,
    pageLimit: state.cart.pageLimit,
    pageNo: state.cart.pageNo,
    total: state.cart.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchCartsPagination,
  startLoader,
  endLoader,
})(CartsList);
