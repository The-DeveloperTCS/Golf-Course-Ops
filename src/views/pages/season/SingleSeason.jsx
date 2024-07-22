import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import SeasonForm from "./SeasonForm";
import { updateSeasonDetails, getSpecificSeason } from "redux/season/service";

const SeasonSingle = (props) => {
  const { seasonId } = props;
  const [seasonDetail, setSeasonDetails] = useState({});

  useEffect(() => {
    getSeasonDetails();
  }, [seasonId]);

  const getSeasonDetails = async () => {
    getSpecificSeason(seasonId).then((res) => {
      setSeasonDetails(res.data);
    });
  };

  const onSeasonSave = async (updatedSeason) => {
    return updateSeasonDetails(seasonId, updatedSeason)
      .then((res) => {
        props.successWithTimeout(`Season updated successfully!`);
        props.history.push("/season/list");
      })
      .catch((err) =>
        props.failure(
          `Season #${updatedSeason.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return (
    <SeasonForm
      updateSeason={seasonDetail}
      seasonId={seasonId}
      onSave={onSeasonSave}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const seasonId = parseInt(ownProps.match.params.seasonId);
  return {
    seasonId: seasonId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSingle);
