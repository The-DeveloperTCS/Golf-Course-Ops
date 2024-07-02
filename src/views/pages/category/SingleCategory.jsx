import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import CategoryForm from "./CategoryForm";
import {
  updateCategoryDetails,
  getSpecificCategory,
} from "redux/category/service";

const CategorySingle = (props) => {
  const { categoryId } = props;
  const [categoryDetail, setCategoryDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [categoryId]);

  const getCityDetails = async () => {
    getSpecificCategory(categoryId).then((res) => {
      setCategoryDetails(res.data);
    });
  };

  const onCategorySave = async (updatedSupplier) => {
    return updateCategoryDetails(categoryId, updatedSupplier)
      .then((res) => {
        props.successWithTimeout(`Category updated successfully!`);
        props.history.push("/category/list");
      })
      .catch((err) =>
        props.failure(
          `Category #${updatedSupplier.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySingle);
