import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import "./styles/DashboardPage.css";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      const storedRoles = JSON.parse(localStorage.getItem("roles"));

      setUserCount(storedUsers ? storedUsers.length : 0);
      setRoleCount(storedRoles ? storedRoles.length : 0);

      setPendingTasks(12);

      setRecentActivity([
        { id: 1, action: "User 'John Doe' added", date: "2 hours ago" },
        { id: 2, action: "Role 'Editor' created", date: "1 day ago" },
        {
          id: 3,
          action: "Task 'Review Reports' completed",
          date: "3 days ago",
        },
        { id: 4, action: "User 'Jane Smith' deactivated", date: "5 days ago" },
      ]);
    }
  }, [isAuthenticated]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Manage your platform with ease.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card user-card">
          <h3>Users</h3>
          <p>{userCount}</p>
          <Link to="/users" className="view-btn">
            View Users
          </Link>
        </div>
        <div className="stat-card user-card">
          <h3>Roles</h3>
          <p>{roleCount}</p>
          <Link to="/roles" className="view-btn">
            View Roles
          </Link>
        </div>
        <div className="stat-card task-card">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
          <Link to="/" className="view-btn">
            View Tasks
          </Link>
        </div>
      </div>

      <div className="dashboard-info">
        <h2>Platform Activity</h2>
        <p>
          Here you can monitor user activity, system performance, and recent
          updates.
        </p>

        <div className="activity-feed">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((activity) => (
              <li key={activity.id}>
                <span className="activity-action">{activity.action}</span>
                <span className="activity-date">{activity.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
