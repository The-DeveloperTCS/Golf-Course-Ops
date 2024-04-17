import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { ScheduleReleaseItemDelete } from "redux/catalog/service";
import notificationActions from "redux/notifications/actions";
import { CSVLink } from "react-csv";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const localizer = momentLocalizer(moment);

function MyCalendar({ scheduleReleasedItem, getAllScheduleData }, props) {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [scheduleReleaseItemData, setScheduleReleaseItemData] = useState(null);
  const [itemsIdCSV, setItemsIdCSV] = useState([]);
  const [saving, setSaving] = useState(false);
  const useReleaseBulkPermission = useRolePermissions("BULK_RELEASE");

  useEffect(() => {
    if (scheduleReleaseItemData) {
      var ids = scheduleReleaseItemData.itemIds.split(",");
      const csvData = [["itemIds"]];
      for (var i in ids) {
        var arr = [ids[i]];
        csvData.push(arr);
      }
      setItemsIdCSV(csvData);
    }
  }, [scheduleReleaseItemData]);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: "#000",
        },
      }),
      ...(moment(start).hour() < 12 && {
        className: "powderBlue",
      }),
      ...(event.title.includes("Conference") && {
        className: "grey",
      }),
    }),
    []
  );

  const deleteScheduleReleasedItem = (id) => {
    setSaving(true);
    ScheduleReleaseItemDelete(id)
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
          title="Scheduled Release"
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
              {useReleaseBulkPermission && (
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
          <span>Title: {scheduleReleaseItemData?.title}</span>
          <br />
          <span>Description: {scheduleReleaseItemData?.desc}</span>
          <br />
          <span>
            Release Date:{" "}
            {moment(scheduleReleaseItemData?.start).format(
              "YYYY-MM-DD hh:mm A"
            )}
          </span>
          <br />
          <span>
            Item Ids: <CSVLink data={itemsIdCSV}>Download</CSVLink>
          </span>
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
            deleteScheduleReleasedItem(scheduleReleaseItemData.id);
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
              events={scheduleReleasedItem}
              onSelectEvent={(eventInfo) => {
                setScheduleReleaseItemData(eventInfo);
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
