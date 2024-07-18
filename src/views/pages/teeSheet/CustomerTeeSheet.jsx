import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-nice-dates/build/style.css";
import StandardTable from "../tee-slot/Table";
import moment from "moment";
import { getTeeSheetByDate } from "redux/teeSheet/service";
import { DatePickerCalendar } from "react-nice-dates";
import { enGB } from "date-fns/locale";

function CustomerTeeSheet() {
  const [rows, setRows] = useState([]);
  const [teeBooking, setTeeBooking] = useState([]);
  const [date, setDate] = useState();

  const columns = ["Timings", "Names"];
  useEffect(() => {
    const date = moment();
    getTeeSheetDataByDate(date);
  }, []);

  const getTeeSheetDataByDate = (selectedDate) => {
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
    const arr = [];
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
  }, [teeBooking]);

  return (
    <Container fluid>
      <Row style={{ padding: 0 }}>
        <Col
          md={12}
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
              </div>
            </Col>
            <Col
              className="px-0"
              sm={12}
              style={{
                height: "calc(100vh - 271px)",
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
          <Col
            style={{
              backgroundColor: "white",
              maxHeight: "calc(50% - 10px)",
              minHeight: 270,
              borderRadius: 20,
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="px-2" style={{ height: "100%", maxWidth: "100%" }}>
              <DatePickerCalendar
                date={date}
                onDateChange={setDate}
                locale={enGB}
              />
            </div>
          </Col>
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
    fontWeight: 400,
    fontSize: 16,
  },
};

export default CustomerTeeSheet;
