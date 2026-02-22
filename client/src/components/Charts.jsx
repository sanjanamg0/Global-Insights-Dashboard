import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const COLORS = ["#7367f0", "#28c76f", "#ff9f43", "#ea5455", "#00cfe8", "#a66cff"];

export const InsightsByYearChart = ({ data, dark }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#3b4253' : '#eee'} vertical={false} />
      {/* We use 'name' and 'value' here to match your Dashboard's groupData logic */}
      <XAxis dataKey="name" tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} />
      <Tooltip 
        contentStyle={{ borderRadius: '10px', background: dark ? '#283046' : '#fff', border: 'none', color: dark ? '#fff' : '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
      />
      <Line type="monotone" dataKey="value" stroke="#7367f0" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export const TopicPieChart = ({ data, dark }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        innerRadius={50}
        paddingAngle={5}
      >
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} stroke={dark ? '#1f263c' : '#fff'} strokeWidth={2} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{ borderRadius: '10px', background: dark ? '#283046' : '#fff', border: 'none', color: dark ? '#fff' : '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
      />
      <Legend wrapperStyle={{ paddingTop: '20px', color: dark ? '#a0a0a0' : '#333' }} />
    </PieChart>
  </ResponsiveContainer>
);

export const CountryBarChart = ({ data, dark }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#3b4253' : '#eee'} vertical={false} />
      <XAxis dataKey="name" tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} />
      <Tooltip 
        cursor={{ fill: dark ? '#3b4253' : '#f4f5fa' }} 
        contentStyle={{ borderRadius: '10px', background: dark ? '#283046' : '#fff', border: 'none', color: dark ? '#fff' : '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
      />
      <Bar dataKey="value" fill="#28c76f" radius={[6, 6, 0, 0]} barSize={40} />
    </BarChart>
  </ResponsiveContainer>
);
export const RegionBarChart = ({ data, dark }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#3b4253' : '#eee'} horizontal={false} />
      <XAxis type="number" tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} />
      <YAxis type="category" dataKey="name" tick={{ fill: dark ? '#a0a0a0' : '#666' }} axisLine={false} tickLine={false} width={100} />
      <Tooltip cursor={{ fill: dark ? '#3b4253' : '#f4f5fa' }} contentStyle={{ borderRadius: '10px', background: dark ? '#283046' : '#fff', border: 'none', color: dark ? '#fff' : '#333' }} />
      <Bar dataKey="value" fill="#00cfe8" radius={[0, 6, 6, 0]} barSize={20} />
    </BarChart>
  </ResponsiveContainer>
);
// Add these to your Recharts import at the top of the file:
// import { ..., Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

export const MetricsRadarChart = ({ data, dark }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
      <PolarGrid stroke={dark ? '#3b4253' : '#eee'} />
      <PolarAngleAxis dataKey="metric" tick={{ fill: dark ? '#a0a0a0' : '#666', fontWeight: 600 }} />
      <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
      <Radar name="Average Score" dataKey="value" stroke="#ff9f43" fill="#ff9f43" fillOpacity={0.6} />
      <Tooltip 
        contentStyle={{ borderRadius: '10px', background: dark ? '#283046' : '#fff', border: 'none', color: dark ? '#fff' : '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
      />
    </RadarChart>
  </ResponsiveContainer>
);