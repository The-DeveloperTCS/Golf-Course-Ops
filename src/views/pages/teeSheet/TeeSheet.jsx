import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "components/loader/Loader";
import { DatePickerCalendar } from "react-nice-dates";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import StandardTable from "../tee-slot/Table";
import Weather from "./Weather";
import moment from "moment";
import { getTeeSheetByDate } from "redux/teeSheet/service";
import loaderActions from "redux/loader/actions";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";

const { startLoader, endLoader } = loaderActions;

function TeeSheet(props) {
  const { startLoader, endLoader, loader } = props;
  const [teeBooking, setTeeBooking] = useState([]);
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState(moment());
  const columns = ["Timings", "Names"];

  useEffect(() => {
    const date = moment();
    getTeeSheetDataByDate(date);
  }, []);

  const getTeeSheetDataByDate = (selectedDate) => {
    startLoader(true);
    setDate(selectedDate);
    const fromatDate = moment(selectedDate).format("YYYY-MM-DD");
    getTeeSheetByDate(fromatDate)
      .then((res) => {
        const data = res.data.teesheets;
        setTeeBooking(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    var x = {
      nextSlot: 9,
      startTime: "8:00:00",
      endTime: "18:00:00",
    };

    var slotTime = moment(x.startTime, "HH:mm:ss");
    var endTime = moment(x.endTime, "HH:mm:ss");

    let times = [];
    while (slotTime < endTime) {
      times.push(slotTime.format("HH:mm:ss"));
      slotTime = slotTime.add(x.nextSlot, "minutes");
    }
    const timesSlotsData = times.map((time) => {
      const dataFilter = teeBooking.filter((tee) => tee.start_time === time);
      if (dataFilter.length > 0) {
        return {
          ...dataFilter[0],
          timing: time,
        };
      }
      return {
        timing: time,
      };
    });
    setRows(timesSlotsData);
    endLoader(false);
  }, [teeBooking]);

  const onChangeNextDate = () => {
    let tomorrow = moment(date).add(1, "days");
    setDate(tomorrow);
    getTeeSheetDataByDate(tomorrow);
  };

  const onChangePreviousDate = () => {
    let yesterday = moment(date).subtract(1, "days");
    setDate(yesterday);
    getTeeSheetDataByDate(yesterday);
  };

  return loader ? (
    <Loader />
  ) : (
    <Container fluid>
      <h1></h1>
      <Row style={{ padding: 0 }}>
        <Col
          md={9}
          style={{
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Row>
            <Col
              className="p-4"
              sm={12}
              style={{
                backgroundColor: "#4365CF",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#4365CF",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  alignItems: "center",
                }}
              >
                <h4 style={styles.tableHeaderText}>Bookings</h4>
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#ffff",
                      fontSize: "20px",
                    }}
                    onClick={() => onChangePreviousDate()}
                  >
                    <FaLessThan />
                  </button>
                  <h4
                    style={{
                      color: "#ffff",
                      fontSize: "16px",
                      marginTop: "2px",
                    }}
                  >
                    {moment(date).format("dddd") +
                      " " +
                      moment(date).format("MMM Do YYYY")}
                  </h4>
                  <button
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#ffff",
                      fontSize: "20px",
                    }}
                    onClick={() => onChangeNextDate()}
                  >
                    <FaGreaterThan />
                  </button>
                </div>
              </div>
            </Col>
            <Col
              className="px-0"
              sm={12}
              style={{
                height: "calc(100vh - 188px)",
                overflowY: "auto",
              }}
            >
              <StandardTable columns={columns} rows={rows} />
            </Col>
          </Row>
        </Col>
        <Col
          md={3}
          style={{
            padding: 0,
            paddingLeft: 20,
          }}
        >
          <Row>
            <Col
              style={{
                backgroundColor: "white",
                maxHeight: "calc(60% - 10px)",
                minHeight: 270,
                borderRadius: 20,
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                className="px-2"
                style={{ height: "100%", maxWidth: "100%" }}
              >
                <DatePickerCalendar
                  date={new Date(date)}
                  onDateChange={(e) => getTeeSheetDataByDate(e)}
                  locale={enGB}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                maxHeight: "calc(60% - 10px)",
                width: "100%",
                marginTop: 20,
              }}
            >
              <div className="px-2" style={{ height: "100%", Width: "100%" }}>
                <Weather />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  h4Headings: {
    color: "white",
    font: "Poppins",
    fontWeight: 600,
    fontSize: 20,
  },
  tableHeaderText: {
    color: "white",
    font: "Poppins",
    fontWeight: 500,
    fontSize: 16,
  },
};

const mapStateToProps = (state) => {
  return {
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  startLoader,
  endLoader,
})(TeeSheet);
