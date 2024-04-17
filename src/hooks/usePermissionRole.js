import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/auth/actions";
import { useEffect } from "react";

const usePermission = (permissionType) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    if (permissions.length === 0) {
      dispatch(authActions.fetchPermissions());
    }
  }, [dispatch]);

  const permission = permissions.filter(
    (permission) => permission.name === permissionType
  );
  return permission[0]?.accessType;
};

export default usePermission;
