import { axiosClient } from "redux/store";
import {
  BulkPaymentsUrl,
  BatchDataUrl,
  ApproveBatchUrl,
  RejectBatchUrl,
} from "Constants";

export const bulkPaymentsList = (
  limit,
  pageNo,
  batchId,
  sortOrder,
  status,
  type
) => {
  return axiosClient.get(
    BulkPaymentsUrl(limit, pageNo, batchId, sortOrder, status, type)
  );
};

export const batchDataFetch = (id) => {
  return axiosClient.get(BatchDataUrl(id));
};

export const approveBatch = (id, req) => {
  return axiosClient.put(ApproveBatchUrl(id), req);
};

export const rejectBatch = (id, req) => {
  return axiosClient.put(RejectBatchUrl(id), req);
};
