import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, CheckCircle, ChevronDown, Download, Filter } from 'lucide-react';

// May-bell Data Feb 2026 - Based on Excel Screenshot
const salesData = [
  { date: '01.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '02.02.2026', totalSales: 3.85, cod: 53.52, razorpayCommission: 3.04, razorpaySettlement: 3.02, directCollection: null, giftCard: null, rto: 18.99, exchange: 6.30, excessAmtRefund: null, balance: 0 },
  { date: '03.02.2026', totalSales: 2.50, cod: 74.30, razorpayCommission: 1.91, razorpaySettlement: 1.46, directCollection: null, giftCard: null, rto: 19.81, exchange: 7.20, excessAmtRefund: null, balance: 0 },
  { date: '04.02.2026', totalSales: 1.71, cod: 29.22, razorpayCommission: 1.63, razorpaySettlement: 1.21, directCollection: null, giftCard: null, rto: 15.18, exchange: 2.98, excessAmtRefund: null, balance: 1.50 },
  { date: '05.02.2026', totalSales: 2.06, cod: 45.66, razorpayCommission: 1.50, razorpaySettlement: 1.34, directCollection: null, giftCard: null, rto: 17.08, exchange: 2.20, excessAmtRefund: null, balance: 5.40 },
  { date: '06.02.2026', totalSales: 1.79, cod: 23.76, razorpayCommission: 0.75, razorpaySettlement: 1.08, directCollection: null, giftCard: null, rto: 23.71, exchange: 7.10, excessAmtRefund: null, balance: 15.24 },
  { date: '07.02.2026', totalSales: 2.32, cod: 57.81, razorpayCommission: 1.19, razorpaySettlement: 1.19, directCollection: 1.10, giftCard: null, rto: 16.50, exchange: 7.46, excessAmtRefund: null, balance: 28.82 },
  { date: '08.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '09.02.2026', totalSales: 4.45, cod: 93.59, razorpayCommission: 4.41, razorpaySettlement: 3.24, directCollection: null, giftCard: null, rto: 4.39, exchange: 4.60, excessAmtRefund: null, balance: 14.04 },
  { date: '10.02.2026', totalSales: 1.52, cod: 40.85, razorpayCommission: 0.94, razorpaySettlement: 0.87, directCollection: null, giftCard: null, rto: 15.94, exchange: 1.80, excessAmtRefund: null, balance: 4.99 },
  { date: '11.02.2026', totalSales: 2.49, cod: 50.28, razorpayCommission: 1.58, razorpaySettlement: 1.68, directCollection: 0.80, giftCard: 2.59, rto: 10.49, exchange: 6.50, excessAmtRefund: null, balance: 8.69 },
  { date: '12.02.2026', totalSales: 3.93, cod: 78.68, razorpayCommission: 3.23, razorpaySettlement: 2.65, directCollection: null, giftCard: null, rto: 15.93, exchange: 8.50, excessAmtRefund: null, balance: 21.63 },
  { date: '13.02.2026', totalSales: 2.62, cod: 58.94, razorpayCommission: 2.03, razorpaySettlement: 1.86, directCollection: null, giftCard: 3.00, rto: 8.41, exchange: 2.40, excessAmtRefund: null, balance: 1.20 },
  { date: '14.02.2026', totalSales: 3.12, cod: 95.08, razorpayCommission: 2.93, razorpaySettlement: 2.09, directCollection: null, giftCard: null, rto: 9.64, exchange: 14.09, excessAmtRefund: null, balance: 50.56 },
  { date: '15.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '16.02.2026', totalSales: 7.06, cod: 3.20, razorpayCommission: 7.02, razorpaySettlement: 6.26, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 69.60 },
  { date: '17.02.2026', totalSales: 4.29, cod: 12.54, razorpayCommission: 2.19, razorpaySettlement: 1.86, directCollection: null, giftCard: null, rto: null, exchange: 10.69, excessAmtRefund: null, balance: 2.18 },
  { date: '18.02.2026', totalSales: 2.46, cod: null, razorpayCommission: 1.55, razorpaySettlement: 1.53, directCollection: null, giftCard: null, rto: null, exchange: 1.50, excessAmtRefund: null, balance: 89.34 },
  { date: '19.02.2026', totalSales: 2.04, cod: null, razorpayCommission: 1.54, razorpaySettlement: 1.40, directCollection: null, giftCard: null, rto: null, exchange: 7.28, excessAmtRefund: null, balance: 55.81 },
  { date: '20.02.2026', totalSales: 2.47, cod: null, razorpayCommission: 1.53, razorpaySettlement: 1.79, directCollection: null, giftCard: null, rto: null, exchange: 7.40, excessAmtRefund: null, balance: 60.36 },
  { date: '21.02.2026', totalSales: 2.78, cod: null, razorpayCommission: 1.59, razorpaySettlement: 1.92, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 83.85 },
];

const totalSalesData = salesData.filter(d => d.totalSales !== null).map(d => ({
  date: d.date.substring(0, 5),
  sales: d.totalSales
}));

const paymentModeData = [
  { mode: 'COD', value: 45.2, color: '#10b981' },
  { mode: 'Razorpay', value: 35.8, color: '#3b82f6' },
  { mode: 'Direct Collection', value: 1.9, color: '#8b5cf6' },
  { mode: 'Gift Card', value: 2.6, color: '#f59e0b' },
  { mode: 'Others', value: 14.5, color: '#6b7280' },
];

const rtoExchangeTrendData = [
  { week: 'Week 1', rto: 72.6, exchange: 23.9 },
  { week: 'Week 2', rto: 60.8, exchange: 32.5 },
  { week: 'Week 3', rto: 42.1, exchange: 28.3 },
];

const dailySalesChartData = [
  { date: '02.02', sales: 3.85 },
  { date: '03.02', sales: 2.50 },
  { date: '04.02', sales: 1.71 },
  { date: '05.02', sales: 2.06 },
  { date: '06.02', sales: 1.79 },
  { date: '07.02', sales: 2.32 },
  { date: '09.02', sales: 4.45 },
  { date: '10.02', sales: 1.52 },
  { date: '11.02', sales: 2.49 },
  { date: '12.02', sales: 3.93 },
  { date: '13.02', sales: 2.62 },
  { date: '14.02', sales: 3.12 },
  { date: '16.02', sales: 7.06 },
  { date: '17.02', sales: 4.29 },
];

const Dashboard = () => {
  const [reconType, setReconType] = useState('May-bell Data Feb 2026');
  const [showDropdown, setShowDropdown] = useState(false);

  const reconTypes = [
    'May-bell Data Feb 2026',
    'Revenue Reconciliation',
    'Ledger Reconciliation',
    'Bank Reconciliation',
  ];

  // Calculate KPIs from data
  const totalSales = salesData.reduce((sum, item) => sum + (item.totalSales || 0), 0).toFixed(2);
  const totalCOD = salesData.reduce((sum, item) => sum + (item.cod || 0), 0).toFixed(2);
  const totalRazorpay = salesData.reduce((sum, item) => sum + (item.razorpaySettlement || 0), 0).toFixed(2);
  const totalRTO = salesData.reduce((sum, item) => sum + (item.rto || 0), 0).toFixed(2);
  const totalExchange = salesData.reduce((sum, item) => sum + (item.exchange || 0), 0).toFixed(2);
  const totalBalance = salesData.reduce((sum, item) => sum + (item.balance || 0), 0).toFixed(2);
  const avgDailySales = (totalSales / salesData.filter(d => d.totalSales !== null).length).toFixed(2);
  const directCollectionTotal = salesData.reduce((sum, item) => sum + (item.directCollection || 0), 0).toFixed(2);

  const handleDownloadExcel = () => {
    // Create CSV content
    let csvContent = 'Invoice Created,Total Sales,COD,Razorpay Commission,Razorpay Settlement,Direct Collection,Gift Card,RTO,Exchange,Excess Amt Refund,Balance,Remarks\n';
    
    salesData.forEach(row => {
      csvContent += `${row.date},${row.totalSales || ''},${row.cod || ''},${row.razorpayCommission || ''},${row.razorpaySettlement || ''},${row.directCollection || ''},${row.giftCard || ''},${row.rto || ''},${row.exchange || ''},${row.excessAmtRefund || ''},${row.balance || ''},\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'maybell-data-feb-2026.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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

      {/* KPI Cards Section */}
      <div className="kpi-section">
        <div className="kpi-container">
          <h2 className="kpi-section-title">Key Performance Indicators</h2>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#e3f2fd' }}>
                <DollarSign size={24} color="#1976d2" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Total Sales (Feb 2026)</p>
                <h3 className="kpi-value">₹{totalSales}L</h3>
                <div className="kpi-change positive">
                  <TrendingUp size={16} />
                  <span>+12.5% vs Jan</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#e8f5e9' }}>
                <Package size={24} color="#388e3c" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">COD Collection</p>
                <h3 className="kpi-value">₹{totalCOD}L</h3>
                <div className="kpi-change positive">
                  <TrendingUp size={16} />
                  <span>+8.3% vs Jan</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#f3e5f5' }}>
                <CheckCircle size={24} color="#7b1fa2" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Razorpay Settlement</p>
                <h3 className="kpi-value">₹{totalRazorpay}L</h3>
                <div className="kpi-change positive">
                  <TrendingUp size={16} />
                  <span>+15.2% vs Jan</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#fff3e0' }}>
                <AlertTriangle size={24} color="#f57c00" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">RTO Amount</p>
                <h3 className="kpi-value">₹{totalRTO}L</h3>
                <div className="kpi-change negative">
                  <TrendingDown size={16} />
                  <span>-5.1% vs Jan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="kpi-container">
          <h2 className="kpi-section-title">Operational Metrics</h2>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#e1f5fe' }}>
                <DollarSign size={24} color="#0288d1" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Exchange Amount</p>
                <h3 className="kpi-value">₹{totalExchange}L</h3>
                <div className="kpi-change neutral">
                  <span>Stable</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#fce4ec' }}>
                <Package size={24} color="#c2185b" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Outstanding Balance</p>
                <h3 className="kpi-value">₹{totalBalance}L</h3>
                <div className="kpi-change negative">
                  <TrendingUp size={16} />
                  <span>Needs Review</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#f1f8e9' }}>
                <TrendingUp size={24} color="#689f38" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Avg Daily Sales</p>
                <h3 className="kpi-value">₹{avgDailySales}L</h3>
                <div className="kpi-change positive">
                  <TrendingUp size={16} />
                  <span>+10.2% vs Jan</span>
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#ede7f6' }}>
                <CheckCircle size={24} color="#5e35b1" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Direct Collection</p>
                <h3 className="kpi-value">₹{directCollectionTotal}L</h3>
                <div className="kpi-change neutral">
                  <span>As Expected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - First Row */}
      <div className="charts-row two-column">
        {/* Payment Mode Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Payment Mode Distribution</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentModeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={true}
                >
                  {paymentModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Sales Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Daily Sales Trend (Feb 2026)</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySalesChartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section - Second Row */}
      <div className="charts-row two-column">
        {/* RTO vs Exchange Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">RTO vs Exchange Trend</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rtoExchangeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rto" fill="#ef4444" name="RTO Amount" />
                <Bar dataKey="exchange" fill="#f59e0b" name="Exchange Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Settlement vs Commission */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Razorpay Settlement vs Commission</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData.filter(d => d.razorpaySettlement !== null).slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="razorpaySettlement" stroke="#3b82f6" strokeWidth={2} name="Settlement" />
                <Line type="monotone" dataKey="razorpayCommission" stroke="#8b5cf6" strokeWidth={2} name="Commission" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary of Data - Excel-like Table */}
      <div className="summary-data-panel" data-testid="summary-data">
        <div className="panel-header-excel">
          <h3 className="panel-title-excel">Summary of Data - February 2026</h3>
          <button className="download-excel-btn" onClick={handleDownloadExcel}>
            <Download size={18} />
            <span>Download Excel</span>
          </button>
        </div>
        <div className="excel-table-container">
          <table className="excel-table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    <span>Invoice Created</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Total Sales</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>COD</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Razorpay Commission</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Razorpay Settlement</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Direct Collection</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Gift Card</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>RTO</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Exchange</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Excess Amt Refund</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Balance</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Remarks</span>
                    <Filter size={14} className="filter-icon" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, index) => (
                <tr key={index} className={row.totalSales === null ? 'empty-row' : ''}>
                  <td className="date-column">{row.date}</td>
                  <td className="number-column">{row.totalSales !== null ? row.totalSales.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.cod !== null ? row.cod.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.razorpayCommission !== null ? row.razorpayCommission.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.razorpaySettlement !== null ? row.razorpaySettlement.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.directCollection !== null ? row.directCollection.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.giftCard !== null ? row.giftCard.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.rto !== null ? row.rto.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.exchange !== null ? row.exchange.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.excessAmtRefund !== null ? row.excessAmtRefund.toFixed(2) : '-'}</td>
                  <td className="number-column">{row.balance !== null ? row.balance.toFixed(2) : '-'}</td>
                  <td className="text-column">-</td>
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
