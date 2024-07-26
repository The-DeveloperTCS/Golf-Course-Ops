import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "../../style/NewTeeSheet.css";
import moment from "moment";
import { addTeeSheet, updateTeeSheetDetails } from "redux/teeSheet/service";
import TeeSheetForm from "./TeeSheetForm";
import Loader from "components/loader/Loader";
import NotificationActions from "redux/notifications/actions";
import loaderActions from "redux/loader/actions";
import { getDateRangeSeasonsList } from "redux/season/service";
const { startLoader, endLoader } = loaderActions;
const { successWithTimeout, failureWithTimeout } = NotificationActions;

function NewTeeSheet(props) {
  const { timing } = props.location.state;
  const {
    startLoader,
    endLoader,
    loader,
    successWithTimeout,
    failureWithTimeout,
  } = props;

  const date = moment(timing, "HH:mm").toDate();
  const [teeSheet, setTeeSheet] = useState({
    date: moment().format("YYYY-MM-DD"),
    group_name: "tee-time",
    groupId: 1,
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
    startLoader(true);
    const item_list = [];
    var obj = {
      itemId: null,
      itemName: "",
      price: 0,
      quantity: 0,
      discount: 0,
      total: 0,
      seasonId: null,
      seasonName: "",
    };
    item_list.push(obj);
    setTeeSheet({
      ...teeSheet,
      item_list: item_list,
    });
    endLoader(false);
  }, []);

  const onSave = async (updatedTeeSheet) => {
    startLoader(true);
    return addTeeSheet(updatedTeeSheet)
      .then((res) => {
        successWithTimeout(`Tee Sheet add successfully!`);
        endLoader(false);
        props.history.push("/tee-sheet/list");
      })
      .catch((err) => {
        failureWithTimeout(
          "Failed to add new tee sheet, " + err.response.data.message
        );
        endLoader(false);
      });
  };

  const handleChaneCheckInTeeSheet = (updatedTeeSheet, bookedCustomer) => {
    startLoader(true);

    var sheet = {
      ...updatedTeeSheet,
      customer_list: bookedCustomer,
    };
    if (updatedTeeSheet.id) {
      updateTeeSheetDetails(sheet.id, sheet)
        .then((res) => {
          const id = res.data.updatedTeeSheet.saleId;
          successWithTimeout(`Tee Sheet updated successfully!`);
          endLoader(false);

          props.history.push(`/sale/${id}`);
        })
        .catch((err) => {
          endLoader(false);

          failureWithTimeout(
            `Tee Sheet #${updatedTeeSheet.id} failed to update! ${err.response.data.message}`
          );
        });
    }
    if (!updatedTeeSheet.id) {
      addTeeSheet(sheet)
        .then((res) => {
          console.log(res, "response");
          const id = res.data.teesheet.saleId;
          successWithTimeout(`Tee Sheet Add Successfully!`);
          endLoader(false);

          props.history.push(`/sale/${id}`);
        })
        .catch((err) => {
          console.log(err.response, "responseƒ");
          endLoader(false);

          failureWithTimeout(
            `Tee Sheet failed to add! ${err.response.data.message}`
          );
        });
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <TeeSheetForm
      updateTeeSheet={teeSheet}
      onSave={onSave}
      handleChaneCheckInTeeSheet={handleChaneCheckInTeeSheet}
    ></TeeSheetForm>
  );
}

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
})(NewTeeSheet);
