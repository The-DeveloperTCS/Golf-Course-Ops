import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { pascalCase } from "pascal-case";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import cities from "../../data/cities.json";
import StandardTable from "../tee-slot/Table";
import "../../style/slider-modal.css";
import HttpService from "../services/http-service";

import { createGiftcards } from "redux/giftcard/service";

function GiftCards() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [giftCardData, setGiftCardData] = useState({});
  const [giftCards, setGiftCards] = useState([]);
  const [isGiftCardFocused, setIsGiftCardFocused] = useState(false);
  const [terminalsOptions, setTerminalsOptions] = useState([]);

  const [giftCard, setGiftCard] = useState({
    gift_card_id: "",
    value: "",
    custom_name: "",
    customer_name: "",
    expiration_date: "",
    date_issued: "",
    department: "",
    category: "",
    notes: "",
  });

  const giftCardFields = [
    "gift_card_id",
    "value",
    "custom_name",
    "customer_name",
    "expiration_date",
    "date_issued",
    "department",
    "category",
    "notes",
  ];

  useEffect(() => {
    getTerminalsList();
  }, []);

  const getTerminalsList = async () => {
    try {
      const { data } = await HttpService.getAllTerminalsList({
        query: { name: "" },
      });
      const terminals = data.Terminals;
      const options = terminals?.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setTerminalsOptions(options);
    } catch (err) {
      // toast.error(err.data.message)
    }
  };

  const createGiftcard = async () => {
    console.log(giftCardData, "giftCardData");
    createGiftcards(giftCardData)
      .then((res) => {
        console.log(res, "response ");
      })
      .catch((err) => {
        console.log(err.data.message, "error");
      });
    // setIsLoading(true);
    // try {
    //   await HttpService.createEmployee({ body: employeeData });
    //   getEmployeesList();
    //   setIsShowModal(false);
    // } catch (err) {
    //   // toast.error(err.data.message)
    //   setIsLoading(false);
    // }
  };

  const modifyGiftCard = async (giftcard) => {
    const fullGiftCardObject = giftcard?.find((e) => {
      return e.giftcard === giftcard.email;
    });
    setGiftCardData(fullGiftCardObject);
  };

  const updateGiftCard = async () => {
    let mappedGiftCardData = {};

    for (let key in giftCardData) {
      if (giftCardFields.includes(key)) {
        mappedGiftCardData[key] = giftCardData[key];
      }
    }

    setGiftCardData(mappedGiftCardData);
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.updateGiftCard({
        params: giftCardData.id,
        body: mappedGiftCardData,
      });
      getGiftCardsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      // toast.error(err.data.error)
    }
  };

  const deleteGiftCard = async () => {
    setIsLoading(true);
    try {
      const {
        data: { message },
      } = await HttpService.deleteGiftCard({
        params: giftCardData.id,
      });
      getGiftCardsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      setIsShowModal(false);
      // toast.error(err.data.error)
    }
  };

  const columns = ["Id", "Name"];

  const getGiftCardsList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await HttpService.getGiftCardsList({
        query: { page: 1, size: 100 },
      });

      setGiftCards(data);
    } catch (err) {
      // toast.error(err.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGiftCardsList();
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
            {isGiftCardFocused ? "GiftCard Details" : "Add GiftCard"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Gift Card Id</Form.Label>
              <Form.Control
                value={giftCardData.gift_card_id}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    gift_card_id: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Value</Form.Label>
              <Form.Control
                value={giftCardData.value}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    value: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Custom Name</Form.Label>
              <Form.Control
                value={giftCardData.custom_name}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    custom_name: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Customer Name</Form.Label>
              <Form.Control
                value={giftCardData.customer_name}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    customer_name: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Expiration Date</Form.Label>
              <Form.Control
                value={
                  giftCardData.expiration_date
                    ? moment(giftCardData.expiration_date).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    expiration_date: e.target.value,
                  });
                }}
                type="date"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Date Issued</Form.Label>
              <Form.Control
                value={
                  giftCardData.date_issued
                    ? moment(giftCardData.date_issued).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    date_issued: e.target.value,
                  });
                }}
                type="date"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Department</Form.Label>
              <Form.Control
                value={giftCardData.department}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    department: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Category</Form.Label>
              <Form.Control
                value={giftCardData.category}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    category: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Notes</Form.Label>
              <Form.Control
                value={giftCardData.notes}
                onChange={(e) => {
                  setGiftCardData({
                    ...giftCardData,
                    notes: e.target.value,
                  });
                }}
                type="text"
              />
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
          {isGiftCardFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteGiftCard}
              variant="danger"
              disabled={isLoading}
            >
              Delete GiftCard
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isGiftCardFocused ? updateGiftCard() : createGiftcard();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isGiftCardFocused ? "Save" : "Create GiftCard"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col sm={12} style={{ padding: 0 }}>
          <div style={styles.btnColumn}>
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div></div>
            )}
            <Button
              onClick={() => {
                setIsGiftCardFocused(false);
                setGiftCardData({});
                setIsShowModal(true);
              }}
              disabled={isLoading}
              style={styles.addEmployeeBtn}
              size="sm"
            >
              + Add GiftCard
            </Button>
          </div>
        </Col>
        <Col sm={12} style={{ padding: 0 }}>
          <div
            style={{
              height: "calc(100vh - 185px)",
              overflowY: "auto",
            }}
          >
            <StandardTable
              columns={columns}
              rows={giftCards?.map((giftCard) => {
                const terminalName = terminalsOptions?.find(
                  (d) => d.value === giftCard.terminal_id
                );
                return {
                  first_name: giftCard.first_name,
                  last_name: giftCard.last_name,
                  phone_number: giftCard.phone_number,
                  email: giftCard.email,
                  city: giftCard.city,
                  state: giftCard.state,
                  job_title: giftCard.job_title,
                  role: giftCard.role,
                  terminal: terminalName?.label,

                  // status: (
                  //   <div
                  //     style={{
                  //       backgroundColor:
                  //         employee.email_verified_at !== null
                  //           ? THEME_COLORS.DARK_GREEN
                  //           : THEME_COLORS.DARK_RED,
                  //       width: 18,
                  //       height: 18,
                  //       borderRadius: 9,
                  //       border: "2px solid rgba(255, 255, 255, 0.6)",
                  //       margin: "3px auto",
                  //     }}
                  //   ></div>
                  // ),
                  // history: "View History",
                };
              })}
              handleClick={(value) => {
                setIsGiftCardFocused(true);
                modifyGiftCard(value);
                setIsShowModal(true);
              }}
              isClickable
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  btnColumn: {
    padding: "20px 20px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  addEmployeeBtn: {
    color: "white",
    backgroundColor: "#0CD374",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
  removeEmployeeBtn: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#E92A2A",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
  editRightsBtn: {
    color: "white",
    marginRight: 10,
    backgroundColor: "#F8AD15",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
};

export default GiftCards;
