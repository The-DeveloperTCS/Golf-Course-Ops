import { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Spinner } from "react-bootstrap";
import login from "../../../assets/images/login_bg.c450fef947bb0e11de01.png";
import "../../style/SignIn.css";
import support from "../../../assets/images/downloadlogin.png";
// import { useDispatch, useSelector } from "react-redux"

import { THEME_COLORS } from "../utils/constants";
// import { setUser } from "../store";

function Login() {
  return (
    <Container fluid className="px-2">
      <Row>
        <Col sm={6} className="d-flex flex-column justify-content-center  px-5">
          <h1 className="welcome-back">Hi, Welcome Back!</h1>
          <Form>
            <Form.Group
              style={{ textAlign: "left" }}
              className="mb4"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address or username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email or username"
              />
            </Form.Group>

            <Form.Group
              style={{ textAlign: "left" }}
              className="mb4"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>

            <Button variant="link" size="lg">
              Forgot Password
            </Button>
            <div className="d-grid gap-2">
              <Button
                style={{ backgroundColor: THEME_COLORS.PRIMARY, border: 0 }}
                size="lg"
              >
                Sign In
              </Button>
            </div>
          </Form>
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

export default Login;
