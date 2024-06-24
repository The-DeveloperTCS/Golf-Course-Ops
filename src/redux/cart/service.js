import { axiosClient } from "../store";
import {
  createCartUrl,
  updateCartUrl,
  deleteCartUrl,
  getCartsListUrl,
  getSpecificCartUrl,
} from "Constants";

export const getCartsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getCartsListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCarts = (req) => {
  return axiosClient.post(createCartUrl, req);
};

export const updateCartDetails = (cartId, req) => {
  return axiosClient.patch(updateCartUrl(cartId), req);
};

export const getSpecificCart = async (cartId) => {
  return axiosClient.get(getSpecificCartUrl(cartId));
};

export const deleteCarts = async (cartId) => {
  return axiosClient.delete(deleteCartUrl(cartId));
};
