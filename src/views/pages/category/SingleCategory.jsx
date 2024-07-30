import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import CategoryForm from "./CategoryForm";
import {
  updateCategoryDetails,
  getSpecificCategory,
} from "redux/category/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const CategorySingle = (props) => {
  const {
    categoryId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [categoryDetail, setCategoryDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getCityDetails();
  }, [categoryId]);

  const getCityDetails = async () => {
    getSpecificCategory(categoryId).then((res) => {
      setCategoryDetails(res.data);
      endLoader(false);
    });
  };

  const onCategorySave = async (updatedSupplier) => {
    return updateCategoryDetails(categoryId, updatedSupplier)
      .then((res) => {
        successWithTimeout(`Category updated successfully!`);
        props.history.push("/category/list");
      })
      .catch((err) =>
        failure(
          `Category #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
    <CategoryForm
      updateCategory={categoryDetail}
      categoryId={categoryId}
      onSave={onCategorySave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const categoryId = parseInt(ownProps.match.params.categoryId);
  return {
    categoryId: categoryId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(CategorySingle);
