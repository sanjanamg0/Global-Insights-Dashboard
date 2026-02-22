import React from "react";

export default function Sidebar({ collapsed, setCollapsed, active, navigate }) {
  // Array of navigation items makes it super easy to add new links later
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
            <h4>Sudhansu</h4>
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
            {/* Only show text if sidebar is NOT collapsed */}
            {!collapsed && <span className="nav-label"> {item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}