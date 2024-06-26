import notificationActions from "redux/notifications/actions";
import { getIntevoriesList } from "./service";
import loaderAction from "../loader/actions";

const inventoryActions = {
  INVENTORY_FETCHED_PAGINATION: "inventories/fetched/pagination",
  FAILURE: "inventories/failure",

  loaderOff: () => {
    return {
      type: loaderAction.END,
      loader: false,
    };
  },

  inventoriesFetchedPagination: (data) => {
    return {
      type: inventoryActions.INVENTORY_FETCHED_PAGINATION,
      inventories: data.inventories,
      total: data.pagination.totalInventories,
      pageLimit: data.pagination.limit,
      pageNo: data.pagination.currentPage,
    };
  },

  fetchInventoriesPagination: (limit, pageNo) => {
    return (dispatch) => {
      getIntevoriesList(limit, pageNo)
        .then((res) => {
          dispatch(inventoryActions.inventoriesFetchedPagination(res));
          dispatch(inventoryActions.loaderOff());
        })
        .catch((err) => {
          dispatch({
            type: inventoryActions.FAILURE,
            message: err.response.data.message,
          });
          dispatch(notificationActions.failure(err.response.data.message));
          dispatch(inventoryActions.loaderOff());
        });
    };
  },
};

export default inventoryActions;
