import { axiosClient } from "../store";
import {
  createSupplierUrl,
  updateSupplierUrl,
  deleteSupplierUrl,
  getSuppliersListUrl,
  getSpecificSupplierUrl,
} from "Constants";

export const getSuppliersList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getSuppliersListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSuppliers = (req) => {
  return axiosClient.post(createSupplierUrl, req);
};

export const updateSupplierDetails = (supplierId, req) => {
  return axiosClient.patch(updateSupplierUrl(supplierId), req);
};

export const getSpecificSupplier = async (supplierId) => {
  return axiosClient.get(getSpecificSupplierUrl(supplierId));
};

export const deleteSuppliers = async (supplierId) => {
  return axiosClient.delete(deleteSupplierUrl(supplierId));
};
