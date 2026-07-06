import { buildSeedDatabase } from "./seedData";

const STORAGE_KEY = "golf_course_ops_db_v3";

let cache = null;

const readPersisted = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Mock DB reset due to parse error", e);
  }
  return null;
};

export const resetMockDatabase = () => {
  cache = buildSeedDatabase();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  return cache;
};

export const getMockDatabase = () => {
  if (cache) {
    return cache;
  }
  cache = readPersisted() || resetMockDatabase();
  return cache;
};

export const persistMockDatabase = () => {
  if (cache) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  }
};

export const getCollection = (name) => {
  const db = getMockDatabase();
  if (!db[name]) {
    db[name] = [];
    persistMockDatabase();
  }
  return db[name];
};

export const setCollection = (name, items) => {
  const db = getMockDatabase();
  db[name] = items;
  persistMockDatabase();
};

export const nextId = (collectionName) => {
  const items = getCollection(collectionName);
  if (!items.length) {
    return 1;
  }
  return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};

export const paginateCollection = (
  collectionName,
  limit,
  pageNo,
  pluralKey,
  totalKey
) => {
  const limitNum = parseInt(limit, 10) || 25;
  const pageNum = parseInt(pageNo, 10) || 1;
  const all = getCollection(collectionName);
  const start = (pageNum - 1) * limitNum;

  return {
    [pluralKey]: all.slice(start, start + limitNum),
    pagination: {
      [totalKey]: all.length,
      limit: limitNum,
      currentPage: pageNum,
    },
  };
};

export const findById = (collectionName, id) =>
  getCollection(collectionName).find((item) => String(item.id) === String(id));

export const createRecord = (collectionName, payload, idField = "id") => {
  const items = getCollection(collectionName);
  const record = {
    ...payload,
    [idField]: payload[idField] || nextId(collectionName),
  };
  items.push(record);
  setCollection(collectionName, items);
  return record;
};

export const updateRecord = (collectionName, id, payload) => {
  const items = getCollection(collectionName);
  const index = items.findIndex((item) => String(item.id) === String(id));
  if (index === -1) {
    return null;
  }
  const updated = { ...items[index], ...payload, id: items[index].id };
  items[index] = updated;
  setCollection(collectionName, items);
  return updated;
};

export const deleteRecord = (collectionName, id) => {
  const items = getCollection(collectionName).filter(
    (item) => String(item.id) !== String(id)
  );
  setCollection(collectionName, items);
  return { success: true };
};

export const getCurrentUserRole = () => {
  try {
    const raw = localStorage.getItem("persist:root");
    if (!raw) {
      return "ROLE_ADMINISTRATOR";
    }
    const root = JSON.parse(raw);
    const auth = JSON.parse(root.auth || "{}");
    return auth.user?.role || "ROLE_ADMINISTRATOR";
  } catch (e) {
    return "ROLE_ADMINISTRATOR";
  }
};
