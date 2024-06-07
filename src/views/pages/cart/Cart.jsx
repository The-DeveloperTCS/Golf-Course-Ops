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

import { createCartItems } from "redux/cart/service";

function Carts() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState({});
  const [carts, setCarts] = useState([]);
  const [isCartFocused, setIsCartFocused] = useState(false);
  const [terminalsOptions, setTerminalsOptions] = useState([]);
  const [stateCities, setStateCities] = useState([]);

  const [cart, setCart] = useState({
    item_name: "",
    value: "",
    customer_name: "",
    email: "",
    expiration_date: "",
    date_issued: "",
    department: "",
    category: "",
    notes: "",
  });

  const cartFields = [
    "item_name",
    "value",
    "customer_name",
    "email",
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

  const createCartItem = async () => {
    console.log(cartData, "cartData");
    createCartItems(cartData)
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

  const modifyCart = async (cart) => {
    const fullCartObject = cart?.find((e) => {
      return e.cart === cart.email;
    });
    setCartData(fullCartObject);
  };

  const updateCart = async () => {
    let mappedCartData = {};

    for (let key in cartData) {
      if (cartFields.includes(key)) {
        mappedCartData[key] = cartData[key];
      }
    }

    setCartData(mappedCartData);
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.updateCart({
        params: cartData.id,
        body: mappedCartData,
      });
      getCartsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      // toast.error(err.data.error)
    }
  };

  const deleteCart = async () => {
    setIsLoading(true);
    try {
      const {
        data: { message },
      } = await HttpService.deleteCart({
        params: cartData.id,
      });
      getCartsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      setIsShowModal(false);
      // toast.error(err.data.error)
    }
  };

  const columns = [
    "Item Name",
    "Value",
    "Customer Name",
    "Email Address",
    "Expiration Date",
    "Date Issued",
    "Department",
    "Category",
    "Notes",
  ];

  const getCartsList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await HttpService.getCartsList({
        query: { page: 1, size: 100 },
      });

      setCarts(data);
    } catch (err) {
      // toast.error(err.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartsList();
  }, []);

  const getCities = (state_id) => {
    const stateCity = cities.filter((data) => data.value === state_id);
    setStateCities(stateCity);
  };

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
            {isCartFocused ? "Cart Details" : "Add Cart"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Item Name</Form.Label>
              <Form.Control
                value={cartData.item_name}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    item_name: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Value</Form.Label>
              <Form.Control
                value={cartData.value}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    value: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Customer Name</Form.Label>
              <Form.Control
                value={cartData.customer_name}
                onChange={(e) => {
                  setCartData({ ...cartData, customer_name: e.target.value });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Email Address</Form.Label>
              <Form.Control
                value={cartData.email}
                onChange={(e) => {
                  setCartData({ ...cartData, email: e.target.value });
                }}
                type="email"
                disabled={isCartFocused}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Expiration Date</Form.Label>
              <Form.Control
                value={cartData.expiration_date}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    expiration_date: e.target.value,
                  });
                }}
                type="date"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Date Issued</Form.Label>
              <Form.Control
                value={cartData.date_issued}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    date_issued: e.target.value,
                  });
                }}
                type="date"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Department</Form.Label>
              <Form.Control
                value={cartData.department}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    department: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Category</Form.Label>
              <Form.Control
                value={cartData.category}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
                    category: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Notes</Form.Label>
              <Form.Control
                value={cartData.notes}
                onChange={(e) => {
                  setCartData({
                    ...cartData,
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
          {isCartFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteCart}
              variant="danger"
              disabled={isLoading}
            >
              Delete Cart
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isCartFocused ? updateCart() : createCartItem();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isCartFocused ? "Save" : "Create Cart"}
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
                setIsCartFocused(false);
                setCartData({});
                setIsShowModal(true);
              }}
              disabled={isLoading}
              style={styles.addCartBtn}
              size="sm"
            >
              + Add Cart
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
              rows={carts?.map((cart) => {
                const terminalName = terminalsOptions?.find(
                  (c) => c.value === cart.terminal_id
                );
                return {
                  first_name: cart.first_name,
                  last_name: cart.last_name,
                  phone_number: cart.phone_number,
                  email: cart.email,
                  city: cart.city,
                  state: cart.state,
                  job_title: cart.job_title,
                  role: cart.role,
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
                setIsCartFocused(true);
                modifyCart(value);
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

export default Carts;
