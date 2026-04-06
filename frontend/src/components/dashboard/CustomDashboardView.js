import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { salesData, dailySalesChartData, paymentModeData, rtoExchangeTrendData, revenueSourceData, formatIndianNumber } from '../../data/mockData';

export const CustomDashboardView = ({ config, onBack }) => {
  const { name, description, metrics, components, layout } = config;

  const renderKpiCards = () => {
    if (!components.includes('kpi_cards') || !metrics.length) return null;
    return (
      <div className={`kpi-grid-${layout === '3-column' ? 'six' : 'four'} custom-kpis`}>
        {metrics.map(metricId => (
          <div key={metricId} className="kpi-card custom-metric">
             <div className="kpi-content">
               <p className="kpi-label">{metricId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
               <h3 className="kpi-value">Auto-Calc</h3>
             </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCharts = () => {
    return (
      <div className={`charts-row ${layout}`}>
        {components.includes('charts_bar') && (
           <div className="chart-card">
             <div className="chart-header">
               <h3 className="chart-title">Payment/Exchange Trends</h3>
             </div>
             <div className="chart-container" style={{ height: '320px' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={rtoExchangeTrendData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                   <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                   <YAxis tick={{ fontSize: 12 }} />
                   <Tooltip />
                   <Legend />
                   <Bar dataKey="rto" fill="#7cb5ec" name="RTO" barSize={20} />
                   <Bar dataKey="exchange" fill="#434348" name="Exchange" barSize={20} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>
        )}
        {components.includes('charts_pie') && (
           <div className="chart-card">
             <div className="chart-header">
               <h3 className="chart-title">Revenue Distribution</h3>
             </div>
             <div className="chart-container" style={{ height: '320px' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={revenueSourceData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" stroke="none">
                     {revenueSourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>
        )}
      </div>
    );
  };

  const renderTable = () => {
    if (!components.includes('tables')) return null;
    return (
       <div className="summary-data-panel">
         <div className="panel-header-excel">
           <h3 className="panel-title-excel">Custom Dashboard Data Table</h3>
         </div>
         <div className="excel-table-container">
           <table className="excel-table">
             <thead>
               <tr>
                 <th>Invoice Created</th>
                 <th>Total Sales</th>
                 <th>COD</th>
                 <th>Razorpay Settlement</th>
               </tr>
             </thead>
             <tbody>
               {salesData.slice(0, 5).map((row, index) => (
                 <tr key={index}>
                   <td>{row.date}</td>
                   <td className="number-column">{formatIndianNumber(row.totalSales)}</td>
                   <td className="number-column">{formatIndianNumber(row.cod)}</td>
                   <td className="number-column">{formatIndianNumber(row.razorpaySettlement)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
    );
  };

  return (
    <div className="drilldown-container fade-in-up">
      <div className="drilldown-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Overviews</span>
        </button>
        <div>
           <h2 className="drilldown-title">{name}</h2>
           <p className="drilldown-desc">{description}</p>
        </div>
      </div>
      
      {renderKpiCards()}
      {renderCharts()}
      {renderTable()}
    </div>
  );
};
