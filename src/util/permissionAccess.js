const READ_ACCESS = ["READ", "RESTRICTED_READ", "WRITE", "RESTRICTED_WRITE"];

export const canAccessResource = (permissions = [], resource) => {
  if (!resource) {
    return true;
  }
  const permission = permissions.find((entry) => entry.name === resource);
  if (!permission) {
    return false;
  }
  return READ_ACCESS.includes(permission.access);
};

export const canWriteResource = (permissions = [], resource) => {
  if (!resource) {
    return true;
  }
  const permission = permissions.find((entry) => entry.name === resource);
  return (
    permission?.access === "WRITE" || permission?.access === "RESTRICTED_WRITE"
  );
};
