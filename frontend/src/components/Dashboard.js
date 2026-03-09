import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';

// Sample data for E-commerce reconciliation
const orderReconciliationData = [
  { period: 'Jan', orders: 450 },
  { period: 'Feb', orders: 520 },
  { period: 'Mar', orders: 680 },
  { period: 'Apr', orders: 750 },
  { period: 'May', orders: 890 },
  { period: 'Jun', orders: 1020 },
  { period: 'Jul', orders: 1150 },
  { period: 'Aug', orders: 1280 },
  { period: 'Sep', orders: 1450 },
  { period: 'Oct', orders: 1620 },
];

const settlementTrendData = [
  { week: 'Week 1', amount: 12.5 },
  { week: 'Week 2', amount: 15.8 },
  { week: 'Week 3', amount: 18.2 },
  { week: 'Week 4', amount: 22.4 },
  { week: 'Week 5', amount: 19.6 },
  { week: 'Week 6', amount: 25.3 },
  { week: 'Week 7', amount: 28.9 },
  { week: 'Week 8', amount: 32.5 },
  { week: 'Week 9', amount: 35.8 },
  { week: 'Week 10', amount: 38.2 },
];

const paymentModeData = [
  { mode: 'Jan', razorpay: 45, cod: 30, giftCard: 15, directBank: 10 },
  { mode: 'Feb', razorpay: 50, cod: 28, giftCard: 12, directBank: 10 },
  { mode: 'Mar', razorpay: 55, cod: 25, giftCard: 10, directBank: 10 },
  { mode: 'Apr', razorpay: 60, cod: 22, giftCard: 10, directBank: 8 },
  { mode: 'May', razorpay: 65, cod: 20, giftCard: 8, directBank: 7 },
  { mode: 'Jun', razorpay: 70, cod: 18, giftCard: 7, directBank: 5 },
];

const revenueSourceData = [
  { name: 'Zepto', value: 1100, color: '#003DA5' },
  { name: 'Oswaal', value: 304, color: '#6B4CE6' },
  { name: 'Test User', value: 200, color: '#00BCD4' },
  { name: 'Creative', value: 90, color: '#9E9E9E' },
  { name: 'IKSB', value: 90, color: '#D81B60' },
];

const exceptionData = [
  { type: 'Missing Razorpay Payment', count: 45, severity: 'high' },
  { type: 'COD Not Deposited', count: 32, severity: 'high' },
  { type: 'Settlement Pending', count: 128, severity: 'medium' },
  { type: 'Return Mismatch', count: 18, severity: 'medium' },
  { type: 'Duplicate Orders', count: 8, severity: 'low' },
];

