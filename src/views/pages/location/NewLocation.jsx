import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LOcationActions from "redux/location/action";
import NotificationActions from "redux/notifications/actions";
import { createLocation } from "redux/location/service";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import LocationForm from "./LocationForm";
const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failureWithTimeout } = NotificationActions;
const defaultLocation = {
  name: "",
  destination: "",
  weather: "",
  time: null,
};

const NewLocation = (props) => {
  const {
    startLoader,
    endLoader,
    successWithTimeout,
    failureWithTimeout,
    loader,
  } = props;
  const onSave = async (updatedLocation) => {
    return createLocation(updatedLocation)
      .then((res) => {
        successWithTimeout(`Location #${res.data.post.id} added successfully!`);
        props.history.push("/location/list");
      })
      .catch((err) => {
        failureWithTimeout(
          "Failed to add new location, " + err.response.data.message
        );
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <LocationForm
      updateEmployee={defaultLocation}
      onSave={onSave}
    ></LocationForm>
  );
};

const mapStateToProps = (state) => {
  return {
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failureWithTimeout,
})(NewLocation);
