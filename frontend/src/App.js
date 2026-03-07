import { useState } from "react";
import "@/App.css";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, LayoutDashboard, Database, MessageSquare, Shield, Info } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Sample data for charts
const reconciliationCoverageData = [
  { period: 'FY 23-24', value: 45 },
  { period: 'Q3 FY 23-24', value: 50 },
  { period: 'Q4 FY 23-24', value: 55 },
  { period: 'Q1 FY 24-25', value: 60 },
  { period: 'Q2 FY 24-25', value: 68 },
  { period: 'Q3 FY 24-25', value: 72 },
  { period: 'Q4 FY 24-25', value: 80 },
  { period: 'Q1 FY 25-26', value: 92 },
  { period: 'Q2 FY 25-26', value: 95 },
  { period: 'Q3 FY 25-26', value: 88 },
  { period: 'Q4 FY 25-26', value: 50 },
];

const weeklyUsageData = [
  { week: 'Aug 10-15', recons: 2 },
  { week: 'Aug 16-22', recons: 2 },
  { week: 'Sept 09-15', recons: 2 },
  { week: 'Oct 10-15', recons: 15 },
  { week: 'Nov 17-23', recons: 10 },
  { week: 'Nov 24-30', recons: 8 },
  { week: 'Dec 01-07', recons: 10 },
  { week: 'Dec 15-21', recons: 24 },
  { week: 'Jan 05-11', recons: 30 },
  { week: 'Jan 12-18', recons: 85 },
  { week: 'Jan 19-25', recons: 68 },
  { week: 'Feb 02-08', recons: 38 },
  { week: 'Feb 16-22', recons: 25 },
  { week: 'Feb 23-01', recons: 28 },
  { week: 'Mar 02-08', recons: 30 },
  { week: 'Mar 23-29', recons: 52 },
];

function App() {
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  return (
    <div className="dashboard-container" data-testid="ledger-recon-dashboard">
      {/* Sidebar */}
      <aside className="sidebar" data-testid="sidebar">
        {/* Logo */}
        <div className="logo-container" data-testid="logo-container">
          <div className="logo-circle">
            <span className="logo-icon">O</span>
          </div>
          <span className="logo-text">OneCap</span>
        </div>

        {/* Navigation */}
        <nav className="nav-menu" data-testid="nav-menu">
          <div className="nav-item active" data-testid="nav-dashboard">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          
          <div className="nav-item" data-testid="nav-data">
            <Database size={20} />
            <span>Data</span>
          </div>
          
          <div className="nav-item" data-testid="nav-conversational-insights">
            <MessageSquare size={20} />
            <span>Conversational Insights</span>
          </div>
          
          <div 
            className="nav-item with-dropdown" 
            onClick={() => setAdminPortalOpen(!adminPortalOpen)}
            data-testid="nav-admin-portal"
          >
            <div className="nav-item-content">
              <Shield size={20} />
              <span>Admin Portal</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`dropdown-icon ${adminPortalOpen ? 'open' : ''}`}
            />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" data-testid="main-content">
        {/* Header */}
        <header className="dashboard-header" data-testid="dashboard-header">
          <h1 className="dashboard-title">Ledger Recon Dashboard</h1>
        </header>

        {/* Metrics Cards */}
        <div className="metrics-grid" data-testid="metrics-grid">
          <div className="metric-card" data-testid="metric-card-vendors">
            <h3 className="metric-title">Total Vendors</h3>
            <p className="metric-value">78</p>
          </div>
          
          <div className="metric-card" data-testid="metric-card-customers">
            <h3 className="metric-title">Total Customers</h3>
            <p className="metric-value">24</p>
          </div>
          
          <div className="metric-card" data-testid="metric-card-discrepancy">
            <h3 className="metric-title">Total Discrepancy</h3>
            <p className="metric-value discrepancy">₹657.0 Cr</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid" data-testid="charts-grid">
          {/* Reconciliation Coverage Chart */}
          <div className="chart-card" data-testid="chart-card-coverage">
            <div className="chart-header">
              <h3 className="chart-title">Reconciliation Coverage</h3>
              <Info size={16} className="info-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reconciliationCoverageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="period" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-label">Time Period</p>
          </div>

          {/* Weekly Usage Chart */}
          <div className="chart-card" data-testid="chart-card-weekly-usage">
            <div className="chart-header">
              <h3 className="chart-title">Weekly Usage</h3>
              <Info size={16} className="info-icon" />
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="week" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    label={{ value: 'No of Recons', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="recons" 
                    stroke="#4A90E2" 
                    strokeWidth={2}
                    dot={{ fill: '#4A90E2', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-label">Weeks</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;