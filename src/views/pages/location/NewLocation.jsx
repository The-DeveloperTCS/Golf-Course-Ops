import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LOcationActions from "redux/location/action";
import NotificationActions from "redux/notifications/actions";
import { createLocation } from "redux/location/service";
import LocationForm from "./LocationForm";

const defaultLocation = {
  name: "",
  destination: "",
  weather: "",
  time: null,
};

const NewLocation = (props) => {
  const onSave = async (updatedLocation) => {
    return createLocation(updatedLocation)
      .then((res) => {
        props.successWithTimeout(
          `Location #${res.data.post.id} added successfully!`
        );
        props.history.push("/location/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new location, " + err.response.data.message
        )
      );
  };

  return (
    <LocationForm
      updateEmployee={defaultLocation}
      onSave={onSave}
    ></LocationForm>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(LOcationActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewLocation);
