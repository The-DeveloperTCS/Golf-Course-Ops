export const statuses = {
  0: { name: "Pending", action: "Pending", displayClass: "c-secondary" },
  1: { name: "Placed", action: "Placed", displayClass: "c-info" },
  2: { name: "Confirmed", action: "Confirm", displayClass: "c-primary" },
  3: { name: "Processing", action: "Process", displayClass: "c-dark" },
  4: { name: "Shipped", action: "Shipped", displayClass: "c-success" },
  5: { name: "Delivered", action: "Delivered", displayClass: "c-dark" },
  6: { name: "Cancelled", action: "Cancel", displayClass: "c-warning" },
  7: { name: "Returned", action: "Return", displayClass: "c-danger" },
};

const getStatus = (id) => {
  return statuses[parseInt(id)];
};

export const toString = (id) => {
  return getStatus(id)?.name;
};

export const toActionString = (id) => {
  return getStatus(id).action;
};

export const toDisplayClass = (id) => {
  return getStatus(id)?.displayClass;
};

export const statusNames = () => {
  return Object.values(statuses).map((s) => s.name);
};

export const sidebarStatusNames = () => {
  return Object.values(statuses)
    .filter((s) => s.name !== "Returned")
    .map((s) => s.name);
};

export const getId = (statusName) => {
  const f = Object.keys(statuses).filter((sid) => toString(sid) === statusName);
  return parseInt(f[0]);
};
