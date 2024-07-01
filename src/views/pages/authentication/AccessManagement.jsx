import usePermission from "hooks/usePermission";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Table } from "reactstrap";

import {
  getPermissionsList,
  getPermissionsForRole,
  updatePermissionsOfRoles,
} from "redux/permission/service";
import { getRolesList } from "redux/role/service";

const humanize = (s) => {
  return s
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const RoleAccessType = ({ type, onChange }) => {
  const accesss = useMemo(
    () => ["NONE", "READ", "RESTRICTED_READ", "WRITE", "RESTRICTED_WRITE"],
    []
  );

  const accessOptions = useMemo(() => {
    return accesss.map((a) => {
      return { label: humanize(a), value: a };
    });
  }, [accesss]);

  return (
    <Select
      options={accessOptions}
      value={accessOptions.find((a) => a.value === type)}
      onChange={(v) => onChange(v.value)}
    />
  );
};

const PermissionsList = ({ role }) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    if (!role) return null;
    const permsRes = await getPermissionsList("", "");
    const rolePermsRes = await getPermissionsForRole(role);
    setData([]);
    const updatedData = permsRes.permissions.map((perm) => {
      const rolePerm = rolePermsRes.data.find((p) => p.name === perm.name);
      return {
        name: perm.name,
        ...rolePerm,
        access: rolePerm ? rolePerm.access : "NONE",
      };
    });
    setData(updatedData.sort((a, b) => a.name.localeCompare(b.name)));
  }, [role]);

  const handleAccessTypeUpdate = async (perm, type, ind) => {
    await updatePermissionsOfRoles({
      ...perm,
      access: type,
      role: role,
      description: "Updated from portal",
    });

    const newData = [...data];
    newData[ind].access = type;
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, [role, fetchData]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="row ma-0">
      <div className="col-lg-6">
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Access Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => (
              <tr key={i}>
                <td>{humanize(p.name)}</td>
                <td>
                  <RoleAccessType
                    type={p.access}
                    onChange={(t) => handleAccessTypeUpdate(p, t, i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const RoleSelect = ({ role, onRoleSelect }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRolesList("", "").then((res) => {
      setRoles(
        res.data.roles.map((role) => ({
          value: role.name,
          label: humanize(role.name.replace("ROLE_", "")),
        }))
      );
    });
  }, []);

  return (
    <div className="row ma-0">
      <div className="col-lg-1">Role</div>
      <div className="col-lg-3">
        <Select
          options={roles}
          value={roles.find((r) => r.value === role)}
          onChange={(r) => onRoleSelect(r.value)}
        />
      </div>
    </div>
  );
};

const AccessManagement = () => {
  const [can] = usePermission();
  const [selectedRole, setSelectedRole] = useState(null);

  // if (!can("ACCESS_MANAGMENT", ["WRITE"])) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="row ma-0">
      <div className="col-lg-12 ptb-15">
        <div className="roe-card-style">
          <div className="roe-card-header flex center">
            <div className="flex-1 mr-15 my-title ml-1">Access Management</div>
          </div>

          <div className="roe-card-body">
            <RoleSelect role={selectedRole} onRoleSelect={setSelectedRole} />
            <PermissionsList role={selectedRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(AccessManagement);
