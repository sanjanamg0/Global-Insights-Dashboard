const Filters = ({ setFilters }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <input
        placeholder="Topic"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, topic: e.target.value }))
        }
      />
    </div>
  );
};

export default Filters;