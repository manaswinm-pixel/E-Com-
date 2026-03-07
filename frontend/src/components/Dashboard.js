import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

// Sample data for quick commerce recon metrics
const quickCommerceData = [
  { name: 'Matched', value: 4850, color: '#10b981' },
  { name: 'Unmatched', value: 432, color: '#ef4444' },
  { name: 'Pending', value: 718, color: '#f59e0b' },
];

const reconciliationCoverageData = [
  { period: 'FY 23-24', value: 45 },
  { period: 'Q3 23-24', value: 50 },
  { period: 'Q4 23-24', value: 55 },
  { period: 'Q1 24-25', value: 60 },
  { period: 'Q2 24-25', value: 68 },
  { period: 'Q3 24-25', value: 72 },
  { period: 'Q4 24-25', value: 80 },
  { period: 'Q1 25-26', value: 92 },
  { period: 'Q2 25-26', value: 95 },
  { period: 'Q3 25-26', value: 88 },
];

const weeklyUsageData = [
  { week: 'Aug 10', recons: 2 },
  { week: 'Aug 16', recons: 2 },
  { week: 'Sept 09', recons: 2 },
  { week: 'Oct 10', recons: 15 },
  { week: 'Nov 17', recons: 10 },
  { week: 'Nov 24', recons: 8 },
  { week: 'Dec 01', recons: 10 },
  { week: 'Dec 15', recons: 24 },
  { week: 'Jan 05', recons: 30 },
  { week: 'Jan 12', recons: 85 },
  { week: 'Jan 19', recons: 68 },
  { week: 'Feb 02', recons: 38 },
  { week: 'Feb 16', recons: 25 },
  { week: 'Mar 02', recons: 30 },
];

const vendorsData = [
  { vendor: 'Shopify', transactions: 2450, amount: '₹245.5 Cr', percentage: 35 },
  { vendor: 'Razorpay', transactions: 1890, amount: '₹189.2 Cr', percentage: 27 },
  { vendor: 'Bluedart', transactions: 1250, amount: '₹98.5 Cr', percentage: 18 },
  { vendor: 'Delhivery', transactions: 980, amount: '₹76.8 Cr', percentage: 14 },
  { vendor: 'Others', transactions: 430, amount: '₹47.0 Cr', percentage: 6 },
];

const reconReportData = [
  {
    date: '2026-03-07',
    orderId: 'ORD-2456',
    vendor: 'Shopify',
    amount: '₹12,450',
    paymentGateway: 'Razorpay',
    logisticsPartner: 'Bluedart',
    status: 'Matched',
    discrepancy: '₹0',
  },
  {
    date: '2026-03-07',
    orderId: 'ORD-2457',
    vendor: 'Shopify',
    amount: '₹8,900',
    paymentGateway: 'Razorpay',
    logisticsPartner: 'Delhivery',
    status: 'Matched',
    discrepancy: '₹0',
  },
  {
    date: '2026-03-06',
    orderId: 'ORD-2455',
    vendor: 'UNICOM',
    amount: '₹15,600',
    paymentGateway: 'Razorpay',
    logisticsPartner: 'Bluedart',
    status: 'Unmatched',
    discrepancy: '₹450',
  },
  {
    date: '2026-03-06',
    orderId: 'ORD-2454',
    vendor: 'Shopify',
    amount: '₹9,200',
    paymentGateway: 'Razorpay',
    logisticsPartner: 'Delhivery',
    status: 'Pending',
    discrepancy: '₹200',
  },
  {
    date: '2026-03-05',
    orderId: 'ORD-2453',
    vendor: 'UNICOM',
    amount: '₹22,100',
    paymentGateway: 'Razorpay',
    logisticsPartner: 'Bluedart',
    status: 'Matched',
    discrepancy: '₹0',
  },
];

const Dashboard = () => {
  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  return (
    <div className="dashboard-content" data-testid="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Quick Commerce Recon Dashboard</h1>
      </header>

      {/* Quick Commerce Metrics */}
      <div className="metrics-grid" data-testid="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <CheckCircle className="metric-icon success" size={24} />
            <span className="metric-trend positive">
              <TrendingUp size={16} /> +12.5%
            </span>
          </div>
          <h3 className="metric-title">Total Transactions</h3>
          <p className="metric-value">6,000</p>
          <p className="metric-subtitle">Last 30 days</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <DollarSign className="metric-icon info" size={24} />
            <span className="metric-trend positive">
              <TrendingUp size={16} /> +8.3%
            </span>
          </div>
          <h3 className="metric-title">Total Amount Reconciled</h3>
          <p className="metric-value">₹657.0 Cr</p>
          <p className="metric-subtitle">This month</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Package className="metric-icon warning" size={24} />
            <span className="metric-trend neutral">0%</span>
          </div>
          <h3 className="metric-title">Pending Reconciliation</h3>
          <p className="metric-value">718</p>
          <p className="metric-subtitle">Requires attention</p>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <AlertTriangle className="metric-icon error" size={24} />
            <span className="metric-trend negative">
              <TrendingDown size={16} /> -3.2%
            </span>
          </div>
          <h3 className="metric-title">Unmatched Transactions</h3>
          <p className="metric-value">432</p>
          <p className="metric-subtitle">Action required</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        {/* Pie Chart */}
        <div className="chart-card pie-chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Transaction Status Distribution</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={quickCommerceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {quickCommerceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Reconciliation Coverage</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reconciliationCoverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#4A90E2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Weekly Usage Trend</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="recons" stroke="#4A90E2" strokeWidth={2} dot={{ fill: '#4A90E2', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="table-card vendors-table" data-testid="vendors-table">
        <div className="table-header">
          <h3 className="table-title">Top Vendors Performance</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Transactions</th>
                <th>Total Amount</th>
                <th>Contribution %</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {vendorsData.map((vendor, index) => (
                <tr key={index}>
                  <td className="vendor-name">{vendor.vendor}</td>
                  <td>{vendor.transactions.toLocaleString()}</td>
                  <td className="amount">{vendor.amount}</td>
                  <td>{vendor.percentage}%</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${vendor.percentage}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Width Recon Report Table */}
      <div className="table-card recon-report-table" data-testid="recon-report-table">
        <div className="table-header">
          <h3 className="table-title">Recent Reconciliation Reports</h3>
        </div>
        <div className="table-wrapper excel-style">
          <table className="data-table excel-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Payment Gateway</th>
                <th>Logistics Partner</th>
                <th>Status</th>
                <th>Discrepancy</th>
              </tr>
            </thead>
            <tbody>
              {reconReportData.map((report, index) => (
                <tr key={index}>
                  <td>{report.date}</td>
                  <td className="order-id">{report.orderId}</td>
                  <td>{report.vendor}</td>
                  <td className="amount">{report.amount}</td>
                  <td>{report.paymentGateway}</td>
                  <td>{report.logisticsPartner}</td>
                  <td>
                    <span className={`status-badge ${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className={report.discrepancy !== '₹0' ? 'discrepancy-alert' : ''}>
                    {report.discrepancy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;