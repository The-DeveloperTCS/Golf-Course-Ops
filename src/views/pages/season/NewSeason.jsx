import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SeasonActions from "redux/season/action";
import NotificationActions from "redux/notifications/actions";
import { createSeasons } from "redux/season/service";
import SeasonForm from "./SeasonForm";

const defaultSeason = {
  name: "",
  status: false,
  startDate: "",
  endDate: "",
  season_list: [],
};

const NewSeason = (props) => {
  const onSave = async (updatedSeason) => {
    return createSeasons(updatedSeason)
      .then((res) => {
        props.successWithTimeout(
          `Season #${res.data.season.id} added successfully!`
        );
        props.history.push("/season/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new season, " + err.response.data.message
        )
      );
  };

  return <SeasonForm updateSeason={defaultSeason} onSave={onSave}></SeasonForm>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(SeasonActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(NewSeason);
