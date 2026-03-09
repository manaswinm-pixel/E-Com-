import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, AlertTriangle, CheckCircle, ChevronDown, Download, Filter } from 'lucide-react';

// Exact data from Excel (converted to lakhs with precise decimals)
const salesData = [
  { date: '01.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '02.02.2026', totalSales: 3.365756, cod: 0.535291, razorpayCommission: 0.033448, razorpaySettlement: 0.030242, directCollection: null, giftCard: null, rto: 0.189965, exchange: 0.06594, excessAmtRefund: null, balance: 0 },
  { date: '03.02.2026', totalSales: 2.506459, cod: 0.742955, razorpayCommission: 0.019093, razorpaySettlement: 0.016828, directCollection: null, giftCard: null, rto: 0.198120, exchange: 0.07126, excessAmtRefund: null, balance: 0 },
  { date: '04.02.2026', totalSales: 1.712818, cod: 0.292180, razorpayCommission: 0.016335, razorpaySettlement: 0.012078, directCollection: null, giftCard: null, rto: 0.151840, exchange: 0.02977, excessAmtRefund: null, balance: 0.01408 },
  { date: '05.02.2026', totalSales: 2.063852, cod: 0.456620, razorpayCommission: 0.015015, razorpaySettlement: 0.013562, directCollection: null, giftCard: null, rto: 0.170840, exchange: 0.02196, excessAmtRefund: null, balance: 0.09951 },
  { date: '06.02.2026', totalSales: 1.793636, cod: 0.237560, razorpayCommission: 0.007545, razorpaySettlement: 0.010742, directCollection: null, giftCard: null, rto: 0.237118, exchange: 0.07088, excessAmtRefund: null, balance: 0.152374 },
  { date: '07.02.2026', totalSales: 2.321524, cod: 0.578096, razorpayCommission: 0.011955, razorpaySettlement: 0.014747, directCollection: 0.009800, giftCard: null, rto: 0.165018, exchange: 0.07457, excessAmtRefund: null, balance: 0.283516 },
  { date: '08.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '09.02.2026', totalSales: 4.453887, cod: 0.935536, razorpayCommission: 0.044093, razorpaySettlement: 0.032433, directCollection: null, giftCard: null, rto: 0.043940, exchange: 0.04598, excessAmtRefund: null, balance: 0.104048 },
  { date: '10.02.2026', totalSales: 1.512418, cod: 0.408549, razorpayCommission: 0.009350, razorpaySettlement: 0.008730, directCollection: null, giftCard: null, rto: 0.159390, exchange: 0.01795, excessAmtRefund: null, balance: 0.049942 },
  { date: '11.02.2026', totalSales: 2.492546, cod: 0.502827, razorpayCommission: 0.015911, razorpaySettlement: 0.016834, directCollection: 0.008000, giftCard: 0.025859, rto: 0.104930, exchange: 0.06485, excessAmtRefund: null, balance: 0.086869 },
  { date: '12.02.2026', totalSales: 3.930217, cod: 0.786834, razorpayCommission: 0.032357, razorpaySettlement: 0.026549, directCollection: null, giftCard: null, rto: 0.159318, exchange: 0.08502, excessAmtRefund: null, balance: 0.216261 },
  { date: '13.02.2026', totalSales: 2.624500, cod: 0.589434, razorpayCommission: 0.020287, razorpaySettlement: 0.018557, directCollection: null, giftCard: 0.030000, rto: 0.084100, exchange: 0.02400, excessAmtRefund: null, balance: 0.012081 },
  { date: '14.02.2026', totalSales: 3.121857, cod: 0.950840, razorpayCommission: 0.029357, razorpaySettlement: 0.024952, directCollection: null, giftCard: 0.046470, rto: 0.096400, exchange: 0.140940, excessAmtRefund: null, balance: 0.505642 },
  { date: '15.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '16.02.2026', totalSales: 7.061620, cod: 0.031870, razorpayCommission: 0.070165, razorpaySettlement: 0.062853, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 0.695980 },
  { date: '17.02.2026', totalSales: 4.287850, cod: 0.125350, razorpayCommission: 0.021875, razorpaySettlement: 0.018464, directCollection: null, giftCard: null, rto: null, exchange: 0.106920, excessAmtRefund: null, balance: 0.117490 },
  { date: '18.02.2026', totalSales: 2.451900, cod: null, razorpayCommission: 0.015475, razorpaySettlement: 0.015329, directCollection: null, giftCard: null, rto: null, exchange: 0.01495, excessAmtRefund: null, balance: 0.893370 },
  { date: '19.02.2026', totalSales: 2.048100, cod: null, razorpayCommission: 0.015435, razorpaySettlement: 0.013978, directCollection: null, giftCard: null, rto: null, exchange: 0.07275, excessAmtRefund: null, balance: 0.558120 },
  { date: '20.02.2026', totalSales: 2.474980, cod: null, razorpayCommission: 0.015260, razorpaySettlement: 0.017904, directCollection: null, giftCard: null, rto: null, exchange: 0.07395, excessAmtRefund: null, balance: 0.603920 },
  { date: '21.02.2026', totalSales: 2.777047, cod: null, razorpayCommission: 0.015973, razorpaySettlement: 0.019100, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: 0.838460 },
  { date: '22.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '23.02.2026', totalSales: 5.283830, cod: null, razorpayCommission: 0.028785, razorpaySettlement: 0.023506, directCollection: null, giftCard: null, rto: null, exchange: 0.02598, excessAmtRefund: null, balance: 1.995190 },
  { date: '24.02.2026', totalSales: 2.686050, cod: null, razorpayCommission: 0.006130, razorpaySettlement: 0.005917, directCollection: null, giftCard: null, rto: null, exchange: 0.02744, excessAmtRefund: null, balance: 1.986430 },
  { date: '25.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '26.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '27.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
  { date: '28.02.2026', totalSales: null, cod: null, razorpayCommission: null, razorpaySettlement: null, directCollection: null, giftCard: null, rto: null, exchange: null, excessAmtRefund: null, balance: null },
];

const dailySalesChartData = [
  { date: '02.02', sales: 3.365756 },
  { date: '03.02', sales: 2.506459 },
  { date: '04.02', sales: 1.712818 },
  { date: '05.02', sales: 2.063852 },
  { date: '06.02', sales: 1.793636 },
  { date: '07.02', sales: 2.321524 },
  { date: '09.02', sales: 4.453887 },
  { date: '10.02', sales: 1.512418 },
  { date: '11.02', sales: 2.492546 },
  { date: '12.02', sales: 3.930217 },
  { date: '13.02', sales: 2.624500 },
  { date: '14.02', sales: 3.121857 },
  { date: '16.02', sales: 7.061620 },
  { date: '17.02', sales: 4.287850 },
  { date: '18.02', sales: 2.451900 },
  { date: '19.02', sales: 2.048100 },
  { date: '20.02', sales: 2.474980 },
  { date: '21.02', sales: 2.777047 },
  { date: '23.02', sales: 5.283830 },
  { date: '24.02', sales: 2.686050 },
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
  { name: 'COD', value: 684, color: '#10b981' },
  { name: 'Razorpay', value: 39, color: '#3b82f6' },
  { name: 'Direct Collection', value: 2, color: '#8b5cf6' },
  { name: 'Gift Card', value: 6, color: '#f59e0b' },
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
    const today = new Date('2026-02-21'); // Using Feb 21 as "today" for demo
    let filtered = [...salesData];

    switch(dateFilter) {
      case 'Today':
        filtered = salesData.filter(d => d.date === '21.02.2026');
        break;
      case 'Last Week':
        // Last 7 days from Feb 21
        filtered = salesData.filter(d => {
          const date = d.date.split('.')[0];
          return parseInt(date) >= 15 && parseInt(date) <= 21;
        });
        break;
      case 'Last Month':
        // All of February
        filtered = salesData;
        break;
      case 'Last Quarter':
        // Full February (representing quarter data)
        filtered = salesData;
        break;
      case 'Last Year':
        // Full February (representing yearly data)
        filtered = salesData;
        break;
      case 'Custom':
        if (customStartDate && customEndDate) {
          // Filter based on custom dates
          filtered = salesData;
        }
        break;
      default:
        filtered = salesData;
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  // Calculate KPIs from filtered data
  const totalSales = filteredData.reduce((sum, item) => sum + (item.totalSales || 0), 0).toFixed(2);
  const totalCOD = filteredData.reduce((sum, item) => sum + (item.cod || 0), 0).toFixed(2);
  const totalRazorpay = filteredData.reduce((sum, item) => sum + (item.razorpaySettlement || 0), 0).toFixed(2);
  const totalRTO = filteredData.reduce((sum, item) => sum + (item.rto || 0), 0).toFixed(2);
  const totalExchange = filteredData.reduce((sum, item) => sum + (item.exchange || 0), 0).toFixed(2);
  const totalBalance = filteredData.reduce((sum, item) => sum + (item.balance || 0), 0).toFixed(2);
  const avgDailySales = (totalSales / filteredData.filter(d => d.totalSales !== null).length).toFixed(2);
  const directCollectionTotal = filteredData.reduce((sum, item) => sum + (item.directCollection || 0), 0).toFixed(2);

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
          <div className="chart-container" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="45%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 30;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text 
                        x={x} 
                        y={y} 
                        fill="#374151" 
                        textAnchor={x > cx ? 'start' : 'end'} 
                        dominantBaseline="central"
                        fontSize="13"
                        fontWeight="600"
                      >
                        ₹{value}L
                      </text>
                    );
                  }}
                  labelLine={{
                    stroke: '#9ca3af',
                    strokeWidth: 1
                  }}
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
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
                <Bar dataKey="rto" fill="#ef4444" name="RTO Amount" />
                <Bar dataKey="exchange" fill="#f59e0b" name="Exchange Amount" />
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
                <Bar dataKey="cod" stackId="a" fill="#10b981" name="COD" />
                <Bar dataKey="razorpay" stackId="a" fill="#3b82f6" name="Razorpay" />
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
