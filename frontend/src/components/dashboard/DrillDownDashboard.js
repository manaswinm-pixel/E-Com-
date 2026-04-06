import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Download, Filter } from 'lucide-react';
import { salesData, dailySalesChartData, paymentModeData, rtoExchangeTrendData, revenueSourceData, formatIndianNumber } from '../../data/mockData';

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent, fill } = payload[0];
    return (
      <div className="custom-pie-tooltip" style={{
        backgroundColor: '#fff',
        padding: '12px 16px',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: fill, marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>
          {name}: ₹{value}L ({(percent * 100).toFixed(0)}%)
        </div>
      </div>
    );
  }
  return null;
};

export const DrillDownDashboard = ({ moduleId, moduleTitle, onBack }) => {
  const [filterStr, setFilterStr] = useState('');

  // Depending on the module, we can show specific charts from the old dashboard
  const renderModuleSpecificCharts = () => {
    switch (moduleId) {
      case 'settlement_engine':
        return (
          <div className="charts-row two-column">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Payment Mode Distribution (Old Component)</h3>
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
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Revenue Source</h3>
              </div>
              <div className="chart-container" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueSourceData} cx="50%" cy="50%" innerRadius={75} outerRadius={115} paddingAngle={2} dataKey="value" stroke="none">
                      {revenueSourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'returns_rto':
        return (
          <div className="charts-row one-column">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">RTO vs Exchange Coverage (Old Component)</h3>
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
          </div>
        );
      case 'order_recon':
      case 'recon_health':
      default:
        return (
          <div className="charts-row two-column">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Daily Sales Trend (Old Component)</h3>
              </div>
              <div className="chart-container" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailySalesChartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#66B3FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#66B3FF" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#66B3FF" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} onClick={() => setFilterStr('filtered')} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleDownloadExcel = () => {
    // Basic CSV mock download
    const csvContent = 'data:text/csv;charset=utf-8,Demo CSV\\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${moduleId}_data.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="drilldown-container" className="fade-in-up">
      <div className="drilldown-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Overview</span>
        </button>
        <h2 className="drilldown-title">{moduleTitle} Detailed View</h2>
      </div>

      {renderModuleSpecificCharts()}

      {/* Reused Table Data */}
      <div className="summary-data-panel">
        <div className="panel-header-excel">
          <h3 className="panel-title-excel">{moduleTitle} Records - February 2026</h3>
          <button className="download-excel-btn" onClick={handleDownloadExcel}>
            <Download size={18} />
            <span>Download Data</span>
          </button>
        </div>
        <div className="excel-table-container">
          <table className="excel-table">
            <thead>
              <tr>
                <th>Invoice Created</th>
                <th>Total Sales</th>
                <th>COD</th>
                <th>Razorpay Settlement</th>
                <th>RTO</th>
                <th>Exchange</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, index) => (
                <tr key={index} className={row.totalSales === null ? 'empty-row' : ''}>
                  <td>{row.date}</td>
                  <td className="number-column">{formatIndianNumber(row.totalSales)}</td>
                  <td className="number-column">{formatIndianNumber(row.cod)}</td>
                  <td className="number-column">{formatIndianNumber(row.razorpaySettlement)}</td>
                  <td className="number-column">{formatIndianNumber(row.rto)}</td>
                  <td className="number-column">{formatIndianNumber(row.exchange)}</td>
                  <td className="number-column">{formatIndianNumber(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
