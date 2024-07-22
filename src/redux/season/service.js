import { axiosClient } from "../store";
import {
  getSeasonListUrl,
  createSeasonUrl,
  updateSeasonUrl,
  deleteSeasonUrl,
  getSpecificSeasonUrl,
  getDateRangeSeasons,
} from "Constants";

export const getSeasonsList = (pageNo, limit) => {
  return axiosClient.get(getSeasonListUrl(limit, pageNo));
};

export const getDateRangeSeasonsList = (date) => {
  return axiosClient.get(getDateRangeSeasons(date));
};

export const createSeasons = (req) => {
  return axiosClient.post(createSeasonUrl, req);
};

export const updateSeasonDetails = (seasonId, req) => {
  return axiosClient.patch(updateSeasonUrl(seasonId), req);
};

export const getSpecificSeason = async (seasonId) => {
  return axiosClient.get(getSpecificSeasonUrl(seasonId));
};

export const deleteSeasons = async (seasonId) => {
  return axiosClient.delete(deleteSeasonUrl(seasonId));
};
