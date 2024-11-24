import React, { useState, useEffect } from "react";
import "./styles/UserPage.css";

const UsersPage = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    if (storedRoles) {
      setRoles(storedRoles);
    }

    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }, [roles]);

  const addUser = () => {
    if (!newUserName) return;

    const newUser = {
      id: users.length + 1,
      name: newUserName,
      role: selectedRole,
      status: "Active",
    };

    setUsers([...users, newUser]);
    setNewUserName("");
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const removeUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="user-page">
      <h2>Manage Users</h2>

      <div className="user-form">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter user name"
          className="input-field"
        />
        <select
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
          className="select-field"
        >
          {roles.length > 0 ? (
            roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))
          ) : (
            <option disabled>No roles available</option>
          )}
        </select>
        <button onClick={addUser} className="btn">
          Add User
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td className="user-actions">
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className="status-btn"
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => removeUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
