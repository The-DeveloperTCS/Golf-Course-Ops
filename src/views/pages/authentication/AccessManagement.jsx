import usePermission from "hooks/usePermission";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Table } from "reactstrap";

import {
  getAllPermissions,
  getAllRoles,
  getPermissionsForRole,
  updatePermission,
} from "redux/users/service";

const humanize = (s) => {
  return s
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const RoleAccessType = ({ type, onChange }) => {
  const accessTypes = useMemo(
    () => ["NONE", "READ", "RESTRICTED_READ", "WRITE", "RESTRICTED_WRITE"],
    []
  );

  const accessTypeOptions = useMemo(() => {
    return accessTypes.map((a) => {
      return { label: humanize(a), value: a };
    });
  }, [accessTypes]);

  return (
    <Select
      options={accessTypeOptions}
      value={accessTypeOptions.find((a) => a.value === type)}
      onChange={(v) => onChange(v.value)}
    />
  );
};

const PermissionsList = ({ role }) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    if (!role) return null;
    const permsRes = await getAllPermissions();
    const rolePermsRes = await getPermissionsForRole(role);

    const updatedData = permsRes.data.map((perm) => {
      const rolePerm = rolePermsRes.data.find((p) => p.name === perm);
      return {
        name: perm,
        ...rolePerm,
        accessType: rolePerm ? rolePerm.accessType : "NONE",
      };
    });
    setData(updatedData.sort((a, b) => a.name.localeCompare(b.name)));
  }, [role]);

  const handleAccessTypeUpdate = async (perm, type, ind) => {
    await updatePermission({
      ...perm,
      accessType: type,
      role: role,
      description: "Updated from portal",
    });

    const newData = [...data];
    newData[ind].accessType = type;
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
                    type={p.accessType}
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
    getAllRoles().then((res) => {
      setRoles(
        res.data.map((role) => ({
          value: role,
          label: humanize(role.replace("ROLE_", "")),
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

  if (!can("ACCESS_MANAGEMENT", ["WRITE"])) {
    return <Redirect to="/" />;
  }

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
