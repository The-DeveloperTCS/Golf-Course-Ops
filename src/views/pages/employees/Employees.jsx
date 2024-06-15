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
// import { connect } from "react-redux";
// import {
//   createEmployee,
//   updateEmployee,
//   deleteEmployee,
//   getEmployeesList,
//   getSpecificEmployee,
//   loginUser,
// } from "../../../Constants";

import { createEmployees } from "redux/employee/service";

function Employees() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isEmployeeFocused, setIsEmployeeFocused] = useState(false);
  const [terminalsOptions, setTerminalsOptions] = useState([]);
  const [stateCities, setStateCities] = useState([]);

  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    cell_number: "",
    job_title: "",
    card_number: "",
    gender: "",
    address: "",
    dob: "",
    city: "",
    state: "",
    zip_postal_code: "",
    pin_number: "",
    defaultTerminal: "",
    comments: "",
    role: "",
    email: "",
    terminal: "",
  });

  const employeeFields = [
    "first_name",
    "last_name",
    "phone_number",
    "cell_number",
    "job_title",
    "card_number",
    "gender",
    "address",
    "dob",
    "city",
    "state",
    "zip_postal_code",
    "pin_number",
    "defaultTerminal",
    "comments",
    "role",
    "email",
    "terminal",
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ];

  const usStates = [
    {
      label: "Alabama",
      value: "AL",
    },
    {
      label: "Alaska",
      value: "AK",
    },
    {
      label: "American Samoa",
      value: "AS",
    },
    {
      label: "Arizona",
      value: "AZ",
    },
    {
      label: "Arkansas",
      value: "AR",
    },
    {
      label: "California",
      value: "CA",
    },
    {
      label: "Colorado",
      value: "CO",
    },
    {
      label: "Connecticut",
      value: "CT",
    },
    {
      label: "Delaware",
      value: "DE",
    },
    {
      label: "District Of Columbia",
      value: "DC",
    },
    {
      label: "Federated States Of Micronesia",
      value: "FM",
    },
    {
      label: "Florida",
      value: "FL",
    },
    {
      label: "Georgia",
      value: "GA",
    },
    {
      label: "Guam",
      value: "GU",
    },
    {
      label: "Hawaii",
      value: "HI",
    },
    {
      label: "Idaho",
      value: "ID",
    },
    {
      label: "Illinois",
      value: "IL",
    },
    {
      label: "Indiana",
      value: "IN",
    },
    {
      label: "Iowa",
      value: "IA",
    },
    {
      label: "Kansas",
      value: "KS",
    },
    {
      label: "Kentucky",
      value: "KY",
    },
    {
      label: "Louisiana",
      value: "LA",
    },
    {
      label: "Maine",
      value: "ME",
    },
    {
      label: "Marshall Islands",
      value: "MH",
    },
    {
      label: "Maryland",
      value: "MD",
    },
    {
      label: "Massachusetts",
      value: "MA",
    },
    {
      label: "Michigan",
      value: "MI",
    },
    {
      label: "Minnesota",
      value: "MN",
    },
    {
      label: "Mississippi",
      value: "MS",
    },
    {
      label: "Missouri",
      value: "MO",
    },
    {
      label: "Montana",
      value: "MT",
    },
    {
      label: "Nebraska",
      value: "NE",
    },
    {
      label: "Nevada",
      value: "NV",
    },
    {
      label: "New Hampshire",
      value: "NH",
    },
    {
      label: "New Jersey",
      value: "NJ",
    },
    {
      label: "New Mexico",
      value: "NM",
    },
    {
      label: "New York",
      value: "NY",
    },
    {
      label: "North Carolina",
      value: "NC",
    },
    {
      label: "North Dakota",
      value: "ND",
    },
    {
      label: "Northern Mariana Islands",
      value: "MP",
    },
    {
      label: "Ohio",
      value: "OH",
    },
    {
      label: "Oklahoma",
      value: "OK",
    },
    {
      label: "Oregon",
      value: "OR",
    },
    {
      label: "Palau",
      value: "PW",
    },
    {
      label: "Pennsylvania",
      value: "PA",
    },
    {
      label: "Puerto Rico",
      value: "PR",
    },
    {
      label: "Rhode Island",
      value: "RI",
    },
    {
      label: "South Carolina",
      value: "SC",
    },
    {
      label: "South Dakota",
      value: "SD",
    },
    {
      label: "Tennessee",
      value: "TN",
    },
    {
      label: "Texas",
      value: "TX",
    },
    {
      label: "Utah",
      value: "UT",
    },
    {
      label: "Vermont",
      value: "VT",
    },
    {
      label: "Virgin Islands",
      value: "VI",
    },
    {
      label: "Virginia",
      value: "VA",
    },
    {
      label: "Washington",
      value: "WA",
    },
    {
      label: "West Virginia",
      value: "WV",
    },
    {
      label: "Wisconsin",
      value: "WI",
    },
    {
      label: "Wyoming",
      value: "WY",
    },
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

  const createEmployee = async () => {
    // console.log(employeeData, "employeeData");
    createEmployees(employeeData)
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

  const modifyEmployee = async (employee) => {
    const fullEmployeeObject = employees?.find((e) => {
      return e.email === employee.email;
    });
    setEmployeeData(fullEmployeeObject);
  };

  const updateEmployee = async () => {
    let mappedEmployeeData = {};

    for (let key in employeeData) {
      if (employeeFields.includes(key)) {
        mappedEmployeeData[key] = employeeData[key];
      }
    }

    setEmployeeData(mappedEmployeeData);
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.updateEmployee({
        params: employeeData.id,
        body: mappedEmployeeData,
      });
      getEmployeesList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      // toast.error(err.data.error)
    }
  };

  const deleteEmployee = async () => {
    setIsLoading(true);
    try {
      const {
        data: { message },
      } = await HttpService.deleteEmployee({
        params: employeeData.id,
      });
      getEmployeesList();
      setIsShowModal(false);
      // toast.success(message)
    } catch (err) {
      setIsLoading(false);
      setIsShowModal(false);
      // toast.error(err.data.error)
    }
  };

  const columns = [
    "First Name",
    "Last Name",
    "Phone Number",
    "Email Address",
    "City",
    "State",
    "Job Title",
    "Role",
    "Terminal",
  ];

  const getEmployeesList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await HttpService.getEmployeesList({
        query: { page: 1, size: 100 },
      });

      setEmployees(data);
    } catch (err) {
      // toast.error(err.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeesList();
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
            {isEmployeeFocused ? "Employee Details" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">First Name</Form.Label>
              <Form.Control
                value={employeeData.first_name}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    first_name: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Last Name</Form.Label>
              <Form.Control
                value={employeeData.last_name}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    last_name: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Gender</Form.Label>
              <Select
                value={
                  employeeData.gender
                    ? {
                        value: employeeData.gender,
                        label: pascalCase(employeeData.gender),
                      }
                    : null
                }
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, gender: e.value });
                }}
                options={genderOptions}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Date Of Birth</Form.Label>
              <Form.Control
                value={
                  employeeData.dob
                    ? moment(employeeData.dob).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, dob: e.target.value });
                }}
                type="date"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Current Address</Form.Label>
              <Form.Control
                value={employeeData.address}
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, address: e.target.value });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Email Address</Form.Label>
              <Form.Control
                value={employeeData.email}
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, email: e.target.value });
                }}
                type="email"
                disabled={isEmployeeFocused}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Phone Number</Form.Label>
              <Form.Control
                value={employeeData.phone_number}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    phone_number: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">
                Cell Phone Number
              </Form.Label>
              <Form.Control
                value={employeeData.cell_number}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    cell_number: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">State</Form.Label>
              <Select
                value={
                  employeeData.state
                    ? {
                        value: employeeData.state,
                        label: pascalCase(employeeData.state),
                      }
                    : null
                }
                onChange={(e) => {
                  getCities(e.value);
                  setEmployeeData({ ...employeeData, state: e.label });
                }}
                options={usStates}
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">City</Form.Label>
              <Select
                value={
                  employeeData.city
                    ? {
                        value: employeeData.city,
                        label: pascalCase(employeeData.city),
                      }
                    : null
                }
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, city: e.label });
                }}
                options={stateCities}
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Zip/Postal Code</Form.Label>
              <Form.Control
                value={employeeData.zip_postal_code}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    zip_postal_code: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Job Title</Form.Label>
              <Form.Control
                value={employeeData.job_title}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    job_title: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Default Terminal</Form.Label>
              <Select
                value={terminalsOptions?.find(
                  (c) => c.value === employeeData.terminal_id
                )}
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, terminal_id: e.value });
                }}
                options={terminalsOptions}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Card Number</Form.Label>
              <Form.Control
                value={employeeData.card_number}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    card_number: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Pin Number</Form.Label>
              <Form.Control
                value={employeeData.pin_number}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    pin_number: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Comments</Form.Label>
              <Form.Control
                value={employeeData.comments}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    comments: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <hr style={{ marginTop: 25 }} />
            <hr style={{ marginTop: 25 }} />
            <Col>
              <Form.Label htmlFor="inputPassword5">Role</Form.Label>
              <Select
                value={
                  employeeData.role
                    ? {
                        value: employeeData.role,
                        label: pascalCase(employeeData.role),
                      }
                    : null
                }
                onChange={(e) => {
                  setEmployeeData({ ...employeeData, role: e.value });
                }}
                options={roleOptions}
              />
            </Col>
            <Col></Col>

            <hr style={{ marginTop: 25 }} />
            <hr style={{ marginTop: 25 }} />

            <Col>
              <Form.Label htmlFor="inputPassword5">Username</Form.Label>
              <Form.Control
                value={employeeData.user_name}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    user_name: e.target.value,
                  });
                }}
                type="text"
                disabled={isEmployeeFocused}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                value={employeeData.password}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    password: e.target.value,
                  });
                }}
                type="password"
                disabled={isEmployeeFocused}
              />
            </Col>
            <Col></Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
              <Form.Control
                value={employeeData.confirm_password}
                onChange={(e) => {
                  setEmployeeData({
                    ...employeeData,
                    confirm_password: e.target.value,
                  });
                }}
                type="password"
                disabled={isEmployeeFocused}
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
          {isEmployeeFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteEmployee}
              variant="danger"
              disabled={isLoading}
            >
              Delete Employee
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isEmployeeFocused ? updateEmployee() : createEmployee();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isEmployeeFocused ? "Save" : "Create Employee"}
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
                setIsEmployeeFocused(false);
                setEmployeeData({});
                setIsShowModal(true);
              }}
              disabled={isLoading}
              style={styles.addEmployeeBtn}
              size="sm"
            >
              + Add Employee
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
              rows={employees?.map((employee) => {
                const terminalName = terminalsOptions?.find(
                  (c) => c.value === employee.terminal_id
                );
                return {
                  first_name: employee.first_name,
                  last_name: employee.last_name,
                  phone_number: employee.phone_number,
                  email: employee.email,
                  city: employee.city,
                  state: employee.state,
                  job_title: employee.job_title,
                  role: employee.role,
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
                setIsEmployeeFocused(true);
                modifyEmployee(value);
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

export default Employees;
