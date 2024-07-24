import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../style/NewTeeSheet.css";
import moment from "moment";
import { addTeeSheet } from "redux/teeSheet/service";
import TeeSheetForm from "./TeeSheetForm";
import NotificationActions from "redux/notifications/actions";
import { getDateRangeSeasonsList } from "redux/season/service";

function NewTeeSheet(props) {
  const { timing } = props.location.state;
  const date = moment(timing, "HH:mm").toDate();
  const [teeSheet, setTeeSheet] = useState({
    date: moment().format("YYYY-MM-DD"),
    group_name: "tee-time",
    groupId: 3,
    start_time: timing,
    end_time: moment(date)
      .add(9, "minutes")
      .format("HH:mm:ss"),
    holes: 9,
    persons: 1,
    cart_count: 0,
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
    item_list: [],
    sale: true,
    return: false,
  });

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    getDateRangeSeasonsList(date)
      .then((res) => {
        const data = res.data.seasons;
        const item_list = [];

        for (var i in data) {
          var obj = {
            itemId: null,
            itemName: "",

            price: 0,
            quantity: 1,
            discount: 0,
            total: 0,
          };
          obj.seasonId = data[i].id;
          obj.seasonName = data[i].name;
          item_list.push(obj);
        }
        console.log(item_list, "item list");
        setTeeSheet({
          ...teeSheet,
          item_list: item_list,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const onSave = async (updatedTeeSheet) => {
    console.log(updatedTeeSheet, "updatedTeeSheet");
    // return addTeeSheet(updatedTeeSheet)
    //   .then((res) => {
    //     props.successWithTimeout(`Tee Sheet add successfully!`);
    //     props.history.push("/tee-sheet/list");
    //   })
    //   .catch((err) =>
    //     props.failureWithTimeout(
    //       "Failed to add new tee sheet, " + err.response.data.message
    //     )
    //   );
  };

  return (
    <TeeSheetForm updateTeeSheet={teeSheet} onSave={onSave}></TeeSheetForm>
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
