import { delay, axiosResponse } from "mock/mockHelpers";
import { getCollection, updateRecord } from "mock/mockDb";

const defaultBanners = () => [
  {
    id: 1,
    title: "Summer League Registration",
    status: "Active",
    imageUrl: "",
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Twilight Rates Now Available",
    status: "Active",
    imageUrl: "",
    sortOrder: 2,
  },
];

export const getBannersList = async () => {
  await delay();
  const banners = getCollection("banners");
  return axiosResponse({
    banners: banners.length ? banners : defaultBanners(),
  });
};

export const updateBanner = async (id, req) => {
  await delay();
  const updated = updateRecord("banners", id, req);
  return axiosResponse(updated);
};
