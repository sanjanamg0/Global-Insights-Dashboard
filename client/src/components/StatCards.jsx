const StatCards = ({ data }) => {
  const avgIntensity =
    data.reduce((a, b) => a + (b.intensity || 0), 0) / (data.length || 1);

  return (
    <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
      <Card title="Total Records" value={data.length} />
      <Card title="Avg Intensity" value={avgIntensity.toFixed(2)} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={{
    background: "var(--card)",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "180px"
  }}>
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default StatCards;