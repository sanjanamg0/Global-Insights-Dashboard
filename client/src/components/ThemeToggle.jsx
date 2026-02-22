const ThemeToggle = () => {
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      🌙
    </button>
  );
};

export default ThemeToggle;