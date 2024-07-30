import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableSubCaregories from "components/table/DataTableSubCaregories";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import SubCategoryActions from "redux/category/action";
const { startLoader, endLoader } = loaderActions;
const { fetchSubCategoriesPagination } = SubCategoryActions;

const SubCategoriesList = (props) => {
  const {
    fetchSubCategoriesPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (event) => {
    fetchSubCategoriesPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchSubCategoriesPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchSubCategoriesByValues();
  }, []);

  const fetchSubCategoriesByValues = () => {
    setTimeout(() => {
      fetchSubCategoriesPagination(25, 1);
    }, 2000);
  };

  useMemo(() => {
    setSubCategoriesData(props.subCategories);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.subCategories, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Sub-Category ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Parent Category",
      id: "fName",
      enableFilters: true,
    },
    {
      title: "Name",
      id: "name",
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
              Sub Category List{" "}
              <span className="pull-right">
                {/* {useSupplierPermission && ( */}
                <button
                  className="c-btn ma-5 add-new-btn-color"
                  onClick={() => props.history.push("/category/new")}
                >
                  <i className="fas fa-plus" /> New Sub Category
                </button>
                {/* )} */}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableSubCaregories
              columns={columns}
              data={subCategoriesData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></DataTableSubCaregories>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    subCategories: state.categories.subCategories,
    pageLimit: state.categories.pageLimit,
    pageNo: state.categories.pageNo,
    total: state.categories.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchSubCategoriesPagination,
  startLoader,
  endLoader,
})(SubCategoriesList);
