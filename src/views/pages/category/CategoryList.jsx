import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableCategories from "components/table/DataTableCategories";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import CategoryActions from "redux/category/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteCategories } from "redux/category/service";
const { startLoader, endLoader } = loaderActions;
const { fetchCategoriesPagination } = CategoryActions;

const CategoriesList = (props) => {
  const {
    fetchCategoriesPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [categoriesData, setCategoriesData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useCategoryPermission = useRolePermissions("CATEGORY");

  const handleChangePage = (event) => {
    fetchCategoriesPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchCategoriesPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchCategoriesByValues();
  }, []);

  const fetchCategoriesByValues = () => {
    fetchCategoriesPagination(25, 1);
  };

  const deleteCategory = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteCategories(id)
      .then((res) => {
        fetchCategoriesByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in category table");
      });
  };

  useMemo(() => {
    setCategoriesData(props.categories);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.categories, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Category ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Name",
      id: "name",
      enableFilters: true,
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
              Category List{" "}
              <span className="pull-right">
                {useCategoryPermission && (
                  <button
                    className="c-btn ma-5 add-new-btn-color"
                    onClick={() => props.history.push("/category/new")}
                  >
                    <i className="fas fa-plus" /> New Category
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableCategories
              columns={columns}
              data={categoriesData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteCategory={deleteCategory}
            ></DataTableCategories>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    pageLimit: state.categories.pageLimit,
    pageNo: state.categories.pageNo,
    total: state.categories.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchCategoriesPagination,
  startLoader,
  endLoader,
})(CategoriesList);
