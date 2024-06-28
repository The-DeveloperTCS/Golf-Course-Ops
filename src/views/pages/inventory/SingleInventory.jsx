import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import InventoryForm from "./InventoryForm";
import {
  updateInventoryDetails,
  getSpecificInventory,
} from "redux/inventory/service";

const InventorySingle = (props) => {
  const { inventoryId } = props;
  const [inventoryDetail, setInventoryDetails] = useState({});

  useEffect(() => {
    getCityDetails();
  }, [inventoryId]);

  const getCityDetails = async () => {
    getSpecificInventory(inventoryId).then((res) => {
      setInventoryDetails(res.data);
    });
  };

  const onInventorySave = async (updatedInventory) => {
    return updateInventoryDetails(inventoryId, updatedInventory)
      .then((res) => {
        props.successWithTimeout(`Inventory updated successfully!`);
        props.history.push("/inventory/list");
      })
      .catch((err) =>
        props.failure(
          `Inventory #${updatedInventory.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <InventoryForm
      updateInventory={inventoryDetail}
      inventoryId={inventoryId}
      onSave={onInventorySave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const inventoryId = parseInt(ownProps.match.params.inventoryId);
  return {
    inventoryId: inventoryId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventorySingle);
