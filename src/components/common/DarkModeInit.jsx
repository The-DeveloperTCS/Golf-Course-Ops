import { useEffect } from "react";
import { connect } from "react-redux";
import { initDarkModeFromStore } from "util/toggleDarkMode";

const DarkModeInit = ({ init }) => {
  useEffect(() => {
    init();
  }, [init]);
  return null;
};

export default connect(null, (dispatch) => ({
  init: () => dispatch(initDarkModeFromStore()),
}))(DarkModeInit);
