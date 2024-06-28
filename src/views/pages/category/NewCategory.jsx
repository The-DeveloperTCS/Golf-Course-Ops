import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CategoryActions from "redux/category/action";
import NotificationActions from "redux/notifications/actions";
import { createCategories } from "redux/category/service";
import CategoryForm from "./CategoryForm";

const defaultCategory = {
  name: "",
  status: false,
};

const NewCategory = (props) => {
  const onSave = async (updatedCategory) => {
    return createCategories(updatedCategory)
      .then((res) => {
        props.successWithTimeout(
          `Category #${res.data.post.id} added successfully!`
        );
        props.history.push("/category/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new category, " + err.response.data.message
        )
      );
  };

  return (
    <CategoryForm
      updateCategory={defaultCategory}
      onSave={onSave}
    ></CategoryForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(CategoryActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewCategory);
