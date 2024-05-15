import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import login from "../../../assets/images/login_bg.c450fef947bb0e11de01.png";
import support from "../../../assets/images/downloadlogin.png";
import { THEME_COLORS } from "../utils/constants";
import "../../style/SignIn.css";
import "../../style/JesterPark.css";

const ReservationButtons = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="Reservations">
      <button
        className={activeButton === "Reservations" ? "active" : ""}
        onClick={() => handleButtonClick("Reservations")}
      >
        Reservations
      </button>
      <button
        className={activeButton === "Facility Info" ? "active" : ""}
        onClick={() => handleButtonClick("Facility Info")}
      >
        Facility Info
      </button>
      <button
        className={activeButton === "Buy Gift Card" ? "active" : ""}
        onClick={() => handleButtonClick("Buy Gift Card")}
      >
        Buy Gift Card
      </button>
    </div>
  );
};

function JesterPark() {
  return (
    <Container fluid className="px-2  JesterPark-bg">
      <Row>
        <Col
          sm={6}
          className="d-flex flex-column justify-content-center  px-5  "
        >
          <div className="ReservationButtons2">
            <h1 className="welcome-back">Jester Park Golf Course</h1>
            <ReservationButtons />
            <p>Select a booking class to continue</p>
            <Row style={{ marginBottom: "30px" }}>
              <Button
                variant="light"
                size="lg"
                style={{ backgroundColor: "#F8AD15", color: "white" }}
              >
                Public
              </Button>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Button
                variant="light"
                size="lg"
                style={{ backgroundColor: "#00934C", color: "white" }}
              >
                Jester Men's Club
              </Button>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Button
                variant="light"
                size="lg"
                style={{ backgroundColor: "#F8AD15", color: "white" }}
              >
                Jester Senior League
              </Button>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <Button
                variant="light"
                size="lg"
                style={{ backgroundColor: "#00934C", color: "white" }}
              >
                Jester Women's League
              </Button>
            </Row>
          </div>
        </Col>
        {/* Right Column */}
        <Col sm={6} className="p-0">
          <div className="image-container">
            <img src={login} alt="" />
            <div className="support-image-container">
              <img src={support} alt="" />
              <p>Help/Support</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default JesterPark;