const Dashboard = () => {
  const [reconType, setReconType] = useState('E-Commerce Reconciliation');
  const [showDropdown, setShowDropdown] = useState(false);

  const reconTypes = [
    'E-Commerce Reconciliation',
    'Revenue Reconciliation',
    'Ledger Reconciliation',
    'Bank Reconciliation',
  ];

  return (
    <div className="dashboard-content" data-testid="dashboard-page">
      {/* Header with Dropdown and Logo */}
      <header className="dashboard-header-with-dropdown">
        <div className="header-logo-and-title">
          <img 
            src="https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/rmuu7ljf_OneCap%20logo%20Blue.svg" 
            alt="OneCap Logo" 
            className="dashboard-header-logo"
          />
          <div className="recon-type-dropdown">
            <button
              className="dropdown-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
              data-testid="recon-type-dropdown"
            >
              <h1 className="dashboard-title">{reconType}</h1>
              <ChevronDown size={24} className={showDropdown ? 'rotated' : ''} />
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                {reconTypes.map((type) => (
                  <div
                    key={type}
                    className={`dropdown-item ${reconType === type ? 'active' : ''}`}
                    onClick={() => {
                      setReconType(type);
                      setShowDropdown(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* KPI Groups Container - Side by Side */}
      <div className="kpi-groups-row" data-testid="kpi-groups-row">
        {/* Left Group - Key Performance Indicators */}
        <div className="kpi-group-container" data-testid="kpi-group-1">
          <h3 className="kpi-group-title">Key Performance Indicators</h3>
          <div className="metrics-grid kpi-grid-compact" data-testid="kpi-cards">
            <div className="metric-card kpi-card-compact">
              <div className="metric-header">
                <Package className="metric-icon info" size={20} />
                <span className="metric-trend positive">
                  <TrendingUp size={14} /> +15.3%
                </span>
              </div>
              <h3 className="metric-title">Total Orders Processed</h3>
              <p className="metric-value">12,456</p>
              <p className="metric-subtitle">This month</p>
            </div>

            <div className="metric-card kpi-card-compact">
              <div className="metric-header">
                <DollarSign className="metric-icon success" size={20} />
                <span className="metric-trend positive">
                  <TrendingUp size={14} /> +12.8%
                </span>
              </div>
              <h3 className="metric-title">Total Sales Amount</h3>
              <p className="metric-value">₹856.5 Cr</p>
              <p className="metric-subtitle">Last 30 days</p>
            </div>

            <div className="metric-card kpi-card-compact">
              <div className="metric-header">
                <CheckCircle className="metric-icon success" size={20} />
                <span className="metric-trend positive">
                  <TrendingUp size={14} /> +8.5%
                </span>
              </div>
              <h3 className="metric-title">Total Settled Amount</h3>
              <p className="metric-value">₹724.2 Cr</p>
              <p className="metric-subtitle">84.6% of sales</p>
            </div>

            <div className="metric-card kpi-card-compact">
              <div className="metric-header">
                <AlertTriangle className="metric-icon warning" size={20} />
                <span className="metric-trend neutral">+2.1%</span>
              </div>
              <h3 className="metric-title">Total Pending Amount</h3>
              <p className="metric-value">₹132.3 Cr</p>
              <p className="metric-subtitle">Requires attention</p>
            </div>
          </div>
        </div>

        {/* Right Group - Operational Metrics */}
        <div className="kpi-group-container" data-testid="kpi-group-2">
          <h3 className="kpi-group-title">Operational Metrics</h3>
          <div className="metrics-grid operational-grid-compact">
            <div className="metric-card operational-card-compact">
              <h3 className="metric-title">COD Pending Deposit</h3>
              <p className="metric-value operational-value">₹45.8 Cr</p>
              <span className="status-badge pending">235 orders</span>
            </div>

            <div className="metric-card operational-card-compact">
              <h3 className="metric-title">Razorpay Settlement Pending</h3>
              <p className="metric-value operational-value">₹68.5 Cr</p>
              <span className="status-badge queued">T+2 settlement</span>
            </div>

            <div className="metric-card operational-card-compact">
              <h3 className="metric-title">Returns Value</h3>
              <p className="metric-value operational-value">₹18.0 Cr</p>
              <span className="status-badge matched">2.1% of sales</span>
            </div>

            <div className="metric-card operational-card-compact">
              <h3 className="metric-title">Reconciliation Accuracy</h3>
              <p className="metric-value operational-value">97.8%</p>
              <span className="status-badge matched">+0.5% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - First Row */}
      <div className="charts-row two-column">
        {/* Order Reconciliation Coverage */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Order Reconciliation Coverage</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderReconciliationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="period" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  label={{ value: 'No of Parties', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <Tooltip />
                <Bar dataKey="orders" fill="#66B3FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-label">Time Period</p>
        </div>

        {/* Settlement Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Settlement Trend</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={settlementTrendData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66B3FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#66B3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  label={{ value: 'No of Recons', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#66B3FF" 
                  strokeWidth={2} 
                  dot={{ fill: '#66B3FF', r: 4 }}
                  fill="url(#colorAmount)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-label">Weeks</p>
        </div>
      </div>

      {/* Charts Section - Second Row */}
      <div className="charts-row two-column">
        {/* Payment Mode Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Payment Mode Distribution</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentModeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="mode" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="razorpay" stackId="a" fill="#3b82f6" name="Razorpay" />
                <Bar dataKey="cod" stackId="a" fill="#10b981" name="COD" />
                <Bar dataKey="giftCard" stackId="a" fill="#f59e0b" name="Gift Card" />
                <Bar dataKey="directBank" stackId="a" fill="#8b5cf6" name="Direct Bank" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Source Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Source Distribution</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ value }) => value}
                  labelLine={true}
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Exception Analytics Panel */}
      <div className="exception-analytics-panel" data-testid="exception-analytics">
        <div className="panel-header">
          <h3 className="panel-title">Exception Analytics</h3>
          <span className="exception-count">231 Total Exceptions</span>
        </div>
        <div className="exception-grid">
          {exceptionData.map((exception, index) => (
            <div key={index} className={`exception-card severity-${exception.severity}`}>
              <div className="exception-header">
                <span className={`severity-badge ${exception.severity}`}>
                  {exception.severity.toUpperCase()}
                </span>
                <span className="exception-count-badge">{exception.count}</span>
              </div>
              <h4 className="exception-type">{exception.type}</h4>
              <div className="exception-progress">
                <div className="exception-progress-bar" style={{ width: `${(exception.count / 150) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
