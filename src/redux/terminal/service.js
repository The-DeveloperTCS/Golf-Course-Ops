import { axiosClient } from "../../redux/store";
import {
  getTerminalListUrl,
  createTerminalUrl,
  updateTerminalUrl,
  deleteTerminalUrl,
  getSpecificTerminalUrl,
} from "Constants";

export const getTerminalsList = (pageNo, limit) => {
  return axiosClient.get(getTerminalListUrl(limit, pageNo));
};

export const createTerminals = (req) => {
  return axiosClient.post(createTerminalUrl, req);
};

export const updateTerminalDetails = (terminalId, req) => {
  return axiosClient.patch(updateTerminalUrl(terminalId), req);
};

export const getSpecificTerminal = async (terminalId) => {
  return axiosClient.get(getSpecificTerminalUrl(terminalId));
};

export const deleteTerminals = async (terminalId) => {
  return axiosClient.delete(deleteTerminalUrl(terminalId));
};
