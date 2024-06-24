import { axiosClient } from "../../redux/store";
import {
  createGiftCardUrl,
  updateGiftCardUrl,
  deleteGiftCardUrl,
  getGiftCardsListUrl,
  getSpecificGiftCardUrl,
} from "Constants";

export const getGiftCardsList = async (limit, pageNo) => {
  try {
    const response = await axiosClient.get(getGiftCardsListUrl(limit, pageNo));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGiftCards = (req) => {
  return axiosClient.post(createGiftCardUrl, req);
};

export const updateGiftCardDetails = (giftCardId, req) => {
  return axiosClient.patch(updateGiftCardUrl(giftCardId), req);
};

export const getSpecificGiftCard = async (giftCardId) => {
  return axiosClient.get(getSpecificGiftCardUrl(giftCardId));
};

export const deleteGiftCards = async (giftCardId) => {
  return axiosClient.delete(deleteGiftCardUrl(giftCardId));
};
