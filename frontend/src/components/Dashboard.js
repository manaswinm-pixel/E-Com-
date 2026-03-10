import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, CheckCircle, ChevronDown, Download, Filter } from 'lucide-react';

// Helper function to format numbers in Indian style with commas
const formatIndianNumber = (num) => {
  if (num === null || num === undefined || num === 0) return '-';
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// Exact data from Excel in RUPEES (not lakhs)
const salesData = [
  { date: '01.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '02.02.2026', totalSales: 336575.60, cod: 53529.10, razorpayCommission: 3344.75, razorpaySettlement: 3024.19, directCollection: null, giftCard: null, rto: 18996.50, exchange: 6594.00, excessAmtRefund: null, balance: 0.00 },
  { date: '03.02.2026', totalSales: 250645.90, cod: 74295.50, razorpayCommission: 1909.25, razorpaySettlement: 1682.75, directCollection: null, giftCard: null, rto: 19812.00, exchange: 7126.00, excessAmtRefund: null, balance: 0.00 },
  { date: '04.02.2026', totalSales: 171281.80, cod: 29218.00, razorpayCommission: 1633.50, razorpaySettlement: 1207.79, directCollection: null, giftCard: null, rto: 15184.00, exchange: 2977.00, excessAmtRefund: null, balance: 1408.00 },
  { date: '05.02.2026', totalSales: 206385.20, cod: 45662.00, razorpayCommission: 1501.50, razorpaySettlement: 1356.20, directCollection: null, giftCard: null, rto: 17084.00, exchange: 2196.00, excessAmtRefund: null, balance: 9951.00 },
  { date: '06.02.2026', totalSales: 179363.60, cod: 23756.00, razorpayCommission: 754.50, razorpaySettlement: 1074.20, directCollection: null, giftCard: null, rto: 23711.80, exchange: 7088.00, excessAmtRefund: null, balance: 15237.00 },
  { date: '07.02.2026', totalSales: 232152.40, cod: 57809.60, razorpayCommission: 1195.50, razorpaySettlement: 1474.70, directCollection: 980.00, giftCard: null, rto: 16501.80, exchange: 7457.00, excessAmtRefund: null, balance: 28351.60 },
  { date: '08.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '09.02.2026', totalSales: 445388.70, cod: 93559.60, razorpayCommission: 4409.25, razorpaySettlement: 3243.35, directCollection: null, giftCard: null, rto: 4394.00, exchange: 4598.00, excessAmtRefund: null, balance: 10404.00 },
  { date: '10.02.2026', totalSales: 151241.80, cod: 40854.99, razorpayCommission: 935.07, razorpaySettlement: 873.06, directCollection: null, giftCard: null, rto: 15939.00, exchange: 1795.00, excessAmtRefund: null, balance: 4994.10 },
  { date: '11.02.2026', totalSales: 249254.60, cod: 50282.00, razorpayCommission: 1591.10, razorpaySettlement: 1683.40, directCollection: 800.00, giftCard: 2588.00, rto: 10493.00, exchange: 6485.00, excessAmtRefund: null, balance: 8686.90 },
  { date: '12.02.2026', totalSales: 393021.70, cod: 78683.40, razorpayCommission: 3235.75, razorpaySettlement: 2654.90, directCollection: null, giftCard: null, rto: 15931.80, exchange: 8502.00, excessAmtRefund: null, balance: 21626.10 },
  { date: '13.02.2026', totalSales: 262450.00, cod: 58943.40, razorpayCommission: 2028.75, razorpaySettlement: 1855.70, directCollection: null, giftCard: 3999.00, rto: 8407.00, exchange: 2398.00, excessAmtRefund: null, balance: 1148.00 },
  { date: '14.02.2026', totalSales: 312185.70, cod: 95078.00, razorpayCommission: 2835.75, razorpaySettlement: 2497.50, directCollection: null, giftCard: null, rto: 9642.00, exchange: 14094.00, excessAmtRefund: null, balance: 50564.10 },
  { date: '15.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '16.02.2026', totalSales: 706162.00, cod: 3187.00, razorpayCommission: 7016.50, razorpaySettlement: 6285.30, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 69598.00 },
  { date: '17.02.2026', totalSales: 428785.00, cod: 12535.00, razorpayCommission: 2187.50, razorpaySettlement: 1864.10, directCollection: null, giftCard: null, rto: null, exchange: 10692.00, excessAmtRefund: null, balance: 11774.60 },
  { date: '18.02.2026', totalSales: 245190.00, cod: null, razorpayCommission: 1547.50, razorpaySettlement: 1533.30, directCollection: null, giftCard: null, rto: null, exchange: 1495.00, excessAmtRefund: null, balance: 89337.30 },
  { date: '19.02.2026', totalSales: 204810.00, cod: null, razorpayCommission: 1543.50, razorpaySettlement: 1397.80, directCollection: null, giftCard: null, rto: null, exchange: 7275.00, excessAmtRefund: null, balance: 55812.00 },
  { date: '20.02.2026', totalSales: 247498.00, cod: null, razorpayCommission: 1526.00, razorpaySettlement: 1790.40, directCollection: null, giftCard: null, rto: null, exchange: 7395.00, excessAmtRefund: null, balance: 60328.00 },
  { date: '21.02.2026', totalSales: 277704.70, cod: null, razorpayCommission: 1597.40, razorpaySettlement: 1910.60, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 83846.40 },
  { date: '22.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '23.02.2026', totalSales: 528383.50, cod: null, razorpayCommission: 2878.50, razorpaySettlement: 2353.60, directCollection: null, giftCard: null, rto: null, exchange: 2598.00, excessAmtRefund: null, balance: 199519.00 },
  { date: '24.02.2026', totalSales: 268605.00, cod: null, razorpayCommission: 613.00, razorpaySettlement: 613.10, directCollection: null, giftCard: null, rto: null, exchange: 2744.00, excessAmtRefund: null, balance: 198642.50 },
  { date: '25.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '26.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '27.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '28.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
];

const dailySalesChartData = [
  { date: '02.02', sales: 3.36576 },
  { date: '03.02', sales: 2.50646 },
  { date: '04.02', sales: 1.71282 },
  { date: '05.02', sales: 2.06385 },
  { date: '06.02', sales: 1.79364 },
  { date: '07.02', sales: 2.32152 },
  { date: '09.02', sales: 4.45389 },
  { date: '10.02', sales: 1.51242 },
  { date: '11.02', sales: 2.49255 },
  { date: '12.02', sales: 3.93022 },
  { date: '13.02', sales: 2.62450 },
  { date: '14.02', sales: 3.12186 },
  { date: '16.02', sales: 7.06162 },
  { date: '17.02', sales: 4.28785 },
  { date: '18.02', sales: 2.45190 },
  { date: '19.02', sales: 2.04810 },
  { date: '20.02', sales: 2.47498 },
  { date: '21.02', sales: 2.77705 },
  { date: '23.02', sales: 5.28384 },
  { date: '24.02', sales: 2.68605 },
];

const paymentModeData = [
  { mode: 'Week 1', cod: 283.27, razorpay: 12.17 },
  { mode: 'Week 2', cod: 332.63, razorpay: 13.79 },
  { mode: 'Week 3', cod: 68.22, razorpay: 12.81 },
];

const rtoExchangeTrendData = [
  { week: 'Week 1', rto: 72.56, exchange: 23.94 },
  { week: 'Week 2', rto: 60.83, exchange: 32.58 },
  { week: 'Week 3', rto: 42.03, exchange: 47.79 },
];

const revenueSourceData = [
  { name: 'COD', value: 6.84, color: '#10b981' },
  { name: 'Razorpay', value: 0.39, color: '#3b82f6' },
  { name: 'Direct Collection', value: 0.02, color: '#8b5cf6' },
  { name: 'Gift Card', value: 0.07, color: '#f59e0b' },
];

const Dashboard = () => {
  const [reconType, setReconType] = useState('E-Commerce Reconciliation');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dateFilter, setDateFilter] = useState('Last Month');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const reconTypes = [
    'E-Commerce Reconciliation',
    'Revenue Reconciliation',
    'Ledger Reconciliation',
    'Bank Reconciliation',
  ];

  const dateFilterOptions = [
    'Today',
    'Last Week',
    'Last Month',
    'Last Quarter',
    'Last Year',
    'Custom'
  ];

  // Filter data based on date selection
  const getFilteredData = () => {
    const today = new Date('2026-02-21');
    let filtered = [...salesData];

    switch(dateFilter) {
      case 'Today':
        filtered = salesData.filter(d => d.date === '21.02.2026');
        break;
      case 'Last Week':
        filtered = salesData.filter(d => {
          const date = d.date.split('.')[0];
          return parseInt(date) >= 15 && parseInt(date) <= 21;
        });
        break;
      case 'Last Month':
        filtered = salesData;
        break;
      case 'Last Quarter':
        filtered = salesData;
        break;
      case 'Last Year':
        filtered = salesData;
        break;
      case 'Custom':
        if (customStartDate && customEndDate) {
          filtered = salesData;
        }
        break;
      default:
        filtered = salesData;
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  // Calculate KPIs from filtered data (in lakhs for display)
  const totalSales = (filteredData.reduce((sum, item) => sum + (item.totalSales || 0), 0) / 100000).toFixed(2);
  const totalCOD = (filteredData.reduce((sum, item) => sum + (item.cod || 0), 0) / 100000).toFixed(2);
  const totalRazorpay = (filteredData.reduce((sum, item) => sum + (item.razorpaySettlement || 0), 0) / 100000).toFixed(2);
  const totalRTO = (filteredData.reduce((sum, item) => sum + (item.rto || 0), 0) / 100000).toFixed(2);
  const totalExchange = (filteredData.reduce((sum, item) => sum + (item.exchange || 0), 0) / 100000).toFixed(2);
  const totalBalance = (filteredData.reduce((sum, item) => sum + (item.balance || 0), 0) / 100000).toFixed(2);
  const avgDailySales = (parseFloat(totalSales) / filteredData.filter(d => d.totalSales !== null).length).toFixed(2);
  const directCollectionTotal = (filteredData.reduce((sum, item) => sum + (item.directCollection || 0), 0) / 100000).toFixed(2);

  // Update chart data based on filtered data
  const filteredDailySalesData = dailySalesChartData.filter(item => {
    if (dateFilter === 'Today') return item.date === '21.02';
    if (dateFilter === 'Last Week') {
      const day = parseInt(item.date.split('.')[0]);
      return day >= 15 && day <= 21;
    }
    return true;
  });

  const handleDownloadExcel = () => {
    let csvContent = 'Invoice Created,Total Sales,COD,Razorpay Commission,Razorpay Settlement,Direct Collection,Gift Card,RTO,Exchange,Excess Amt Refund,Balance,Remarks\\n';
    
    salesData.forEach(row => {
      csvContent += `${row.date},${formatIndianNumber(row.totalSales)},${formatIndianNumber(row.cod)},${formatIndianNumber(row.razorpayCommission)},${formatIndianNumber(row.razorpaySettlement)},${formatIndianNumber(row.directCollection)},${formatIndianNumber(row.giftCard)},${formatIndianNumber(row.rto)},${formatIndianNumber(row.exchange)},${formatIndianNumber(row.excessAmtRefund)},${formatIndianNumber(row.balance)},\\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ecommerce-reconciliation-feb-2026.csv';
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

        {/* Date Filter Dropdown */}
        <div className="date-filter-container">
          <button
            className="date-filter-btn"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
          >
            <span className="date-filter-icon">📅</span>
            <span>{dateFilter}</span>
            <ChevronDown size={18} className={showDateDropdown ? 'rotated' : ''} />
          </button>
          {showDateDropdown && (
            <div className="date-dropdown-menu">
              {dateFilterOptions.map((option) => (
                <div
                  key={option}
                  className={`date-dropdown-item ${dateFilter === option ? 'active' : ''}`}
                  onClick={() => {
                    setDateFilter(option);
                    if (option !== 'Custom') {
                      setShowDateDropdown(false);
                      setShowCustomCalendar(false);
                    } else {
                      setShowCustomCalendar(true);
                    }
                  }}
                >
                  {option}
                </div>
              ))}
              {showCustomCalendar && (
                <div className="custom-date-picker" onClick={(e) => e.stopPropagation()}>
                  <div className="date-input-group">
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <div className="date-input-group">
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <button
                    className="apply-custom-date-btn"
                    onClick={() => {
                      if (customStartDate && customEndDate) {
                        setShowDateDropdown(false);
                        setShowCustomCalendar(false);
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* KPI Cards Section - SIDE BY SIDE LAYOUT */}
      <div className="kpi-section-side-by-side">
        {/* Key Performance Indicators Container */}
        <div className="kpi-container-box">
          <h2 className="kpi-section-title">Key Performance Indicators</h2>
          <div className="kpi-grid-four">
            <div className="kpi-card">
              <div className="kpi-icon" style={{ backgroundColor: '#e3f2fd' }}>
                <DollarSign size={24} color="#1976d2" />
              </div>
              <div className="kpi-content">
                <p className="kpi-label">Total Sales</p>
                <h3 className="kpi-value">₹{totalSales}L</h3>
                <div className="kpi-change positive">
                  <TrendingUp size={16} />
                  <span>+12.5%</span>
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
                  <span>+8.3%</span>
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
                  <span>+15.2%</span>
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
                  <span>-5.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Metrics Container */}
        <div className="kpi-container-box">
          <h2 className="kpi-section-title">Operational Metrics</h2>
          <div className="kpi-grid-four">
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
                  <span>+10.2%</span>
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
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Source Distribution</h3>
          </div>
          <div className="chart-container" style={{ height: '320px', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}L`}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ 
              width: '45%', 
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {revenueSourceData.map((entry, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: entry.color,
                      borderRadius: '4px'
                    }} />
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {entry.name}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    ₹{entry.value}L
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Daily Sales Trend</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredDailySalesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66B3FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#66B3FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#66B3FF" 
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
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">RTO vs Exchange Coverage</h3>
          </div>
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rtoExchangeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rto" fill="#7cb5ec" name="RTO Amount" barSize={20} radius={[4, 4, 0, 0]} />
                <Bar dataKey="exchange" fill="#434348" name="Exchange Amount" barSize={20} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
                <Bar dataKey="cod" stackId="a" fill="#7cb5ec" name="COD" barSize={30} />
                <Bar dataKey="razorpay" stackId="a" fill="#434348" name="Razorpay" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary of Data - Excel Table */}
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
              {filteredData.map((row, index) => (
                <tr key={index} className={row.totalSales === null ? 'empty-row' : ''}>
                  <td className="date-column">{row.date}</td>
                  <td className="number-column">{formatIndianNumber(row.totalSales)}</td>
                  <td className="number-column">{formatIndianNumber(row.cod)}</td>
                  <td className="number-column">{formatIndianNumber(row.razorpayCommission)}</td>
                  <td className="number-column">{formatIndianNumber(row.razorpaySettlement)}</td>
                  <td className="number-column">{formatIndianNumber(row.directCollection)}</td>
                  <td className="number-column">{formatIndianNumber(row.giftCard)}</td>
                  <td className="number-column">{formatIndianNumber(row.rto)}</td>
                  <td className="number-column">{formatIndianNumber(row.exchange)}</td>
                  <td className="number-column">{formatIndianNumber(row.excessAmtRefund)}</td>
                  <td className="number-column">{formatIndianNumber(row.balance)}</td>
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
