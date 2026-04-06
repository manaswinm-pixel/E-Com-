import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Settings, X, Plus, ChevronDown, Download, AlertCircle, Info, Filter, Maximize, Minimize } from 'lucide-react';
import { 
  salesData, dailySalesChartData, paymentModeData, 
  rtoExchangeTrendData, revenueSourceData, formatIndianNumber 
} from '../data/mockData';
import './EcommerceDashboard.css';

// --- MOCK INITIAL METRICS ---
const initialMetrics = [
  // --- KPIs ---
  { id: 'kpi_1', category: 'kpi', label: 'Total Sales', value: '₹60.97L', change: '+12.5%', isPrimary: true, type: 'positive' },
  { id: 'kpi_2', category: 'kpi', label: 'COD Collection', value: '₹7.17L', change: '+8.3%', isPrimary: true, type: 'positive' },
  { id: 'kpi_3', category: 'kpi', label: 'Razorpay Settlement', value: '₹0.40L', change: '+15.2%', isPrimary: true, type: 'positive' },
  { id: 'kpi_4', category: 'kpi', label: 'RTO Amount', value: '₹5.76L', change: '-5.1%', isPrimary: true, type: 'negative' },
  { id: 'kpi_5', category: 'kpi', label: 'Refund Amount', value: '₹1.20L', change: '+2.0%', isPrimary: false, type: 'neutral' },
  { id: 'kpi_6', category: 'kpi', label: 'Gross Margin', value: '42.5%', change: '+1.5%', isPrimary: false, type: 'positive' },
  { id: 'kpi_7', category: 'kpi', label: 'Dispute Amount', value: '₹0.50L', change: '-10%', isPrimary: false, type: 'positive' },
  { id: 'kpi_8', category: 'kpi', label: 'Monthly Target %', value: '88%', change: '+5%', isPrimary: false, type: 'neutral' },
  { id: 'kpi_9', category: 'kpi', label: 'Shipping Cost', value: '₹4.10L', change: '+1%', isPrimary: false, type: 'negative' },
  { id: 'kpi_10', category: 'kpi', label: 'Net Realization', value: '92%', change: '0%', isPrimary: false, type: 'neutral' },
  { id: 'kpi_11', category: 'kpi', label: 'Gift Card Revenue', value: '₹0.07L', change: '+12%', isPrimary: false, type: 'positive' },
  { id: 'kpi_12', category: 'kpi', label: 'Wallet Payments', value: '₹2.10L', change: '+4%', isPrimary: false, type: 'neutral' },
  { id: 'kpi_13', category: 'kpi', label: 'Cancelled Orders', value: '310', change: '-2%', isPrimary: false, type: 'positive' },

  // --- Operational Metrics ---
  { id: 'ops_1', category: 'ops', label: 'Exchange Amount', value: '₹1.04L', change: 'Stable', isPrimary: true, type: 'neutral' },
  { id: 'ops_2', category: 'ops', label: 'Outstanding Balance', value: '₹9.21L', change: 'Needs Review', isPrimary: true, type: 'negative' },
  { id: 'ops_3', category: 'ops', label: 'Avg Daily Sales', value: '₹1.05L', change: '+100%', isPrimary: true, type: 'positive' },
  { id: 'ops_4', category: 'ops', label: 'Direct Collection', value: '₹0.02L', change: 'At Expected', isPrimary: true, type: 'positive' },
  { id: 'ops_5', category: 'ops', label: 'Processing Cost', value: '₹0.80L', change: 'Stable', isPrimary: false, type: 'neutral' },
  { id: 'ops_6', category: 'ops', label: 'Overcharged Fees', value: '₹0.15L', change: '-5%', isPrimary: false, type: 'positive' },
  { id: 'ops_7', category: 'ops', label: 'Lead Time', value: '2.4 days', change: '-0.2 days', isPrimary: false, type: 'positive' },
  { id: 'ops_8', category: 'ops', label: 'Inventory Cost', value: '₹12.5L', change: '+2%', isPrimary: false, type: 'neutral' },
  { id: 'ops_9', category: 'ops', label: 'Packaging Cost', value: '₹1.10L', change: '+5%', isPrimary: false, type: 'negative' },
  { id: 'ops_10', category: 'ops', label: 'Courier Returns', value: '₹0.90L', change: '-1%', isPrimary: false, type: 'positive' },
  { id: 'ops_11', category: 'ops', label: 'Return Processing', value: '1.2 days', change: 'Stable', isPrimary: false, type: 'neutral' },
  { id: 'ops_12', category: 'ops', label: 'Support Tickets', value: '145', change: '-12', isPrimary: false, type: 'positive' },
  { id: 'ops_13', category: 'ops', label: 'SLA Breaches', value: '5', change: '+2', isPrimary: false, type: 'negative' },
];

