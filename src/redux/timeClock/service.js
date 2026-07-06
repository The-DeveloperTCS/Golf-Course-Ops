import { delay, axiosResponse } from "mock/mockHelpers";
import { createRecord, getCollection, setCollection } from "mock/mockDb";

export const checkInnClock = async (req) => {
  await delay();
  const record = createRecord("timeClock", {
    ...req,
    id: `${req.userId}-${req.date}`,
    timeSheet: {
      terminalId: req.terminalId,
      checkIn: req.checkIn,
      userId: req.userId,
      date: req.date,
    },
  });
  return axiosResponse({ timeSheet: record.timeSheet });
};

export const checkOutClock = async (req) => {
  await delay();
  const items = getCollection("timeClock");
  const index = items.findIndex(
    (item) =>
      String(item.userId) === String(req.userId) && item.date === req.date
  );
  if (index >= 0) {
    items[index] = {
      ...items[index],
      checkOut: req.checkOut,
      timeSheet: {
        ...items[index].timeSheet,
        checkOut: req.checkOut,
      },
    };
    setCollection("timeClock", items);
  }
  return axiosResponse({ success: true });
};

export const getLastCheckIn = async (date, userId) => {
  await delay();
  const record = getCollection("timeClock").find(
    (item) =>
      String(item.userId) === String(userId) &&
      item.date === date &&
      item.timeSheet &&
      !item.timeSheet.checkOut
  );
  return axiosResponse({ timeSheet: record ? record.timeSheet : null });
};
