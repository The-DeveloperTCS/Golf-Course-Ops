import React from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { history } from "redux/store";

export default function StickyHeadTable(props) {
  const usePoGatePassPermission = useRolePermissions("GATE_PASS");

  const onEdit = (gNo, e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/accounts/po-gate-pass/" + gNo);
  };

  return (
    <ReactTableWrapper {...props}>
      <div className="col-lg-12 ptb-15">
        <div className="table-container text-center overflow-auto">
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
                    to={`/accounts/po-gate-pass/${i.number}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <th scope="row">{i.number}</th>
                  </Link>
                  <td>{i.quantity}</td>
                  <td>{i.qcBalance}</td>
                  <td>{i.defectiveBalance}</td>
                  <td>{i.studioBalance}</td>
                  <td>{i.warehouseBalance}</td>
                  <td>{i.poBalance}</td>
                  <td>{i.contentBalance}</td>
                  <td>
                    <button
                      className="btn c-btn-sm c-outline-primary ma-5"
                      onClick={(e) => onEdit(i.number, e)}
                      disabled={!usePoGatePassPermission}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination
          handleChangePage={props.handleChangePage}
          totalPages={props.totalPages}
          pageNo={props.pageNo - 1}
        />
      </div>
    </ReactTableWrapper>
  );
}