const generateMockExcelData = () => {
  const data = [];
  const baseDates = ['01-04-2025', '03-04-2025', '08-04-2025', '12-04-2025', '28-04-2025', '29-04-2025', '06-05-2025', '10-06-2025', '24-07-2025', '15-08-2025'];
  const types = ['Sales Invoice', 'Purchase Invoice', 'Credit Note', 'Debit Note'];
  const actions = ['To Review', 'No Action', 'Escalate'];
  const statuses = ['Unmatched', 'Match', 'Partial'];
  
  for (let i = 1; i <= 35; i++) {
    const isSales = i % 2 !== 0;
    const amount = Math.floor(Math.random() * 50000) + 100;
    let cpAmount = 0;
    if (!isSales) cpAmount = amount + (Math.floor(Math.random() * 2000) - 1000);
    else if (i % 3 === 0) cpAmount = amount; // some exact matches
    
    data.push({
      id: i,
      date: baseDates[i % baseDates.length],
      type: types[i % types.length],
      ref: `CWN/000${100+i}/25-26`,
      amount: amount,
      cpAmount: cpAmount,
      diff: amount - cpAmount,
      cpRef: isSales ? '' : `ATPL/25/${100+i}`,
      cpType: isSales ? '' : 'Purchase Invoice',
      cpDate: isSales ? '' : baseDates[(i+1) % baseDates.length],
      category: '',
      action: actions[i % actions.length],
      status: statuses[i % statuses.length]
    });
  }
  return data;
};

const initialTableData = generateMockExcelData();

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0];
    return (
      <div className="custom-pie-tooltip" style={{
        backgroundColor: '#fff', padding: '12px 16px', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: fill, marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>
          ₹{value}L
        </div>
      </div>
    );
  }
  return null;
};

