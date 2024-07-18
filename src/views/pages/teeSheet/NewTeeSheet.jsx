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
    item_list: [
      {
        item_id: 12,
        name: "Green Fee",
        glCode: "green",
        department: 2,
        category: 7,
        subCategory: 6,
        unitCost: 50,
        unitPrice: 60,
        taxableStatus: "Taxable",
        quantity: 2,
        itemType: "retail",
        foodType: "delivery",
        productPicture:
          "https://thegolfnewsnet.com/wp-content/uploads/2020/09/03_15WingedFootEast-2048x1152.jpg",
      },
      {
        item_id: 13,
        name: "Ball Dozen",
        glCode: "balls",
        department: 2,
        category: 7,
        subCategory: 6,
        unitCost: 40,
        unitPrice: 48,
        taxableStatus: "Taxable",
        quantity: 2,
        itemType: "retail",
        foodType: "delivery",
        productPicture:
          "https://golfballs.ca/wp-content/uploads/2023/06/Assorted-Brands-Used-Golf-Balls.jpg",
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
