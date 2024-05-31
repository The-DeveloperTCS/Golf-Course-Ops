import { axiosClient } from "../../redux/store";
import {
  createGiftCardUrl,
  updateGiftCardUrl,
  deleteGiftCardUrl,
  getGiftCardListUrl,
  getSpecificGiftCardUrl,
} from "./Constants";

export const createGiftcards = async (data) => {
  try {
    const response = await axiosClient.post(createGiftCardUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGiftcards = async (id, data) => {
  try {
    const response = await axiosClient.put(`${updateGiftCardUrl}${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGiftcards = async (id) => {
  try {
    const response = await axiosClient.delete(`${deleteGiftCardUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGiftcardsList = async (params) => {
  try {
    const response = await axiosClient.get(getGiftCardListUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificGiftscard = async (id) => {
  try {
    const response = await axiosClient.get(`${getSpecificGiftCardUrl}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
