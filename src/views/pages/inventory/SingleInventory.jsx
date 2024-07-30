import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import InventoryForm from "./InventoryForm";
import {
  updateInventoryDetails,
  getSpecificInventory,
} from "redux/inventory/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const InventorySingle = (props) => {
  const {
    inventoryId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [inventoryDetail, setInventoryDetails] = useState({});

  useEffect(() => {
    startLoader(true);
    getCityDetails();
  }, [inventoryId]);

  const getCityDetails = async () => {
    getSpecificInventory(inventoryId).then((res) => {
      setInventoryDetails(res.data);
      endLoader(false);
    });
  };

  const onInventorySave = async (updatedInventory) => {
    return updateInventoryDetails(inventoryId, updatedInventory)
      .then((res) => {
        successWithTimeout(`Inventory updated successfully!`);
        props.history.push("/inventory/list");
      })
      .catch((err) =>
        failure(
          `Inventory #${updatedInventory.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(InventorySingle);
