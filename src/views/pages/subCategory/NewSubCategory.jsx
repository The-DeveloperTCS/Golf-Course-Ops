import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import { createSubCategories } from "redux/category/service";
import SubCategoryForm from "./SubCategoryForm";

const defaultSubCategory = {
  name: "",
  fName: "",
  categoryId: null,
  status: "Active",
};

const NewSubCategory = (props) => {
  const onSave = async (updatedSubCategory) => {
    return createSubCategories(updatedSubCategory)
      .then((res) => {
        props.successWithTimeout(
          `Sub Category #${res.data.id} added successfully!`
        );
        props.history.push("/sub-category/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add sub category, " +
            (err?.response?.data?.message || err.message)
        )
      );
  };

  return (
    <SubCategoryForm updateSubCategory={defaultSubCategory} onSave={onSave} />
  );
};

export default connect(null, (dispatch) => ({
  dispatch,
  ...bindActionCreators(NotificationActions, dispatch),
}))(NewSubCategory);
