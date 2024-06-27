import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableInventories from "components/table/DataTableInventories";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import inventoryActions from "redux/inventory/action";
const { startLoader, endLoader } = loaderActions;
const { fetchInventoriesPagination } = inventoryActions;

const InventoriesList = (props) => {
  const {
    fetchInventoriesPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [inventoriesData, setInventoriesData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchInventoriesPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchInventoriesPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchInventoriesByValues();
  }, []);

  const fetchInventoriesByValues = () => {
    setTimeout(() => {
      fetchInventoriesPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setInventoriesData(props.inventories);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.inventories, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Inevtory ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Image",
      id: "productPicture",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: false,
    },
    {
      title: "GL Code",
      id: "glCode",
      enableFilters: true,
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
      title: "Sub Category",
      id: "subCategory",
      enableFilters: false,
    },
    {
      title: "Unit Cost",
      id: "unitCost",
      enableFilters: false,
    },
    {
      title: "Unit Price",
      id: "unitPrice",
      enableFilters: false,
    },
    {
      title: "Quantity",
      id: "quantity",
      enableFilters: false,
    },
    {
      title: "Item Type",
      id: "itemType",
      enableFilters: false,
    },
    {
      title: "Food Type",
      id: "foodType",
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
              Intentory List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 c-outline-info"
                  onClick={() => props.history.push("/inventory/new")}
                >
                  <i className="fas fa-plus" /> New Inventory
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableInventories
              columns={columns}
              data={inventoriesData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableInventories>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    inventories: state.inventory.inventories,
    pageLimit: state.inventory.pageLimit,
    pageNo: state.inventory.pageNo,
    total: state.inventory.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchInventoriesPagination,
  startLoader,
  endLoader,
})(InventoriesList);
