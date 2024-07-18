import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InventoryActions from "redux/inventory/action";
import NotificationActions from "redux/notifications/actions";
import { createInventorys } from "redux/inventory/service";
import InventoryForm from "./InventoryForm";

const defaultInventory = {
  name: "",
  glCode: "",
  productPicture: "",
  category: null,
  department: null,
  subCategory: null,
  unitCost: 0,
  unitPrice: 0,
  quantity: 0,
  taxableStatus: "Taxable",
  itemType: "",
  foodType: "",
  status: false,
};

const NewInventory = (props) => {
  const onSave = async (updatedInventory) => {
    return createInventorys(updatedInventory)
      .then((res) => {
        props.successWithTimeout(
          `Inventory #${res.data.inventory.id} added successfully!`
        );
        props.history.push("/inventory/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new inventory, " + err.response.data.message
        )
      );
  };

  return (
    <InventoryForm
      updateInventory={defaultInventory}
      onSave={onSave}
    ></InventoryForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(InventoryActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewInventory);
