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

import { createDepartments } from "redux/department/service";

function Departments() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [isDepartmentFocused, setIsDepartmentFocused] = useState(false);
  const [terminalsOptions, setTerminalsOptions] = useState([]);

  const [department, setDepartment] = useState({
    id: "",
    name: "",
  });

  const departmentFields = ["id", "name"];

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

  const createDepartment = async () => {
    // console.log(departmentData, "cartData");
    createDepartments(departmentData)
      .then((res) => {
        // console.log(res, "response ");
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

  const modifyDepartment = async (department) => {
    const fullDepartmentObject = department?.find((e) => {
      return e.cart === department.email;
    });
    setDepartmentData(fullDepartmentObject);
  };

  const updateDepartment = async () => {
    let mappedDepartmentData = {};

    for (let key in departmentData) {
      if (departmentFields.includes(key)) {
        mappedDepartmentData[key] = departmentData[key];
      }
    }

    setDepartmentData(mappedDepartmentData);
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.updateDepartment({
        params: departmentData.id,
        body: mappedDepartmentData,
      });
      getDepartmentsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      // toast.error(err.data.error)
    }
  };

  const deleteDepartment = async () => {
    setIsLoading(true);
    try {
      const {
        data: { message },
      } = await HttpService.deleteDepartment({
        params: departmentData.id,
      });
      getDepartmentsList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      setIsShowModal(false);
      // toast.error(err.data.error)
    }
  };

  const columns = ["Id", "Name"];

  const getDepartmentsList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await HttpService.getDepartmentsList({
        query: { page: 1, size: 100 },
      });

      setDepartments(data);
    } catch (err) {
      // toast.error(err.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDepartmentsList();
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
            {isDepartmentFocused ? "Department Details" : "Add Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Id</Form.Label>
              <Form.Control
                value={departmentData.id}
                onChange={(e) => {
                  setDepartmentData({
                    ...departmentData,
                    id: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Name</Form.Label>
              <Form.Control
                value={departmentData.name}
                onChange={(e) => {
                  setDepartmentData({
                    ...departmentData,
                    name: e.target.value,
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
          {isDepartmentFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteDepartment}
              variant="danger"
              disabled={isLoading}
            >
              Delete Department
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isDepartmentFocused ? updateDepartment() : createDepartment();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isDepartmentFocused ? "Save" : "Create Department"}
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
                setIsDepartmentFocused(false);
                setDepartmentData({});
                setIsShowModal(true);
              }}
              disabled={isLoading}
              style={styles.addCartBtn}
              size="sm"
            >
              + Add Department
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
              rows={departments?.map((department) => {
                const terminalName = terminalsOptions?.find(
                  (d) => d.value === department.terminal_id
                );
                return {
                  first_name: department.first_name,
                  last_name: department.last_name,
                  phone_number: department.phone_number,
                  email: department.email,
                  city: department.city,
                  state: department.state,
                  job_title: department.job_title,
                  role: department.role,
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
                setIsDepartmentFocused(true);
                modifyDepartment(value);
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

export default Departments;
