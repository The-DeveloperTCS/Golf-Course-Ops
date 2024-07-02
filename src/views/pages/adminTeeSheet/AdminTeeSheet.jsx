import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DatePickerCalendar } from "react-nice-dates";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import StandardTable from "../tee-slot/Table";
import TeeSlot from "../tee-slot/tee-slot";
import Weather from "./Weather";
// import TeeSlot from "./common/tee-slot"
import moment from "moment";

function AdminTeeSheet() {
  const [date, setDate] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = ["Timings", "Names"];

  useEffect(() => {
    var x = {
      nextSlot: 9,
      startTime: "8:00",
      endTime: "18:00",
    };

    var slotTime = moment(x.startTime, "HH:mm");
    var endTime = moment(x.endTime, "HH:mm");

    let times = [];
    while (slotTime < endTime) {
      times.push(slotTime.format("HH:mm"));
      slotTime = slotTime.add(x.nextSlot, "minutes");
    }
    setTimeSlots(times);
  }, []);

  useEffect(() => {
    const rowsData = timeSlots.map((time, index) => {
      return {
        timing: time,
        slot1: (
          <TeeSlot
            backgroundColor="white"
            holes={18}
            playerName={"Cole (Badge)"}
            players={4}
          />
        ),
      };
    });
    // console.log(rows, 'rows')
    setRows(rowsData);
  }, [timeSlots]);

  // const rows = [
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: "",
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: "",
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: "",
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: "",
  //     slot4: "",
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="white"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: "",
  //     slot4: "",
  //   },
  //   {
  //     timing: "08:54 am",
  //     slot1: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"4 Cole (Badge)"}
  //       />
  //     ),
  //     slot2: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Shirk (Badge), Larry"}
  //       />
  //     ),
  //     slot3: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 McGowan Badge, Bill"}
  //       />
  //     ),
  //     slot4: (
  //       <TeeSlot
  //         backgroundColor="#E8EDFF"
  //         playerNumber={18}
  //         playerName={"1 Kuhle (Badge), Roger"}
  //       />
  //     ),
  //   },
  // ];

  return (
    <Container fluid>
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
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={FilterIcon}
                    height={10}
                    alt=""
                    style={{ marginRight: 5 }}
                  />
                  <h4 className="m-0" style={styles.tableHeaderText}>
                    Filter
                  </h4>
                </div> */}
              </div>
            </Col>

            {/* <Col
              className="px-0 py-4"
              sm={12}
              style={{
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InputGroup
                  style={{
                    width: 300,
                    marginLeft: 10,
                    border: "2px solid #E8EDFF",
                    borderRadius: 10,
                  }}
                >
                
                </InputGroup>
                <Button
                  style={{
                    backgroundColor: "#0CD374",
                    border: 0,
                    marginLeft: 10,
                    borderRadius: 10,
                  }}
                >
                  Add Note
                </Button>
                <Button
                  style={{
                    backgroundColor: "#F8AD15",
                    border: 0,
                    marginLeft: 10,
                    borderRadius: 10,
                  }}
                >
                  Standby List
                </Button>
                <Button
                  style={{
                    backgroundColor: "#E92A2A",
                    border: 0,
                    marginLeft: 10,
                    borderRadius: 10,
                  }}
                >
                  Prices
                </Button>
                <Button
                  style={{
                    backgroundColor: "#5110BA",
                    border: 0,
                    marginLeft: 10,
                    borderRadius: 10,
                  }}
                >
                  Toggle Back 09
                </Button>
              </div>
            </Col> */}

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
                  date={date}
                  onDateChange={setDate}
                  locale={enGB}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                // backgroundColor: "white",
                maxHeight: "calc(60% - 10px)",
                // minHeight: 270,
                width: "100%",
                // borderRadius: 20,
                // alignItems: "center",
                // position: "relative",
                marginTop: 20,
              }}
            >
              <div className="px-2" style={{ height: "100%", Width: "100%" }}>
                <Weather
                // date={date}
                // onDateChange={setDate}
                // locale={enGB}
                />
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
    fontWeight: 400,
    fontSize: 16,
  },
};

export default AdminTeeSheet;
