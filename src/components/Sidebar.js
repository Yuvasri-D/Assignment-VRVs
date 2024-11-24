import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./styles/sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <i className="fas fa-cogs"></i>
          Admin Panel
        </div>

        {/* Sidebar Links */}
        <Link
          to="/dashboard"
          className={`sidebar-link ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className={`sidebar-link ${
            location.pathname === "/users" ? "active" : ""
          }`}
        >
          Users
        </Link>
        <Link
          to="/roles"
          className={`sidebar-link ${
            location.pathname === "/roles" ? "active" : ""
          }`}
        >
          Roles
        </Link>

        <div className="sidebar-link logout-link" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? "►" : "◄"}
      </div>
    </div>
  );
};

export default Sidebar;
