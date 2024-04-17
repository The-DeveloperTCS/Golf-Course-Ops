import React, { useState, useEffect, useRef } from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table } from "reactstrap";
import moment from "moment";
import { getCouriersList } from "redux/orders/service";
import { paymentProvidersGet } from "redux/users/service";
import { CSVLink } from "react-csv";
import { batchDataFetch } from "redux/payment/service";
import { Badge } from "reactstrap";
import Button from "components/button/Button";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

export default function StickyHeadTable(props) {
  const [batchId, setBatchId] = useState("");
  const [allBanks, setBanks] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const csvLink = useRef();
  const usePendingPaymentsPermission = useRolePermissions(
    "PENDING_ADV_PAYMENTS"
  );

  useEffect(() => {
    paymentProvidersGet().then((res) => {
      setBanks(res.data);
    });
  }, []);

  const getBankName = (bId) => {
    if (bId !== null) {
      const banks = allBanks.filter((bn) => bn.id === bId);
      return banks[0]?.name;
    }
    return "";
  };

  const DownloadBatchDetails = (id) => {
    batchDataFetch(id).then((res) => {
      setBatchData(res.data);
      csvLink.current.link.click();
    });
  };

  return (
    <ReactTableWrapper {...props}>
      <Table striped>
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
          {props.columns.map((column) => (
            <td>
              {column.id === "batchId" ? (
                <input
                  type="number"
                  value={batchId || ""}
                  onBlur={(e) => {
                    props.onChangeFilter(batchId || "", column.id); // Set undefined to remove the filter entirely
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      props.onChangeFilter(batchId || "", column.id);
                    }
                  }}
                  onChange={(e) => {
                    setBatchId(e.target.value);
                  }}
                  className="tabl-search react-form-input"
                  style={{
                    width: "150px",
                    marginLeft: "-4px",
                    marginRight: "-15px",
                  }}
                  placeholder={`Search by Batch ID`}
                />
              ) : null}
            </td>
          ))}

          {props.data.map((i) => (
            <tr key={i.id}>
              <th row="scope" style={{ textAlign: "center" }}>
                <div
                  onClick={() => DownloadBatchDetails(i.id)}
                  style={{ cursor: "pointer" }}
                >
                  {i.id}
                </div>
                <CSVLink
                  data={batchData}
                  filename="requested payments.csv"
                  className="hidden"
                  ref={csvLink}
                  target="_blank"
                />
              </th>
              <td>
                {i.attachment && (
                  <a href={i.attachment} target="_blank">
                    Screenshot
                  </a>
                )}
              </td>
              <td>
                {moment(i.createdAt)
                  .local()
                  .format("DD-MM-YYYY")}
              </td>
              <td>
                {moment(i.receivedDate)
                  .local()
                  .format("DD-MM-YYYY")}
              </td>
              <td>{getBankName(i.paymentProviderId)}</td>
              <td>{i.total}</td>
              <td>{i.action}</td>
              <td>{i.comment}</td>
              <td>
                {i.status === "PENDING" ? (
                  <Badge className="c-info">{i.status}</Badge>
                ) : i.status === "APPROVED" ? (
                  <Badge className="c-success">{i.status}</Badge>
                ) : i.status === "REJECTED" ? (
                  <Badge className="c-danger">{i.status}</Badge>
                ) : null}
              </td>
              <td>
                <Button
                  type="button"
                  className="c-btn ma-5 c-success"
                  dataStyle="expand-left"
                  disabled={
                    i.status !== "PENDING" || !usePendingPaymentsPermission
                  }
                  onClick={() => props.handleAprovedBatch(i)}
                  loading={props.actionCalled}
                >
                  <span>
                    <i className="fas fa-check"></i>
                  </span>
                </Button>
                <Button
                  className="c-btn c-danger"
                  disabled={
                    i.status !== "PENDING" || !usePendingPaymentsPermission
                  }
                  onClick={() => props.handleRejectedBatch(i)}
                  loading={props.actionCalled}
                >
                  <i className="fas fa-times" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.bulkPaymentsPageNo - 1}
      />
    </ReactTableWrapper>
  );
}
