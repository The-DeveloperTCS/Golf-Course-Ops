import React from "react";
import Table from "react-bootstrap/Table";

function StandardTable({
  columns = [],
  rows = [],
  handleClick,
  isClickable = false,
}) {
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
                cursor: isClickable ? "pointer" : "default",
              }}
              onClick={() => (isClickable ? handleClick(item) : null)}
            >
              <td>{index + 1}</td>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default StandardTable;
