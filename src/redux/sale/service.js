import { delay, axiosResponse } from "mock/mockHelpers";
import { findById, getCollection } from "mock/mockDb";

export const salesInfoGetById = async (saleId) => {
  await delay();
  const sale =
    findById("sales", saleId) ||
    getCollection("teesheets").find(
      (sheet) => String(sheet.saleId) === String(saleId)
    );
  const subTotal = sale?.subTotal || 200;
  const saleTax = sale?.saleTax || 16;
  return axiosResponse({
    sale: sale || {
      id: saleId,
      total: subTotal + saleTax,
      subTotal,
      saleTax,
      item_list: [],
    },
    teesheet: sale,
  });
};
