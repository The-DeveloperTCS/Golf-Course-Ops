import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/auth/actions";
import { useEffect } from "react";

const usePermission = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.auth.permissions || []);

  useEffect(() => {
    if (permissions.length === 0) {
      dispatch(authActions.fetchPermissions());
    }
  }, [dispatch]);

  const can = (resource, types) => {
    const permission = permissions.filter(
      (permission) =>
        permission.name === resource && types.includes(permission.access)
    );
    return permission.length > 0;
  };

  return [can, permissions];
};

export default usePermission;
