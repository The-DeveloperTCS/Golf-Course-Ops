import { getBannersList } from "./service";
import loaderAction from "../loader/actions";

const bannerActions = {
  BANNERS_FETCHED: "banners/fetched",

  loaderOff: () => ({
    type: loaderAction.END,
    loader: false,
  }),

  bannersFetched: (data) => ({
    type: bannerActions.BANNERS_FETCHED,
    banners: data.banners || data,
  }),

  bannersList: () => (dispatch) => {
    getBannersList().then((res) => {
      dispatch(bannerActions.bannersFetched(res.data));
      dispatch(bannerActions.loaderOff());
    });
  },
};

export default bannerActions;
