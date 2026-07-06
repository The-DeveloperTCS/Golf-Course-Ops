import { delay, axiosResponse, axiosError } from "mock/mockHelpers";
import { findDemoUser } from "mock/demoUsers";
import { getCurrentUserRole } from "mock/mockDb";
import { getPermissionsForRoleName } from "mock/permissions";

export const login = async (username, password) => {
  await delay(400);
  const user = findDemoUser(username, password);
  if (!user) {
    return axiosError("Invalid username or password");
  }
  const { password: _, ...safeUser } = user;
  return {
    token: `demo-token-${user.id}`,
    user: safeUser,
  };
};

export const permissions = async (roleName) => {
  await delay(200);
  const role = roleName || getCurrentUserRole();
  return axiosResponse(getPermissionsForRoleName(role));
};
