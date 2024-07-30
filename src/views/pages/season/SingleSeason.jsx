import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import SeasonForm from "./SeasonForm";
import { updateSeasonDetails, getSpecificSeason } from "redux/season/service";
const { successWithTimeout, failure } = NotificationActions;
const { startLoader, endLoader } = loaderActions;

const SeasonSingle = (props) => {
  const {
    seasonId,
    startLoader,
    endLoader,
    successWithTimeout,
    failure,
    loader,
  } = props;
  const [seasonDetail, setSeasonDetails] = useState({});

  useEffect(() => {
    startLoader(true);

    getSeasonDetails();
  }, [seasonId]);

  const getSeasonDetails = async () => {
    getSpecificSeason(seasonId).then((res) => {
      setSeasonDetails(res.data);
      endLoader(false);
    });
  };

  const onSeasonSave = async (updatedSeason) => {
    return updateSeasonDetails(seasonId, updatedSeason)
      .then((res) => {
        successWithTimeout(`Season updated successfully!`);
        props.history.push("/season/list");
      })
      .catch((err) =>
        failure(
          `Season #${updatedSeason.id} failed to update! ${err.response.data.message}`
        )
      );
  };

  return loader ? (
    <Loader />
  ) : (
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
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
  successWithTimeout,
  failure,
})(SeasonSingle);
