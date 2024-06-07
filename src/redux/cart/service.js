import { axiosClient } from "../../redux/store";
import {
  createCartUrl,
  updateCartUrl,
  deleteCartUrl,
  getCartListUrl,
  getSpecificCartUrl,
} from "Constants";

export const createCartItems = async (data) => {
  try {
    const response = await axiosClient.post(createCartUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItems = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateCartUrl}${id}`, data); // Updated function name
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItems = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteCartUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItemsList = async (params) => {
  try {
    const response = await axiosClient.get(getCartListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCartItems = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificCartUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
