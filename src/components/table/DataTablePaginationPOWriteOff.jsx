import React, { useState } from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "components/button/Button";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import WriteOffLegderForm from "views/pages/purchaseOrder/WriteOffLedger";

export default function StickyHeadTable(props) {
  const useWriteOffPermission = useRolePermissions("WRITE_OFF");
  const [showForm, setShowForm] = useState(false);

  return (
    <ReactTableWrapper {...props}>
      <div className="col-lg-12 ptb-15">
        <Table
          striped
          style={{
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <thead>
            <tr>
              {props.columns.map((column) => (
                <th>
                  {column.enableFilters ? (
                    <div>{column.title}</div>
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((i) => (
              <tr key={i.id}>
                <th scope="row">{i.id}</th>
                <Link
                  target="_blank"
                  to={`/accounts/purchaseOrder/${i.purchaseOrderNumber}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <th scope="row">{i.purchaseOrderNumber}</th>
                </Link>
                <td>{i.purchaseOrderItemName}</td>
                <td>{i.quantity}</td>
                <td>{i.reason.text}</td>
                <td>{i.cost}</td>
                <td>{i.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          handleChangePage={props.handleChangePage}
          totalPages={props.totalPages}
          pageNo={props.pageNo - 1}
        />
      </div>

      {useWriteOffPermission && (
        <Button
          type="button"
          className="c-btn ma-5 c-outline-info"
          dataStyle="expand-left"
          onClick={() => setShowForm(true)}
        >
          Add Reverse Write Off
        </Button>
      )}
      {showForm && useWriteOffPermission && (
        <WriteOffLegderForm setShowForm={setShowForm} />
      )}
    </ReactTableWrapper>
  );
}
