import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import SubCategoryForm from "./SubCategoryForm";
import {
  updateSubCategoryDetails,
  getSpecificSubCategory,
} from "redux/category/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const SubCategorySingle = (props) => {
  const {
    subCategoryId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [subCategoryDetail, setSubCategoryDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getSubCategoryDetails();
  }, [subCategoryId]);

  const getSubCategoryDetails = async () => {
    getSpecificSubCategory(subCategoryId).then((res) => {
      setSubCategoryDetails(res.data);
      endLoader(false);
    });
  };

  const onSubCategorySave = async (updatedSubCategory) => {
    return updateSubCategoryDetails(subCategoryId, updatedSubCategory)
      .then((res) => {
        successWithTimeout(
          `Sub Category #${updatedSubCategory.id} updated successfully!`
        );
        props.history.push("/sub-category/list");
      })
      .catch((err) =>
        failure(
          `Sub Category #${updatedSubCategory.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
    <SubCategoryForm
      updateSubCategory={subCategoryDetail}
      subCategoryId={subCategoryId}
      onSave={onSubCategorySave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const subCategoryId = parseInt(ownProps.match.params.subCategoryId);
  return {
    subCategoryId: subCategoryId,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(SubCategorySingle);
