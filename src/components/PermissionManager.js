import React from "react";

const PermissionsManager = ({ role, onUpdatePermissions }) => {
  const handlePermissionChange = (permission) => {
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((perm) => perm !== permission)
      : [...role.permissions, permission];
    onUpdatePermissions(updatedPermissions);
  };

  return (
    <div className="permissions-manager">
      <h4>Permissions</h4>
      <div className="permissions-list">
        {role.availablePermissions.map((permission) => (
          <label key={permission} className="permission-item">
            <input
              type="checkbox"
              checked={role.permissions.includes(permission)}
              onChange={() => handlePermissionChange(permission)}
            />
            {permission}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PermissionsManager;
