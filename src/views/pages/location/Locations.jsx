import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Form, Modal } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify"
import moment from "moment";
import StandardTable from "../tee-slot/Table";
import HttpService from "../services/http-service";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationList,
  getSpecificLocation,
} from "../../../Constants";

function Locations() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  const columns = ["Location", "Destination", "Weather", "Time"];
  const locationFields = ["location", "destination", "weather", "time"];

  const modifyLocation = async (location) => {
    const fullLocationObject = locations?.find((e) => {
      return e.time === location.time;
    });

    setLocationData(fullLocationObject);
  };

  const getLocationsList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { message, data },
      } = await HttpService.getLocationsList({
        query: { page: 1, limit: 100 },
      });

      setLocations(data);
    } catch (err) {
      //   toast.error(err.data?.message)
    } finally {
      setIsLoading(false);
    }
  };

  const createLocation = async () => {
    const data = {
      ...locationData,
      time: moment(locationData.time).format("h:mm:ss"),
    };
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.createLocation({ body: data });
      setLocationData({});
      setIsShowModal(false);

      getLocationsList();
      //   toast.success(message)
    } catch (err) {
      setIsLoading(false);
      //   toast.error(err.data?.message)
    }
  };

  const updateLocation = async () => {
    let mappedLocationData = {};

    for (let key in locationData) {
      if (locationFields.includes(key)) {
        mappedLocationData[key] = locationData[key];
      }
    }

    setLocationData(mappedLocationData);
    try {
      setIsLoading(true);

      const {
        data: { message },
      } = await HttpService.updateLocation({
        params: locationData.id,
        body: mappedLocationData,
      });

      getLocationsList();
      setIsShowModal(false);
      //   toast.success(message)
    } catch (err) {
      setIsLoading(false);
      //   toast.error(err.data?.error)
    }
  };

  const deleteLocation = async () => {
    try {
      setIsLoading(true);

      const {
        data: { message },
      } = await HttpService.deleteLocation({
        params: locationData.id,
      });

      getLocationsList();
      setIsShowModal(false);
      //   toast.success(message)
    } catch (err) {
      setIsLoading(false);

      //   toast.error(err.data?.error)
    }
  };

  useEffect(() => {
    getLocationsList();
  }, []);

  return (
    <Container fluid>
      {/* <ToastContainer /> */}
      <Modal
        className="right"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isLocationFocused ? "Location Details" : "Add Location"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col>
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={locationData.location}
                onChange={(e) => {
                  setLocationData({
                    ...locationData,
                    location: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                value={locationData.destination}
                onChange={(e) => {
                  setLocationData({
                    ...locationData,
                    destination: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label>Weather</Form.Label>
              <Form.Control
                value={locationData.weather}
                onChange={(e) => {
                  setLocationData({ ...locationData, weather: e.target.value });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2" style={{ marginTop: "30px" }}>
              {/* <Form.Label htmlFor="inputPassword5">Time</Form.Label> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time Picker"
                  value={locationData?.time}
                  onChange={(e) => {
                    setLocationData({ ...locationData, time: e });
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setIsShowModal(false);
            }}
            variant="secondary"
            disabled={isLoading}
          >
            Close
          </Button>
          {isLocationFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteLocation}
              variant="danger"
              disabled={isLoading}
            >
              Delete Location
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isLocationFocused ? updateLocation() : createLocation();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isLocationFocused ? "Save" : "Create Location"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col s={12}>
          <Row>
            <Col sm={12} className="p-0">
              <div
                className="p-4"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#4365CF",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 style={styles.tableHeaderText}>Location</h4>
                  {isLoading ? (
                    <Spinner
                      animation="border"
                      role="status"
                      size="sm"
                      style={{ color: "white" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setLocationData({});
                      setIsLocationFocused(false);
                      setIsShowModal(true);
                    }}
                    disabled={isLoading}
                    style={styles.createLocationBtn}
                    size="sm"
                  >
                    + Create Location
                  </Button>
                </div>
              </div>
            </Col>
            <Col
              sm={12}
              className="p-0"
              style={{ height: "calc(100vh - 189px)", overflowY: "auto" }}
            >
              <StandardTable
                columns={columns}
                rows={locations?.map((l) => {
                  return {
                    location: l.location,
                    destination: l.destination,
                    weather: l.weather,
                    time: l.time,
                  };
                })}
                handleClick={(value) => {
                  setIsLocationFocused(true);
                  modifyLocation(value);
                  setIsShowModal(true);
                }}
                isClickable
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  createLocationBtn: {
    color: "white",
    backgroundColor: "#718BDA",
    borderRadius: 8,
    border: 0,
    padding: "6px 15px",
  },
  removeLocationBtn: {
    color: "white",
    margin: "0 10px",
    backgroundColor: "#E92A2A",
    borderRadius: 8,
    border: 0,
    padding: "6px 15px",
  },
  tableHeaderText: {
    color: "white",
    font: "Poppins",
    fontWeight: 400,
    fontSize: 20,
    marginRight: 10,
    marginBottom: 0,
  },
  text: {
    fontWeight: 400,
  },
};

export default Locations;
