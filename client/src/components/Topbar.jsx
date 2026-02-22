const Topbar = ({ onLogout }) => {
  return (
    <div className="topbar">
      <h2 className="topbar-title">Analytics Dashboard</h2>

      <div className="topbar-actions">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;