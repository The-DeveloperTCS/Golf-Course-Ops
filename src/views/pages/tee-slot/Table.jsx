import React from "react";
import Table from "react-bootstrap/Table";
import tee1Icon from "../../../assets/images/tee1_icon.png";
import { Link } from "react-router-dom";

function StandardTable(
  { columns = [], rows = [], handleClick, isClickable = false },
  props
) {
  console.log(props, "props");
  return (
    <Table responsive>
      <thead>
        <tr style={{ backgroundColor: "white" }}>
          <th>#</th>
          {columns.map((value, index) => (
            <th key={index}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item, index) => {
          return (
            <tr
              key={index}
              style={{
                background: index % 2 !== 0 ? "white" : "#E8EDFF",
                cursor: "pointer",
              }}
              onClick={() => (isClickable ? handleClick(item) : null)}
            >
              <td>{index + 1}</td>
              <td key={index}>{item.timing}</td>
              <Link
                to={{
                  pathname: "/tee-sheet-new",
                  state: {
                    item,
                  },
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <td>
                  {item.customer_name !== undefined ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "colum",
                        width: 250,
                        height: 40,
                        margin: "auto",
                        borderRadius: 5,
                        backgroundColor: index % 2 !== 0 ? "white" : "#E8EDFF",
                      }}
                    >
                      <div
                        className="pt-2"
                        style={{
                          backgroundColor: "#4365CF",
                          height: "100%",
                          width: "20%",
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                          color: "#E8EDFF",
                          textAlign: "center",
                        }}
                      >
                        <p>{item.holes}</p>
                      </div>
                      <div
                        className="px-2"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "start",
                        }}
                      >
                        <div className="m-0 p-0" style={{ height: "40%" }}>
                          {item.person} {item.customer_name}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <img src={tee1Icon} alt="" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "colum",
                        width: 250,
                        height: 40,
                        margin: "auto",
                        borderRadius: 5,
                        backgroundColor: "white",
                      }}
                    >
                      <div
                        className="px-2"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "start",
                        }}
                      ></div>
                    </div>
                  )}
                </td>
              </Link>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default StandardTable;
