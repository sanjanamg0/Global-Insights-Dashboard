import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";

// Components (Make sure these paths match your folder structure!)
import Sidebar from "../components/layout/Sidebar"; 
import { 
  InsightsByYearChart, 
  TopicPieChart, 
  CountryBarChart, 
  RegionBarChart, 
  MetricsRadarChart 
} from "../components/charts"; 

// Styles
import "../styles/dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Layout & Navigation State
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("analytics");

  // 🔥 ALL 10 FILTER STATES 🔥
  const [year, setYear] = useState("All");          
  const [endYear, setEndYear] = useState("All");    
  const [topic, setTopic] = useState("All");        
  const [sector, setSector] = useState("All");      
  const [pestle, setPestle] = useState("All");      
  const [source, setSource] = useState("All");      
  const [swot, setSwot] = useState("All");          
  const [region, setRegion] = useState("All");      
  const [country, setCountry] = useState("All");    
  const [city, setCity] = useState("All");          

  // Table Sorting & Pagination State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const chartsRef = useRef(null);
  const tableRef = useRef(null);

  // Fetch Data
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/insights")
      .then(res => {
        setData(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Dark Mode Toggle
  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  // Reset page to 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [year, endYear, topic, sector, pestle, source, swot, region, country, city]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Instantly reset all 10 filters
  const clearFilters = () => {
    setYear("All"); setEndYear("All"); setTopic("All"); setSector("All");
    setPestle("All"); setSource("All"); setSwot("All"); setRegion("All");
    setCountry("All"); setCity("All");
  };

  /* ---------------- MEMOIZED LOGIC ---------------- */
  
  // 1. Filter the data safely
  const baseFiltered = useMemo(() => {
    if (!Array.isArray(data)) return []; 

    return data.filter(d =>
      (year === "All" || String(d?.start_year) === String(year)) &&
      (endYear === "All" || String(d?.end_year) === String(endYear)) &&
      (topic === "All" || d?.topic === topic) &&
      (sector === "All" || d?.sector === sector) &&
      (pestle === "All" || d?.pestle === pestle) &&
      (source === "All" || d?.source === source) &&
      (swot === "All" || d?.swot === swot) &&
      (region === "All" || d?.region === region) &&
      (country === "All" || d?.country === country) &&
      (city === "All" || d?.city === city)
    );
  }, [data, year, endYear, topic, sector, pestle, source, swot, region, country, city]);

  // 2. Sorting Logic for the Table
  const filtered = useMemo(() => {
    let sortable = [...baseFiltered];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [baseFiltered, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 3. Extract unique options for Dropdowns
  const { years, endYears, topics, sectors, pestles, sources, swots, regions, countries, cities } = useMemo(() => {
    if (!Array.isArray(data)) return { years:[], endYears:[], topics:[], sectors:[], pestles:[], sources:[], swots:[], regions:[], countries:[], cities:[] };
    
    const uniq = (k) => [...new Set(data.map(d => d[k]).filter(Boolean))];
    return {
      years: uniq("start_year").sort(),
      endYears: uniq("end_year").sort(),
      topics: uniq("topic").sort(),
      sectors: uniq("sector").sort(),
      pestles: uniq("pestle").sort(),
      sources: uniq("source").sort(),
      swots: uniq("swot").sort(),
      regions: uniq("region").sort(),
      countries: uniq("country").sort(),
      cities: uniq("city").sort()
    };
  }, [data]);

  const getAvg = (k) => {
    if (filtered.length === 0) return 0;
    const total = filtered.reduce((sum, item) => sum + (item[k] || 0), 0);
    return (total / filtered.length).toFixed(1);
  };

  const groupData = (k) => {
    const m = {};
    baseFiltered.forEach(d => {
      if (d[k]) m[d[k]] = (m[d[k]] || 0) + 1;
    });
    return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  };

  // Pre-computing data for Charts
  const chartData = useMemo(() => ({
    years: groupData("start_year").sort((a, b) => a.name.localeCompare(b.name)),
    topics: groupData("topic").slice(0, 6),
    regions: groupData("region").slice(0, 5),
    countries: groupData("country").slice(0, 6)
  }), [baseFiltered]);

  // Data for the new Radar Chart
  const radarData = useMemo(() => [
    { metric: "Intensity", value: Number(getAvg("intensity")) },
    { metric: "Likelihood", value: Number(getAvg("likelihood")) },
    { metric: "Relevance", value: Number(getAvg("relevance")) }
  ], [filtered]);

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage]);

  const exportCSV = () => {
    const rows = [
      ["Start Year", "End Year", "Topic", "Sector", "Region", "Country", "Intensity", "Likelihood", "Relevance"],
      ...filtered.map(d => [d.start_year, d.end_year, d.topic, d.sector, d.region, d.country, d.intensity, d.likelihood, d.relevance])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "blackcoffer_insights.csv";
    a.click();
  };

  const navigate = (key) => {
    setActive(key);
    if (key === "insights") chartsRef.current?.scrollIntoView({ behavior: "smooth" });
    if (key === "reports") tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isFiltered = year !== "All" || endYear !== "All" || topic !== "All" || sector !== "All" || 
                     pestle !== "All" || source !== "All" || swot !== "All" || region !== "All" || 
                     country !== "All" || city !== "All";

  return (
    <div className={`app ${collapsed ? "collapsed" : ""}`}>
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} active={active} navigate={navigate} />

      <main className="dashboard">
        
        {/* 🔥 NEW ELEVATED TOPBAR 🔥 */}
        <header className="topbar elevated-topbar">
          <div className="topbar-left">
            <h1>Analytics Overview</h1>
            <p className="subtitle">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="topbar-right">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search insights, topics..." className="top-search" />
            </div>

            <div className="top-actions">
              <button className="icon-btn nav-icon-btn" title="Notifications">
                🔔<span className="notification-dot"></span>
              </button>

              <button onClick={() => setDark(!dark)} title="Toggle theme" className="icon-btn nav-icon-btn theme-btn">
                {dark ? "☀️" : "🌙"}
              </button>

              <button className="logout-btn-sleek" onClick={handleLogout}>
                Logout <span>➜</span>
              </button>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="loading-state"><div className="spinner"></div> Loading massive data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="content-fade-in">
            
            {/* ALL 10 FILTERS */}
            <div className="panel filters-panel">
              <div className="filter-group">
                <select value={year} onChange={e => setYear(e.target.value)}><option value="All">🗓️ Start Year</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
                <select value={endYear} onChange={e => setEndYear(e.target.value)}><option value="All">🏁 End Year</option>{endYears.map(y => <option key={y} value={y}>{y}</option>)}</select>
                <select value={topic} onChange={e => setTopic(e.target.value)}><option value="All">📌 Topics</option>{topics.map(t => <option key={t} value={t}>{t}</option>)}</select>
                <select value={sector} onChange={e => setSector(e.target.value)}><option value="All">🏭 Sector</option>{sectors.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <select value={pestle} onChange={e => setPestle(e.target.value)}><option value="All">⚖️ PESTLE</option>{pestles.map(p => <option key={p} value={p}>{p}</option>)}</select>
                <select value={source} onChange={e => setSource(e.target.value)}><option value="All">📰 Source</option>{sources.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <select value={swot} onChange={e => setSwot(e.target.value)}><option value="All">💪 SWOT</option>{swots.map(s => <option key={s} value={s}>{s}</option>)}</select>
                <select value={region} onChange={e => setRegion(e.target.value)}><option value="All">🗺️ Region</option>{regions.map(r => <option key={r} value={r}>{r}</option>)}</select>
                <select value={country} onChange={e => setCountry(e.target.value)}><option value="All">🌍 Country</option>{countries.map(c => <option key={c} value={c}>{c}</option>)}</select>
                <select value={city} onChange={e => setCity(e.target.value)}><option value="All">🏙️ City</option>{cities.map(c => <option key={c} value={c}>{c}</option>)}</select>
                
                {isFiltered && <button className="clear-btn" onClick={clearFilters}>Reset</button>}
              </div>
              <button className="export-btn" onClick={exportCSV}>📥 Export CSV</button>
            </div>

            {/* KPI CARDS */}
            <div className="kpis">
              <div className="card stat-card"><span>Total Insights</span><h2>{filtered.length}</h2><div className="accent-bar bg-purple"></div></div>
              <div className="card stat-card"><span>Avg Intensity</span><h2>{getAvg("intensity")}</h2><div className="accent-bar bg-green"></div></div>
              <div className="card stat-card"><span>Avg Likelihood</span><h2>{getAvg("likelihood")}</h2><div className="accent-bar bg-orange"></div></div>
              <div className="card stat-card"><span>Avg Relevance</span><h2>{getAvg("relevance")}</h2><div className="accent-bar bg-cyan"></div></div>
            </div>

            {/* CHARTS */}
            <div ref={chartsRef} className="charts">
              
              <div className="panel chart-panel">
                <h3>Core Metrics Analysis</h3>
                {filtered.length > 0 ? <MetricsRadarChart data={radarData} dark={dark} /> : <div className="empty-state">No data</div>}
              </div>

              <div className="panel chart-panel">
                <h3>Insights Timeline</h3>
                {filtered.length > 0 ? <InsightsByYearChart data={chartData.years} dark={dark} /> : <div className="empty-state">No data</div>}
              </div>

              <div className="panel chart-panel">
                <h3>Top Topics Distribution</h3>
                {filtered.length > 0 ? <TopicPieChart data={chartData.topics} dark={dark} /> : <div className="empty-state">No data</div>}
              </div>

              <div className="panel chart-panel">
                <h3>Insights by Region</h3>
                {filtered.length > 0 ? <RegionBarChart data={chartData.regions} dark={dark} /> : <div className="empty-state">No data</div>}
              </div>

              <div className="panel chart-panel full-width">
                <h3>Insights by Country</h3>
                {filtered.length > 0 ? <CountryBarChart data={chartData.countries} dark={dark} /> : <div className="empty-state">No data</div>}
              </div>
            </div>

            {/* TABLE */}
            <div ref={tableRef} className="panel table-panel">
              <div className="table-header">
                <h3>Detailed Reports Data</h3>
                <span className="badge">{filtered.length} Records Found</span>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      {["start_year", "topic", "sector", "region", "country", "intensity", "likelihood", "relevance"].map((key) => (
                        <th key={key} onClick={() => handleSort(key)} className="sortable-th">
                          {key.replace("_", " ").toUpperCase()} 
                          {sortConfig.key === key ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : " ↕️"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((d, i) => (
                      <tr key={i} className="table-row">
                        <td><span className="year-pill">{d.start_year || "-"}</span></td>
                        <td>{d.topic || "-"}</td>
                        <td>{d.sector || "-"}</td>
                        <td>{d.region || "-"}</td>
                        <td>{d.country || "-"}</td>
                        <td><strong>{d.intensity || 0}</strong></td>
                        <td>{d.likelihood || 0}</td>
                        <td>{d.relevance || 0}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan="8" className="empty-state">No data matches your filters. 🧐</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderTop: '1px solid #eee' }}>
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(p => p - 1)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: currentPage === 1 ? '#f5f5f5' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    ◀ Previous
                  </button>
                  <span style={{ alignSelf: 'center', color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(p => p + 1)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: currentPage === totalPages ? '#f5f5f5' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                  >
                    Next ▶
                  </button>
                </div>
              )}
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}