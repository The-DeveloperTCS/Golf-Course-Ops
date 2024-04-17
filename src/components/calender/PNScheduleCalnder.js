import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { SchedulePNDelete } from "redux/notifications/service";
import notificationActions from "redux/notifications/actions";
import { CSVLink } from "react-csv";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);

function MyCalendar({ schedulePN, getAllScheduleData }, props) {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [schedulePNData, setSchedulePNData] = useState(null);
  const [merchantIdsCSV, setMerchantIdsCSV] = useState([]);
  const [saving, setSaving] = useState(false);
  const usePushNotificationPermission = useRolePermissions("PUSH_NOTIFICATION");

  useEffect(() => {
    if (schedulePNData) {
      if (schedulePNData.merchantIds) {
        var ids = schedulePNData.merchantIds.split(",");
        const csvData = [["merchatIds"]];
        for (var i in ids) {
          var arr = [ids[i]];
          csvData.push(arr);
        }
        setMerchantIdsCSV(csvData);
      }
    }
  }, [schedulePNData]);

  const deleteSchedulePN = (id) => {
    setSaving(true);
    SchedulePNDelete(id)
      .then((res) => {
        setSaving(false);
        setConfirmDeleteModal(false);
        setConfirmModal(false);
        getAllScheduleData();
      })
      .catch((err) => {
        setSaving(false);
        setConfirmDeleteModal(false);
        setConfirmModal(false);
        getAllScheduleData();
        dispatch(
          notificationActions.failureWithTimeout(err.response.data.message)
        );
      });
  };

  return (
    <div>
      <React.Fragment>
        <SweetAlert
          title="Scheduled PN"
          show={confirmModal}
          showCancel
          closeOnClickOutside={true}
          allowEscape={false}
          showCloseButton={true}
          custom
          onCancel={() => {
            setConfirmModal(!confirmModal);
          }}
          customButtons={
            <React.Fragment>
              {usePushNotificationPermission && (
                <button
                  className="c-btn ma-5 c-danger"
                  loading={saving}
                  disabled={saving}
                >
                  <span>
                    <i
                      className="fas fa-trash"
                      onClick={() => {
                        setConfirmDeleteModal(true);
                      }}
                    ></i>
                  </span>
                </button>
              )}
            </React.Fragment>
          }
        >
          <span>Title: {schedulePNData?.title}</span>
          <br />
          <span>Body: {schedulePNData?.desc}</span>
          <br />
          <span>App link: {schedulePNData?.appLinks}</span>
          <br />
          <span>
            {schedulePNData?.cohortConfigName !== null
              ? "Cohort:"
              : schedulePNData?.merchantIds
              ? "Merchant IDs:"
              : "All Merchants"}
            {schedulePNData?.cohortConfigName !== null ? (
              schedulePNData?.cohortConfigName
            ) : schedulePNData?.merchantIds ? (
              <CSVLink data={merchantIdsCSV}>Download</CSVLink>
            ) : null}
          </span>
          <br />
          <span>
            Send Date:{" "}
            {moment(schedulePNData?.start).format("YYYY-MM-DD hh:mm A")}
          </span>
          <br />
          {schedulePNData?.imageUrl ? (
            <span>
              Image:{" "}
              <img
                src={schedulePNData?.imageUrl}
                alt="img"
                height="184"
                width="307"
                style={{ marginTop: "15px" }}
              />
            </span>
          ) : null}

          <hr />
        </SweetAlert>
      </React.Fragment>

      <React.Fragment>
        <SweetAlert
          title="Are you sure?"
          show={confirmDeleteModal}
          showCancel
          allowEscape={false}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          confirmBtnCssClass="sweet-alert-confirm-button"
          cancelBtnCssClass="sweet-alert-cancle-button"
          onConfirm={() => {
            setConfirmDeleteModal(false);
            deleteSchedulePN(schedulePNData.id);
          }}
          onCancel={() => {
            setConfirmDeleteModal(false);
          }}
        ></SweetAlert>
      </React.Fragment>
      <div className="row ma-0">
        <div className="col-lg-12 ptb-15">
          <div className="roe-card-style">
            <Calendar
              localizer={localizer}
              events={schedulePN}
              onSelectEvent={(eventInfo) => {
                setSchedulePNData(eventInfo);
                setConfirmModal(true);
              }}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(notificationActions, dispatch),
  };
};

MyCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);
