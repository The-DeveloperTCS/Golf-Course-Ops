import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { Table } from "reactstrap";
import notificationActions from "redux/notifications/actions";
import catalogActions from "redux/catalog/actions";
import _ from "lodash";

const OrderPaymentsLedger = ({ paymentLedger }) => {
  return (
    <div className="col-lg-12 ptb-15">
      <div className="roe-card-style">
        <div className="roe-card-header flex center">
          <div className="flex-1 mr-15 my-title ml-1">Payment Ledger</div>
        </div>

        <div className="roe-card-body">
          <Table striped style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Payment Received</th>
                <th>Refund</th>
                <th>Description</th>
                <th>Bank Reference No</th>
                <th>Courier Invoice No</th>
                <th>Received Date</th>
              </tr>
            </thead>
            <tbody>
              {_.sortBy(paymentLedger, ["id"]).map((l, ind) => (
                <tr key={ind}>
                  <td>{l.id}</td>
                  <td>{l.user}</td>
                  <td>
                    {moment(l.paymentDate)
                      .local()
                      .format("DD-MM-YYYY")}
                  </td>
                  <td>{l.amount}</td>
                  <td>{l.refundAmount}</td>
                  <td>{l.description}</td>
                  <td>{l.bankReferenceNumber}</td>
                  <td>{l.courierInvoiceNumber}</td>
                  <td>
                    {l.receivedDate != null
                      ? moment(l.receivedDate)
                          .local()
                          .format("DD-MM-YYYY")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...notificationActions,
      ...catalogActions,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(OrderPaymentsLedger);
