import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const YearChart = ({ data }) => {
  const yearData = Object.values(
    data.reduce((acc, cur) => {
      const year = cur.start_year || "Unknown";
      acc[year] = acc[year] || { year, count: 0 };
      acc[year].count += 1;
      return acc;
    }, {})
  );

  return (
    <div style={{ height: 300 }}>
      <h3>Insights by Year</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={yearData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#7367f0" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearChart;