import axios from "axios";
import { BaseUrl } from "Constants";

export const createGiftcard = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/gift-card/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGiftcard = async (id, data) => {
  try {
    const response = await axios.put(`${BaseUrl}/gift-card/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGiftcard = async (id) => {
  try {
    const response = await axios.delete(`${BaseUrl}/gift-card/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGiftcardsList = async (params) => {
  try {
    const response = await axios.get(`${BaseUrl}/gift-card/getAll`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificGiftcard = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/gift-card/specificId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
