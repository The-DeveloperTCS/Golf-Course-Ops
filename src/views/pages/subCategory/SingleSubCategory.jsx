import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import SubCategoryForm from "./SubCategoryForm";
import {
  updateSubCategoryDetails,
  getSpecificSubCategory,
} from "redux/category/service";

const SingleSubCategory = (props) => {
  const { subCategoryId } = props;
  const [subCategoryDetail, setSubCategoryDetail] = useState({});

  useEffect(() => {
    getSpecificSubCategory(subCategoryId).then((res) => {
      setSubCategoryDetail(res.data);
    });
  }, [subCategoryId]);

  const onSubCategorySave = async (updatedSubCategory) => {
    return updateSubCategoryDetails(subCategoryId, updatedSubCategory)
      .then(() => {
        props.successWithTimeout(
          `Sub Category #${subCategoryId} updated successfully!`
        );
      })
      .catch((err) =>
        props.failure(
          `Sub Category #${subCategoryId} failed to update! ${err?.response
            ?.data?.message || err.message}`
        )
      );
  };

  return (
    <SubCategoryForm
      updateSubCategory={subCategoryDetail}
      subCategoryId={subCategoryId}
      onSave={onSubCategorySave}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  subCategoryId: parseInt(ownProps.match.params.subCategoryId, 10),
});

export default connect(mapStateToProps, (dispatch) => ({
  dispatch,
  ...bindActionCreators(NotificationActions, dispatch),
}))(SingleSubCategory);
