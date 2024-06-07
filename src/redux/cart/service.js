import axios from "axios";
import { BaseUrl } from "Constants";

export const addCartItem = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/cart/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/cart/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/cart/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItemsList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/cart/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificCartItem = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/cart/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
