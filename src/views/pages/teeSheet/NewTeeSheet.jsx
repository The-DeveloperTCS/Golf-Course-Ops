import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../style/NewTeeSheet.css";
import moment from "moment";
import { addTeeSheet } from "redux/teeSheet/service";
import TeeSheetForm from "./TeeSheetForm";
import NotificationActions from "redux/notifications/actions";

function NewTeeSheet(props) {
  const { timing } = props.location.state;
  const date = moment(timing, "HH:mm").toDate();

  const defaultState = {
    date: moment().format("YYYY-MM-DD"),
    group_name: "tee-time",
    groupId: 3,
    start_time: timing,
    end_time: moment(date)
      .add(9, "minutes")
      .format("HH:mm:ss"),
    holes: 9,
    persons: 1,
    cart_count: 1,
    customer_name: "",
    customerId: null,
    pay_mode: "reserved",
    comment: "",
    customer_list: [],
    employeeId: null,
    subTotal: 216,
    saleTax: 0,
    subTotal: 0,
    total: 216,
    item_list: [
      {
        item_id: 12,
        itemName: "Green Fee",
        quantity: 2,
        price: 60,
        discount: 5,
        total: 115.83,
      },
      {
        item_id: 13,
        itemName: "Ball Dozen",
        quantity: 2,
        total: 86.4,
        price: 48,
        discount: 10,
      },
    ],
  };

  const onSave = async (updatedTeeSheet) => {
    return addTeeSheet(updatedTeeSheet)
      .then((res) => {
        props.successWithTimeout(`Tee Sheet add successfully!`);
        props.history.push("/tee-sheet/list");
      })
      .catch((err) =>
        props.failureWithTimeout(
          "Failed to add new tee sheet, " + err.response.data.message
        )
      );
  };

  return (
    <TeeSheetForm updateTeeSheet={defaultState} onSave={onSave}></TeeSheetForm>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTeeSheet);
