import React, { useState, useEffect } from "react";

export default function Sidebar({ collapsed, setCollapsed, active, navigate }) {
  // 1. Create a state to hold the user's name, defaulting to "Admin" or "User"
  const [userName, setUserName] = useState("Admin");

  // 2. Grab the user data from localStorage when the sidebar loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If your backend sends the name, update the state!
        if (parsedUser && parsedUser.name) {
          setUserName(parsedUser.name);
        }
      } catch (error) {
        console.error("Could not parse user data from localStorage", error);
      }
    }
  }, []);

  const navItems = [
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "insights", icon: "🌍", label: "Insights" },
    { id: "reports", icon: "📄", label: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      {/* BRANDING / PROFILE */}
      <div className="profile">
        <img 
          src="https://i.pravatar.cc/100?img=11" 
          alt="profile" 
          className="glow-avatar" 
        />
        {!collapsed && (
          <div className="profile-info">
            {/* 3. Display the dynamic name here! */}
            <h4>{userName}</h4>
            <span>System Admin</span>
          </div>
        )}
      </div>

      {/* COLLAPSE TOGGLE */}
      <button 
        className="collapse" 
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {collapsed ? "▶" : "◀ Collapse"}
      </button>

      {/* NAVIGATION */}
      <nav>
        {navItems.map((item) => (
          <a
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => navigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label"> {item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}