const EcommerceDashboard = () => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configCategory, setConfigCategory] = useState(null); // 'kpi' or 'ops'

  // Edit states for the modal
  const [editingMetrics, setEditingMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({ label: '', value: '', change: '', type: 'neutral' });
  const [showAddForm, setShowAddForm] = useState(false);

  const [tableRows, setTableRows] = useState(initialTableData);
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [isFullScreenTable, setIsFullScreenTable] = useState(false);
  const [editingCell, setEditingCell] = useState(null); // { id, field }
  
  // New States for dropdowns and filtering
  const [reconDropdownOpen, setReconDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('Today');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [newRow, setNewRow] = useState({ 
    date: '', type: '', ref: '', amount: '', cpAmount: '', diff: '', 
    cpRef: '', cpType: '', cpDate: '', category: '', action: 'To Review', status: 'Unmatched' 
  });

  const handleCellDoubleClick = (id, field) => {
    setEditingCell({ id, field });
  };

  const handleCellChange = (id, field, value) => {
    setTableRows(prev => prev.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        // Recalculate difference dynamically if amount or cpAmount is changed
        if (field === 'amount' || field === 'cpAmount') {
          updatedRow.diff = Number(updatedRow.amount || 0) - Number(updatedRow.cpAmount || 0);
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const renderCell = (row, field, className = "") => {
    const isEditing = editingCell?.id === row.id && editingCell?.field === field;
    
    if (isEditing) {
      return (
        <td className={className}>
          <input 
            autoFocus 
            type={['amount', 'cpAmount', 'diff'].includes(field) ? 'number' : 'text'}
            className="excel-cell-input" 
            value={row[field] !== null && row[field] !== undefined ? row[field] : ''} 
            onChange={(e) => handleCellChange(row.id, field, e.target.value)}
            onBlur={handleCellBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCellBlur();
            }}
          />
        </td>
      );
    }
    
    return (
      <td 
        className={className} 
        onDoubleClick={() => handleCellDoubleClick(row.id, field)}
        title="Double-click to edit"
      >
        {row[field] !== '' ? row[field] : '-'}
      </td>
    );
  };

  const openConfigModal = (category) => {
    setConfigCategory(category);
    setEditingMetrics(metrics.filter(m => m.category === category));
    setShowConfigModal(true);
    setShowAddForm(false);
  };

  const handleTogglePrimary = (id) => {
    setEditingMetrics(prev => {
      const currentPrimaries = prev.filter(m => m.isPrimary).length;
      return prev.map(m => {
        if (m.id === id) {
          // If turning on, ensure we don't exceed 4
          if (!m.isPrimary && currentPrimaries >= 4) {
            alert('You can only select a maximum of 4 primary metrics.');
            return m;
          }
          return { ...m, isPrimary: !m.isPrimary };
        }
        return m;
      });
    });
  };

  const handleAddMetric = () => {
    if (!newMetric.label || !newMetric.value) return;
    
    const newId = `${configCategory}_${Date.now()}`;
    const addedMetric = { 
      ...newMetric, 
      id: newId, 
      category: configCategory, 
      isPrimary: false 
    };
    
    setEditingMetrics([...editingMetrics, addedMetric]);
    setNewMetric({ label: '', value: '', change: '', type: 'neutral' });
    setShowAddForm(false);
  };

  const saveConfig = () => {
    // Merge edited metrics back into main metrics array
    setMetrics(prev => {
      const otherMetrics = prev.filter(m => m.category !== configCategory);
      return [...otherMetrics, ...editingMetrics];
    });
    setShowConfigModal(false);
  };

  const handleAddTableRow = () => {
    const nextId = tableRows.length > 0 ? Math.max(...tableRows.map(r => r.id)) + 1 : 1;
    setTableRows([...tableRows, { id: nextId, ...newRow }]);
    setShowAddRowModal(false);
    setNewRow({ 
      date: '', type: '', ref: '', amount: '', cpAmount: '', diff: '', 
      cpRef: '', cpType: '', cpDate: '', category: '', action: 'To Review', status: 'Unmatched' 
    });
  };

  const kpis = metrics.filter(m => m.category === 'kpi' && m.isPrimary);
  const ops = metrics.filter(m => m.category === 'ops' && m.isPrimary);

  // Dynamic filter application
  const getFilterMultiplier = (filter) => {
    switch(filter) {
      case 'Last week': return 3.4;
      case 'Last quarter': return 12.8;
      case 'Custom': return 5.2;
      case 'Today':
      default: return 1;
    }
  };
  
  const filterMultiplier = getFilterMultiplier(globalFilter);
  const applyMultiplierToString = (str, mul) => {
    if (!str) return str;
    return str.replace(/([0-9]*\.[0-9]+|[0-9]+)/, (match) => {
      const isWhole = !match.includes('.');
      return isWhole ? Math.round(parseFloat(match) * mul) : (parseFloat(match) * mul).toFixed(2);
    });
  };

  const scaledKpis = kpis.map(kpi => ({ ...kpi, value: applyMultiplierToString(kpi.value, filterMultiplier) }));
  const scaledOps = ops.map(op => ({ ...op, value: applyMultiplierToString(op.value, filterMultiplier) }));
  
  const scaledRevenueSource = revenueSourceData.map(d => ({ ...d, value: Math.round((d.value || 0) * filterMultiplier) }));
  const scaledDailySales = dailySalesChartData.map(d => ({ ...d, sales: Math.round((d.sales || 0) * filterMultiplier) }));
  const scaledRtoExchange = rtoExchangeTrendData.map(d => ({ ...d, rto: Math.round((d.rto || 0) * filterMultiplier), exchange: Math.round((d.exchange || 0) * filterMultiplier) }));
  const scaledPaymentMode = paymentModeData.map(d => ({ ...d, cod: Math.round((d.cod || 0) * filterMultiplier), razorpay: Math.round((d.razorpay || 0) * filterMultiplier) }));
  const scaledTableRows = tableRows.map(row => ({ 
    ...row, 
    amount: row.amount !== '' ? Math.round(row.amount * filterMultiplier) : '', 
    cpAmount: row.cpAmount !== '' ? Math.round(row.cpAmount * filterMultiplier) : '', 
    diff: row.diff !== '' ? Math.round(row.diff * filterMultiplier) : '' 
  }));

  const LOGO_URL = "https://customer-assets.emergentagent.com/job_data-convo-poc/artifacts/rmuu7ljf_OneCap%20logo%20Blue.svg";
  const reconTypes = ['Ledger Reconciliation', 'Bank Reconciliation', 'PG Reconciliation', 'Marketplace Reconciliation'];
  const filterOptions = ['Today', 'Last week', 'Last quarter', 'Custom'];

  return (
    <div className="ecom-dashboard-wrapper">
      {/* HEADER */}
      <header className="ecom-header">
        <div className="ecom-logo-title dropdown-container">
          <img src={LOGO_URL} alt="OneCap Logo" className="ecom-logo" />
          <h1 className="ecom-title" onClick={() => setReconDropdownOpen(!reconDropdownOpen)} style={{cursor: 'pointer'}}>
            E-Commerce Reconciliation <ChevronDown size={18} />
          </h1>
          {reconDropdownOpen && (
            <div className="ecom-dropdown-menu">
              {reconTypes.map(type => (
                 <div key={type} className="ecom-dropdown-item" onClick={() => setReconDropdownOpen(false)}>{type}</div>
              ))}
            </div>
          )}
        </div>
        <div className="ecom-header-actions dropdown-container">
          <button className="ecom-action-btn period-select" onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}>
            <Filter size={16} /> Filter: {globalFilter} <ChevronDown size={16} />
          </button>
          {filterDropdownOpen && (
            <div className="ecom-dropdown-menu align-right">
              {filterOptions.map(opt => (
                <div key={opt} className={`ecom-dropdown-item ${globalFilter === opt ? 'active' : ''}`} onClick={() => {
                  setGlobalFilter(opt);
                  if (opt !== 'Custom') {
                     setFilterDropdownOpen(false);
                     setShowDatePicker(false);
                  } else {
                     setShowDatePicker(true);
                  }
                }}>
                  {opt}
                </div>
              ))}
              {showDatePicker && (
                <div className="ecom-custom-date">
                   <label style={{fontSize: '12px', fontWeight: 'bold'}}>From:</label>
                   <input type="date" className="date-input" />
                   <label style={{fontSize: '12px', fontWeight: 'bold'}}>To:</label>
                   <input type="date" className="date-input" />
                   <button onClick={() => setFilterDropdownOpen(false)}>Apply Filter</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* METRICS GRIDS */}
      <div className="ecom-grid-row">
        {/* KPIs */}
        <div className="ecom-metrics-box card-hoverable">
          <div className="ecom-box-header">
            <h3 onClick={(e) => { if (e.detail >= 3) openConfigModal('kpi'); }} title="Triple click to configure" style={{cursor: 'pointer', userSelect: 'none'}}>Key Performance Indicators</h3>
          </div>
          <div className="ecom-metrics-grid">
            {scaledKpis.map(kpi => (
              <div key={kpi.id} className="ecom-metric-card card-hoverable">
                <div className="ecom-metric-title">{kpi.label}</div>
                <div className="ecom-metric-value">{kpi.value}</div>
                <div className={`ecom-metric-change ${kpi.type}`}>
                  {kpi.change}
                </div>
                <div className="ecom-metric-line kpi-line"></div>
              </div>
            ))}
          </div>
        </div>

        {/* OPS */}
        <div className="ecom-metrics-box card-hoverable">
          <div className="ecom-box-header">
            <h3 onClick={(e) => { if (e.detail >= 3) openConfigModal('ops'); }} title="Triple click to configure" style={{cursor: 'pointer', userSelect: 'none'}}>Operational Metrics</h3>
          </div>
          <div className="ecom-metrics-grid">
            {scaledOps.map(op => (
              <div key={op.id} className="ecom-metric-card card-hoverable">
                <div className="ecom-metric-title">{op.label}</div>
                <div className="ecom-metric-value">{op.value}</div>
                <div className={`ecom-metric-change ${op.type}`}>
                  {op.change}
                </div>
                <div className="ecom-metric-line ops-line"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="ecom-grid-row row-2-col">
        {/* Revenue Source */}
        <div className="ecom-chart-box card-hoverable">
          <h3>Revenue Source Distribution</h3>
          <div className="ecom-chart-container">
             <ResponsiveContainer width="100%" height={250}>
               <PieChart>
                 <Pie data={scaledRevenueSource} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                   {scaledRevenueSource.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                 </Pie>
                 <RechartsTooltip content={<CustomPieTooltip />} />
                 <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ right: 20 }} />
               </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Sales */}
        <div className="ecom-chart-box card-hoverable">
          <h3>Daily Sales Trend</h3>
          <div className="ecom-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={scaledDailySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66B3FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#66B3FF" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="sales" stroke="#66B3FF" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="ecom-grid-row row-2-col">
        {/* RTO vs Exchange */}
        <div className="ecom-chart-box card-hoverable">
          <h3>RTO vs Exchange Coverage</h3>
          <div className="ecom-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scaledRtoExchange} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: '#f5f5f5' }} />
                <Legend iconType="circle" wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="rto" fill="#66B3FF" name="RTO Amount" barSize={12} radius={[2, 2, 0, 0]} />
                <Bar dataKey="exchange" fill="#333333" name="Exchange Amount" barSize={12} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Mode */}
        <div className="ecom-chart-box card-hoverable">
          <h3>Payment Mode Distribution</h3>
          <div className="ecom-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scaledPaymentMode} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="mode" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: '#f5f5f5' }} />
                <Legend iconType="circle" wrapperStyle={{ bottom: -10 }} />
                <Bar dataKey="cod" stackId="a" fill="#66B3FF" name="COD" barSize={16} />
                <Bar dataKey="razorpay" stackId="a" fill="#333333" name="Razorpay" barSize={16} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SUMMARY TABLE - EXCEL STYLE */}
      <div className={`ecom-table-box excel-container card-hoverable ${isFullScreenTable ? 'fullscreen-active' : ''}`}>
        <div className="ecom-table-header">
          <div className="table-header-left">
            <h3>Summary of Data - Detailed Audit</h3>
            <button className="small-icon-btn" onClick={() => setShowAddRowModal(true)} title="Add manual entry">
              <Info size={14} />
            </button>
          </div>
          <div className="table-header-right">
            <button className="ecom-download-btn outline-btn" style={{ background: '#001b69', color: 'white' }}>
              <Download size={14} /> Download Excel
            </button>
            <button className="ecom-icon-btn" onClick={() => setIsFullScreenTable(!isFullScreenTable)}>
              {isFullScreenTable ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
        <div className="excel-wrapper">
          <table className="excel-sheet">
            <thead>
              <tr>
                <th><div className="th-content">Date <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Transaction Type <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Reference Number <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Amount <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Counterparty Amount <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Amount Difference <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Counterparty Reference Number <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Counterparty Transaction Type <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Counterparty Date <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Category <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Action Required <Filter size={12} className="filter-icon" /></div></th>
                <th><div className="th-content">Match Status <Filter size={12} className="filter-icon" /></div></th>
              </tr>
            </thead>
            <tbody>
              {scaledTableRows.map((row) => (
                <tr key={row.id}>
                  {renderCell(row, 'date')}
                  {renderCell(row, 'type')}
                  {renderCell(row, 'ref')}
                  {renderCell(row, 'amount', 'num')}
                  {renderCell(row, 'cpAmount', 'num')}
                  {renderCell(row, 'diff', 'num')}
                  {renderCell(row, 'cpRef')}
                  {renderCell(row, 'cpType')}
                  {renderCell(row, 'cpDate')}
                  {renderCell(row, 'category')}
                  {renderCell(row, 'action', 'action-req')}
                  {renderCell(row, 'status', `match-status ${String(row.status || '').toLowerCase()}`)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIGURATION MODAL */}
      {showConfigModal && (
        <div className="ecom-modal-overlay">
          <div className="ecom-modal">
            <div className="ecom-modal-header">
              <h2>Configure {configCategory === 'kpi' ? 'Key Performance Indicators' : 'Operational Metrics'}</h2>
              <button className="close-btn" onClick={() => setShowConfigModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="ecom-modal-body">
              <div className="ecom-modal-info">
                <AlertCircle size={16} />
                Select up to 4 primary metrics to display on the dashboard.
              </div>

              <div className="metric-list">
                {editingMetrics.map(metric => (
                  <div key={metric.id} className="metric-list-item">
                    <div className="metric-info">
                      <strong>{metric.label}</strong>
                      <span className="metric-val">{metric.value}</span>
                    </div>
                    <div className="metric-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={metric.isPrimary} 
                          onChange={() => handleTogglePrimary(metric.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="toggle-label">{metric.isPrimary ? 'Primary' : 'Hidden'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {showAddForm ? (
                <div className="add-metric-form">
                  <h4>Add Custom Metric</h4>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Metric Name (e.g., Conversion Rate)" 
                      value={newMetric.label}
                      onChange={e => setNewMetric({...newMetric, label: e.target.value})}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        placeholder="Value (e.g., 4.2%)" 
                        value={newMetric.value}
                        onChange={e => setNewMetric({...newMetric, value: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        placeholder="Change (e.g., +1.1%)" 
                        value={newMetric.change}
                        onChange={e => setNewMetric({...newMetric, change: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="cancel-add-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                    <button className="save-add-btn" onClick={handleAddMetric}>Add Metric</button>
                  </div>
                </div>
              ) : (
                <button className="show-add-form-btn" onClick={() => setShowAddForm(true)}>
                  <Plus size={16} /> Add Custom Metric
                </button>
              )}
            </div>

            <div className="ecom-modal-footer">
              <span className="selection-count">
                {editingMetrics.filter(m => m.isPrimary).length} / 4 Selected
              </span>
              <button className="ecom-save-btn" onClick={saveConfig}>Save Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MANUAL ROW MODAL */}
      {showAddRowModal && (
        <div className="ecom-modal-overlay">
          <div className="ecom-modal manual-add-modal">
            <div className="ecom-modal-header">
              <h2>Add Manual Excel Entry</h2>
              <button className="close-btn" onClick={() => setShowAddRowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="ecom-modal-body">
              <div className="form-row-grid">
                <div className="form-group grid-col">
                  <label>Date</label>
                  <input type="text" placeholder="DD-MM-YYYY" value={newRow.date} onChange={e => setNewRow({...newRow, date: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Transaction Type</label>
                  <input type="text" placeholder="e.g. Sales Invoice" value={newRow.type} onChange={e => setNewRow({...newRow, type: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Reference Number</label>
                  <input type="text" placeholder="Ref No" value={newRow.ref} onChange={e => setNewRow({...newRow, ref: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Amount</label>
                  <input type="number" placeholder="0" value={newRow.amount} onChange={e => setNewRow({...newRow, amount: e.target.value, diff: String(Number(e.target.value) - Number(newRow.cpAmount))})} />
                </div>
                <div className="form-group grid-col">
                  <label>Counterparty Amount</label>
                  <input type="number" placeholder="0" value={newRow.cpAmount} onChange={e => setNewRow({...newRow, cpAmount: e.target.value, diff: String(Number(newRow.amount) - Number(e.target.value))})} />
                </div>
                <div className="form-group grid-col">
                  <label>Counterparty Ref No</label>
                  <input type="text" placeholder="CP Ref" value={newRow.cpRef} onChange={e => setNewRow({...newRow, cpRef: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Counterparty Type</label>
                  <input type="text" placeholder="CP Type" value={newRow.cpType} onChange={e => setNewRow({...newRow, cpType: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Action Required</label>
                  <input type="text" placeholder="e.g. To Review" value={newRow.action} onChange={e => setNewRow({...newRow, action: e.target.value})} />
                </div>
                <div className="form-group grid-col">
                  <label>Match Status</label>
                  <input type="text" placeholder="e.g. Unmatched" value={newRow.status} onChange={e => setNewRow({...newRow, status: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="ecom-modal-footer">
              <button className="ecom-save-btn" onClick={handleAddTableRow}>Add Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceDashboard;
