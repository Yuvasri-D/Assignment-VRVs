import React, { useState, useEffect } from "react";
import PermissionsManager from "./PermissionManager";
import "./styles/RolesPAge.css";

const RolesPage = () => {
  const [newRoleName, setNewRoleName] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles"));
    if (storedRoles) {
      setRoles(storedRoles);
    }
  }, [setRoles]);

  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }, [roles]);

  const updateRolePermissions = (roleId, newPermissions) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId ? { ...role, permissions: newPermissions } : role
      )
    );
  };

  const addRole = () => {
    if (!newRoleName) return;
    const newRole = {
      id: roles.length + 1,
      name: newRoleName,
      permissions: [],
      availablePermissions: [
        "Read",
        "Write",
        "Delete",
        "Manage Users",
        "Manage Roles",
      ],
    };
    setRoles([...roles, newRole]);
    setNewRoleName("");
  };

  // Function to delete a role
  const deleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return (
    <div className="roles-page">
      <h2>Manage Roles</h2>

      {/* Add New Role */}
      <div className="add-role-form">
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="Enter new role name"
          className="input-field"
        />
        <button onClick={addRole} className="btn" style={{ height: "40px" }}>
          Add Role
        </button>
      </div>

      {/* List of Roles */}
      {roles.map((role) => (
        <div key={role.id} className="role-card">
          <div className="role-header">
            <h3>{role.name}</h3>
            <button onClick={() => deleteRole(role.id)} className="delete-btn">
              Delete Role
            </button>
          </div>
          <PermissionsManager
            role={role}
            onUpdatePermissions={(newPermissions) =>
              updateRolePermissions(role.id, newPermissions)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default RolesPage;
